import type { Renderer } from 'packages/renderer/types-renderer'
import { defineComponent, nextTick, ref, unref } from 'vue'
import type { OptionsConfiguration } from '../types/options'
import { mapTemplatesOfFeature, mapTemplatesRenderer, templateMiddleWare } from '../utils/templates'
import { AppProviderKey } from '../types/types'
import type { DataProvider, HttpProvider } from '../types/provider'
import type { Handlers } from '../types/handlers'
import { getAppProviderValue } from './provider'

export function createTable(renderer: Renderer, options: OptionsConfiguration, provider: DataProvider, httpProvider: HttpProvider, handlers: Handlers) {
  const templates = templateMiddleWare([mapTemplatesOfFeature, mapTemplatesRenderer])(options.templates, 'table')

  return defineComponent({
    setup() {
      const visibleDeleteDialog = ref(false)

      const deleteVisible = options?.feature?.delete
      const updateVisible = options?.feature?.update

      if (deleteVisible || updateVisible) {
        if (templates.some(tmpl => tmpl.label === '操作'))
          return
        templates.push({
          label: '操作',
          width: options.table?.actionWidth ?? '150px',
          value: 'fuzzy-table-action-column',
          visible: {
            table: true,
          },
          render({ scope }) {
            // 编辑
            const UpdateRender = (
              <renderer.button.render
                type="primary"
                link
                onClick={async () => {
                  if (handlers.updateBeforePop) {
                    const row = await handlers.updateBeforePop({ data: { ...scope.row } })
                    provider.dialog.value.data = { row }
                  }
                  else {
                    provider.dialog.value.data = { ...scope.row }
                  }
                  provider.dialog.value.type = 'update'
                  provider.dialog.value.title = getAppProviderValue(AppProviderKey.Lang).update + options.title
                  nextTick(() => {
                    provider.dialog.value.visible = true
                  })
                }}
              >
                { getAppProviderValue(AppProviderKey.Lang).update }
              </renderer.button.render>
            )

            // 删除
            const DeleteRender = (
              <>
                <renderer.button.render
                  type="danger"
                  link
                  onClick={() => {
                    provider.dialog.value.data = { ...scope.row }
                    visibleDeleteDialog.value = true
                  }}
                >
                  { getAppProviderValue(AppProviderKey.Lang).delete }
                </renderer.button.render>
              </>
            )

            // 自定义操作符
            if (options.table?.actions) {
              return (
                options.table.actions(scope, { UpdateRender, DeleteRender })
              )
            }
            return (
              <div class="w-full flex justify-center items-center gap-x-2">
                {updateVisible ? UpdateRender : null}
                {deleteVisible ? DeleteRender : null}
              </div>
            )
          },
        })
      }

      // 确定删除
      async function handleDeleteConfirm() {
        let data = { ...provider.dialog.value.data }
        if (handlers.deleteBefore)
          data = await handlers.deleteBefore({ data: { ...provider.dialog.value.data } })

        const response = await httpProvider.delete(data)
        const lang = getAppProviderValue(AppProviderKey.Lang)

        // 删除成功
        if (response.success) {
          renderer.message.render.success(lang.delete + lang.success)

          // 重新新的表格请求数据
          if (provider.tableData.value.length === 1 && provider.currentPage.value !== 1)
            await httpProvider.get({ [getAppProviderValue(AppProviderKey.Paging).current]: provider.currentPage.value - 1 })
          else
            await httpProvider.get({})
        }
        else {
          renderer.message.render.warning(response.message)
        }

        visibleDeleteDialog.value = false
      }

      // 取消删除
      function handleDeleteCancel() {
        visibleDeleteDialog.value = false
      }

      return () => (
        <>
          <renderer.table.render
            templates={templates}
            selection={options?.table?.selection}
            index={options?.table?.index}
            data={unref(provider.tableData)}
            loading={unref(provider.tableLoading)}
          />
          <renderer.dialogForm.render
            v-model={visibleDeleteDialog.value}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
            dialogConfig={{
              // 标题
              title: '确认删除',
              // 业务类型
              type: 'delete',
              // 删除对象字段名
              businessType: '',
              // tag文字
              tagText: '本条数据',
              customDesc: '',
            }}
        />
      </>
      )
    },
  })
}
