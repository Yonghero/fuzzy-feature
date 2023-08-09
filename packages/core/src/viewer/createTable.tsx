import type { Renderer } from 'packages/renderer/types-renderer'
import { defineComponent, nextTick, ref, unref } from 'vue'
import type { OptionsConfiguration } from '../types/options'
import { mapTemplatesOfFeature, mapTemplatesRenderer, templateMiddleWare } from '../utils/templates'
import { AppProviderKey } from '../types/types'
import type { DataProvider } from '../types/provider'
import { getAppProviderValue } from './provider'

export function createTable(renderer: Renderer, options: OptionsConfiguration, provider: DataProvider) {
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
                onClick={() => {
                  provider.dialog.value.data = { ...scope.row }
                  nextTick(() => {
                    provider.dialog.value.title = getAppProviderValue(AppProviderKey.Lang).update + options.title
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

      function handleDeleteConfirm() {
        visibleDeleteDialog.value = false
      }
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
