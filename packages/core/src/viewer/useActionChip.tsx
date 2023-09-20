import { computed, defineComponent, ref, watch } from 'vue'
import { FYActionPanel } from '@hitotek/fuzzy-ui'

export default function useActionChip() {
  const Shape = defineComponent({
    props: {
      tableRowData: {
        type: Object,
        default: () => ({}),
      },
      panelVisible: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:panelVisible'],
    setup(props, { emit }) {
      const visible = computed({
        get() {
          return props.panelVisible
        },
        set(bool) {
          emit('update:panelVisible', bool)
        },
      })

      return () => (
        <>
         <FYActionPanel
            v-model:visible={visible.value}
            placement="right-start"
            template={[
              {
                label: '删除',
                onClick() {
                  console.log('删除')
                  emit('update:panelVisible', false)
                },
              },
            ]}
         >
          <div class="w-[30px] h-[31px] bg-[rgba(102,152,255,.1)] text-[#6698ff] flex items-center justify-center rounded cursor-pointer">
            <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" preserveAspectRatio="xMidYMid meet" focusable="false"><g id="apd1.Base基础/1.icon图标/2.normal/more-vertical" stroke-width="1" fill-rule="evenodd"><path d="M8 4.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm0 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm0 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z" id="apd形状结合"></path></g></svg>
          </div>
         </FYActionPanel>
      </>

      )
    },
  })

  return {
    renderer: {
      table: ({ scope, value }) => {
        return defineComponent({

          setup() {
            const shapeVisible = ref(false)
            const panelVisible = ref(false)

            watch(panelVisible, (bool) => {
              if (!bool)
                shapeVisible.value = false
            })

            return () => (
              <div
                class="w-full h-[31px] flex items-center justify-between overflow-hidden"
                onMousemove={() => {
                  shapeVisible.value = true
                }}
                onMouseleave={() => {
                  if (!panelVisible.value)
                    shapeVisible.value = false
                }}
              >
                <span>{value}</span>
                { shapeVisible.value
                  ? <Shape
                      tableRowData={scope.row}
                      v-model:panelVisible={panelVisible.value}
                    />
                  : null}
              </div>
            )
          },
        })
      },
    },
  }
}
