import type { Renderer } from 'packages/renderer/types-renderer'
import type { Ref } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import type { DataProvider } from '../types/provider'
import type { Handlers } from '../types/handlers'
import type { ActivatedReturnValue } from '../utils/useActivated'
import type { Templates } from '../types/options'
import { mapTemplateDefaultValue, mapTemplatesOfFeature, mapTemplatesOfVisible, mapTemplatesRenderer, mapTemplatesValue, templateMiddleWare } from '../utils/templates'

function deleteTypeInTable(templates) {
  return templates.map((tmpl) => {
    delete tmpl.type
    return tmpl
  })
}

export function createTable(renderer: Renderer, activatedProps: ActivatedReturnValue, templates: Ref<Templates[]>, provider: DataProvider, handlers: Handlers, invokeDeleteEvent, invokeUpdateEvent) {
  return defineComponent({
    setup() {
      const tableTmpl = computed(() => {
        return templateMiddleWare([mapTemplatesOfFeature, mapTemplatesRenderer, mapTemplateDefaultValue, deleteTypeInTable, mapTemplatesOfVisible, mapTemplatesValue])(templates.value, 'table')
      })

      const options = computed(() => unref(activatedProps.options))

      // const deleteVisible = options.value?.feature?.delete
      // const updateVisible = options.value?.feature?.update

      // if (deleteVisible || updateVisible) {
      //   if (templates.value.some(tmpl => tmpl.label === '操作'))
      //     return
      //   templates.value.push({
      //     label: '操作',
      //     width: options.value.table?.actionWidth ?? '150px',
      //     value: 'fuzzy-table-action-column',
      //     visible: {
      //       table: true,
      //     },
      //     render({ scope }) {
      //       // 编辑
      //       const UpdateRender = (
      //         <renderer.button.render
      //           type="primary"
      //           link
      //           onClick={async () => {
      //             await invokeUpdateEvent({ ...scope.row })
      //           }}
      //         >
      //           { getAppProviderValue(AppProviderKey.Lang).update }
      //         </renderer.button.render>
      //       )

      //       // 删除
      //       const DeleteRender = (
      //         <>
      //           <renderer.button.render
      //             type="danger"
      //             link
      //             onClick={() => invokeDeleteEvent({ ...scope.row })}
      //           >
      //             { getAppProviderValue(AppProviderKey.Lang).delete }
      //           </renderer.button.render>
      //         </>
      //       )

      //       // 自定义操作符
      //       if (options.value.table?.actions) {
      //         return (
      //           options.value.table.actions(scope, { UpdateRender, DeleteRender })
      //         )
      //       }
      //       return (
      //         <div class="w-full flex justify-center items-center gap-x-2">
      //           {updateVisible ? UpdateRender : null}
      //           {deleteVisible ? DeleteRender : null}
      //         </div>
      //       )
      //     },
      //   })
      // }

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
            templates={tableTmpl.value}
            selection={options.value?.table?.selection}
            index={options.value?.table?.index}
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
