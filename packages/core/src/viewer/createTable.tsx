import type { Renderer } from 'packages/renderer/types-renderer'
import { defineComponent, nextTick, ref } from 'vue'
import type { OptionsConfiguration } from '../types/options'
import { mapTemplatesOfFeature, mapTemplatesRenderer, templateMiddleWare } from '../utils/templates'
import { AppProviderKey } from '../types/types'
import type { DataProvider } from '../types/provider'
import { getAppProviderValue } from './provider'

export function createTable(renderer: Renderer, options: OptionsConfiguration, provider: DataProvider) {
  const templates = templateMiddleWare([mapTemplatesOfFeature, mapTemplatesRenderer])(options.templates, 'table')

  const Table = defineComponent({
    setup() {
      const visibleDeleteDialog = ref(false)

      if (options?.feature?.delete || options.feature?.update) {
        templates.push({
          label: '操作',
          width: options.table?.actionWidth ?? '180px',
          value: 'fuzzy-table-action-column',
          visible: {
            table: true,
          },
          render({ scope }) {
            // 编辑
            const UpdateRender = (
              <renderer.button.render type="primary"
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
                <renderer.button.render type="danger"
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
                {UpdateRender}
                {DeleteRender}
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
            data={provider.tableData}
            loading={provider.tableLoading}
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

  return (<Table/>)
}
