import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { LayoutRenderer } from '../types'

export const DefaultLayoutProvider = defineComponent({
  props: {
    renderer: {
      type: Object as PropType<LayoutRenderer>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="w-full h-full overflow-hidden flex flex-col justify-between">
        {/* height: 100% - 分页器的高度 */}
        <div class="w-full h-[calc(100%-65px)] relative">
          <props.renderer.menu class="relative z-1"/>
          <div class="absolute top-[4.2rem] right-1 z-2">
            <props.renderer.extra/>
          </div>
          <props.renderer.filter/>
          {/* height: 100% - （tabMenu的高度 + filter区域的高度) */}
          <div class="w-full px-1 h-[calc(100%-108px)]">
            <props.renderer.table/>
          </div>
        </div>
        <div class="w-full b-t b-[rgba(220, 223, 230, 1)]">
          <div class="px-5">
            <props.renderer.pagination class="w-full flex justify-end h-[51px] "/>
          </div>
        </div>
        <props.renderer.dialogForm/>
      </div>)
  },
})
