import type { Templates } from 'packages/core/src/types/options'
import type { TableHeader, TableRenderer } from 'packages/renderer/types-renderer'
import type { PropType, Ref } from 'vue'
import { defineComponent, ref, unref } from 'vue'
import { FYTable } from '@hitotek/fuzzy-ui'

export class FuzzyUITableRenderer implements TableRenderer {
  render = defineComponent({
    props: {
      templates: {
        type: Array as PropType<Templates[]>,
        default: () => ([]),
      },
      data: {
        type: Array,
        default: () => ([]),
      },
      selection: {
        type: Boolean,
        default: true,
      },
      index: {
        type: Boolean,
        default: true,
      },
      pageSize: {
        type: Number,
        default: 20,
      },
      pageCurrent: {
        type: Number,
        default: 1,
      },
      loading: {
        type: Object as PropType<Ref<boolean>>,
        default: ref(false),
      },
      renderer: {
        type: Object as PropType<TableHeader>,
      },
    },
    emits: ['selection', 'headerSelection'],
    setup(props, { emit }) {
      return () => (
        <div class="h-full fuzzy-ui-table-renderer w-full">
          <FYTable
            pageSize={props.pageSize}
            pageCurrent={props.pageCurrent}
            style="height: calc(100% - 0px);"
            max-height="calc(100% + 49px)"
            template={props.templates}
            data={unref(props.data)}
            column-selection={props.selection}
            column-index={props.index}
            v-loading={unref(props.loading)}
            onSelection={v => emit('selection', v)}
            onHeaderSelection={v => emit('headerSelection', v)}
            renderer={props.renderer}
          />
        </div>
      )
    },
  })
}
