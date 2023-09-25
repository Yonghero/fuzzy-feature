import type { Renderer } from 'packages/renderer/types-renderer'
import { defineComponent, unref } from 'vue'
import type { OptionsConfiguration } from '../types/options'
import { mapTemplateDefaultValue, mapTemplatesOfFeature, mapTemplatesRenderer, templateMiddleWare } from '../utils/templates'
import { AppProviderKey } from '../types/types'
import type { DataProvider } from '../types/provider'
import type { Handlers } from '../types/handlers'
import { getAppProviderValue } from './provider'

function deleteTypeInTable(templates) {
  return templates.map((tmpl) => {
    delete tmpl.type
    return tmpl
  })
}

export function createTable(renderer: Renderer, options: OptionsConfiguration, provider: DataProvider, handlers: Handlers, invokeDeleteEvent, invokeUpdateEvent) {
  const templates = templateMiddleWare([mapTemplatesOfFeature, mapTemplatesRenderer, mapTemplateDefaultValue, deleteTypeInTable])(options.templates, 'table')

  return defineComponent({
    setup() {
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
                  await invokeUpdateEvent({ ...scope.row })
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
                  onClick={() => invokeDeleteEvent({ ...scope.row })}
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

      function handleSelection(v) {
        handlers && handlers?.onSelection && handlers?.onSelection(v)
      }

      function handleHeaderSelection(v) {
        handlers && handlers?.onHeaderSelection && handlers?.onHeaderSelection(v)
      }

      return () => (
        <>
          <renderer.table.render
            pageSize={unref(provider.pageSize)}
            pageCurrent={unref(provider.currentPage)}
            templates={templates}
            selection={options?.table?.selection}
            index={options?.table?.index}
            data={unref(provider.tableData)}
            loading={unref(provider.tableLoading)}
            onSelection={handleSelection}
            onHeaderSelection={handleHeaderSelection}
            renderer={renderer.tableHeader}
          />
      </>
      )
    },
  })
}
