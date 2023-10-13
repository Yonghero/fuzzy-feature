import type { PropType } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import type { ExtraRenderer, Renderer } from 'packages/renderer'
import type { HttpAdapters } from 'packages/core/http/types-http'
import type { LayoutProvider } from 'packages/layout-provider'
import type { OptionsConfiguration } from '../types/options'
import type { Handlers } from '../types/handlers'
import { useActivated } from '../utils/useActivated'
import { injectPlugins } from '../utils/injectPlugins'
import type { Adapters, FuzzyPlugin } from '../types/types'
import wrappedSlots from '../utils/wrappedSlots'
import injectValues from '../utils/injectValues'
import { injectAppProvider } from './provider'
import { starter } from './starter'
import { mergeHandlers, mergeOptions } from './test-options'
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
        default: () => ([]),
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
        default: () => (mergeHandlers),
      },
      plugins: {
        type: Array as (PropType<FuzzyPlugin[]>),
        default: () => ([]),
      },
    },
    setup(props, { slots }) {
      // 注入应用配置
      injectAppProvider({
        lang: adapters.lang,
        paging: adapters.paging,
      })

      const { menu, activeTabIdx } = createMenu(props.renderer.menu, computed(() => props))

      // 激活后的组件props
      const activatedProps = useActivated(computed(() => props), activeTabIdx)

      const plugins = computed(() => {
        return adapters.plugins ? ([...adapters.plugins, ...props.plugins]) : props.plugins
      })

      const dynamicLayout = computed(() => {
        injectPlugins(plugins.value, activatedProps)

        // @ts-expect-error anyway
        const createInjectValues = unref(activatedProps.options).inject ? unref(activatedProps.options)!.inject() : () => ({})

        injectValues(activatedProps, createInjectValues)

        const renderer = props.renderer
        const http = props.http

        const { components } = starter({ renderer, http, activatedProps })

        return (
          <props.layout
            renderer={{ menu, ...components }}
            slots={wrappedSlots(activatedProps, slots, createInjectValues)}
          />
        )
      })

      return () => (<>{dynamicLayout.value}</>)
    },
  })
}
