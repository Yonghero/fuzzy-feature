import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { Adapters, ExtraRenderer, Renderer } from 'packages/renderer'
import type { HttpAdapters } from 'packages/http'
import type { LayoutProvider } from 'packages/layout-provider'
import { FYButton } from '@hitotek/fuzzy-ui'
import type { OptionsConfiguration } from '../types/options'
import type { Handlers } from '../types/handlers'
import { useActivated } from '../utils/useActivated'
import { injectAppProvider } from './provider'
import { starter } from './starter'
import { mergeOptions } from './test-options'
import { createMenu } from './createMenu'

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
      extraRenderer: {
        type: Array as (PropType<ExtraRenderer>),
        default: () => ([<FYButton type="success">趋势分析</FYButton>]),
      },
      options: {
        type: Object as PropType<OptionsConfiguration>,
        default: () => (mergeOptions),
      },
      title: {
        type: String, // 多tab栏时需要
        default: 'Fuzzy',
      },
      handlers: {
        type: Object as (PropType<Handlers>),
        default: () => ({}),
      },
    },
    setup(props) {
      // 注入应用配置
      injectAppProvider({
        lang: adapters.lang,
        paging: adapters.paging,
      })

      const { menu, activeTabIdx } = createMenu(props.renderer.menu, computed(() => props))

      // 激活后的组件props
      const activatedProps = useActivated(computed(() => props), activeTabIdx)

      const dynamicLayout = computed(() => {
        const renderer = props.renderer
        const http = props.http
        const { components } = starter({ renderer, http, activatedProps })
        return (
          <props.layout renderer={{ menu, ...components }}></props.layout>
        )
      })

      return () => (<>{dynamicLayout.value}</>)
    },
  })
}
