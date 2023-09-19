import type { Templates } from 'packages/core/src/types/options'
import type { FilterRenderer } from 'packages/renderer/types-renderer'
import type { PropType } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { FYFilterDisplay, FYInput } from '@hitotek/fuzzy-ui'
import { refDebounced, useDebounceFn } from '@vueuse/core'

export class FuzzyUIFilterRenderer implements FilterRenderer {
  render = defineComponent({
    props: {
      templates: {
        type: Array as PropType<Templates[]>,
        default: () => ([]),
      },
    },
    emits: ['change', 'inputChange', 'enter'],
    setup(props, { emit }) {
      const inputSlots = {
        prefix: () => (<svg viewBox="0 0 16 16" fill="#999B9F" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" preserveAspectRatio="xMidYMid meet" focusable="false"><g id="atlnormal/search" stroke-width="2" fill-rule="evenodd"><path d="M6.751 12.303A5.557 5.557 0 0 1 1.2 6.751C1.2 3.691 3.69 1.2 6.751 1.2a5.558 5.558 0 0 1 5.551 5.551 5.557 5.557 0 0 1-5.551 5.552M6.751 0a6.751 6.751 0 1 0 4.309 11.949l3.855 3.855a.6.6 0 1 0 .849-.849l-3.854-3.853A6.751 6.751 0 0 0 6.751 0" id="atlFill-1"></path></g></svg>),
      }

      const filterList = computed(() => {
        return props.templates
          .filter(tmpl => tmpl.type === 'input')
          .map(tmpl => ({
            name: tmpl.label,
            id: tmpl.value,
            value: true,
          }))
      })

      const inputVal = ref('')
      const debounced = refDebounced(inputVal, 500)

      watch(debounced, val => emit('inputChange', val))

      const onKeydown = useDebounceFn((e) => {
        if (e.key === 'Enter')
          emit('enter', debounced.value)
      }, 1000)

      return () => (
        <div class="h-[4rem] fuzzy-ui-filter-renderer w-full flex items-center gap-x-1 px-4">
          <FYInput
            class="important-w-60 h-[2.5rem]"
            v-slots={inputSlots}
            filter-list={filterList.value}
            v-model={debounced.value}
            onKeydown={onKeydown}
          />
          <FYFilterDisplay
            onChange={(pairs) => {
              emit('change', pairs)
            } }
            template={props.templates.filter(item => item.type !== 'input')}
          />

        </div>
      )
    },
  })
}
