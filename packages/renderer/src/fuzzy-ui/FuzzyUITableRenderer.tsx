import type { Templates } from 'packages/core/src/types/options'
import type { TableRenderer } from 'packages/renderer/types-renderer'
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
      loading: {
        type: Object as PropType<Ref<boolean>>,
        default: ref(false),
      },
    },
    setup(props) {
      return () => (
        <div class="h-full fuzzy-ui-table-renderer w-full">
          <FYTable
            style="height: calc(100% - 0px);"
            max-height="calc(100% + 49px)"
            template={props.templates}
            data={unref(props.data)}
            column-selection={props.selection}
            column-index={props.index}
            v-loading={unref(props.loading)}
          />
        </div>
      )
    },
  })
}
