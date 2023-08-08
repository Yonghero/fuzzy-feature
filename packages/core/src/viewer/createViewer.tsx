import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { Adapters, Renderer } from 'packages/renderer'
import type { HttpAdapters } from 'packages/http'
import type { LayoutProvider } from 'packages/layout-provider'
import type { OptionsConfiguration } from '../types/options'
import { injectAppProvider } from './provider'
import { starter } from './starter'
import { testOptions } from './test-options'

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
      options: {
        type: Object as PropType<OptionsConfiguration>,
        default: () => (testOptions),
      },
      title: {
        type: String, // 多tab栏时需要
      },
    },
    setup(props) {
      injectAppProvider({
        renderer: props.renderer,
        http: props.http,
        lang: adapters.lang,
        paging: adapters.paging,
      })

      const renderer = props.renderer
      const http = props.http
      const options = props.options

      const { components } = starter({ renderer, http, options })
      // @ts-expect-error anyway
      return () => <props.layout renderer={{ ...props.renderer, ...components }}></props.layout>
    },
  })
}
