import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { Adapters, Renderer } from 'packages/renderer'
import type { HttpAdapters } from 'packages/http'
import type { LayoutProvider } from 'packages/layout-provider'

/**
 * 创建Fuzzy组件
 * @param adapters 适配器
 * @returns
 */
export function createViewer(adapters: Adapters) {
  return defineComponent({
    props: {
      renderer: {
        type: Object as PropType<Renderer>,
        default: () => adapters.renderer,
      },
      http: {
        type: Object as PropType<HttpAdapters>,
        default: () => adapters.http,
      },
      layout: {
        type: Object as PropType<LayoutProvider>,
        default: () => adapters.layout,
      },
    },
    setup(props) {
      return () => <div>
        <props.renderer.button.render></props.renderer.button.render>
      </div>
    },
  })
}
