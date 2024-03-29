import type { MenuRenderer } from 'packages/renderer/types-renderer'
import { computed, defineComponent, ref, unref, watchEffect } from 'vue'
import { workInProgressFuzzy } from '../utils/expose'

export function createMenu(Menu: MenuRenderer, refProps) {
  const activeTabIdx = ref(0)

  const menu = defineComponent({

    setup() {
      watchEffect(() => {
        const props = unref(refProps)
        if (!props || !props.options)
          return

        workInProgressFuzzy.options.value = Array.isArray(props.options) ? props.options[activeTabIdx.value] : props.options
      })
      // 菜单项
      const menuTmpl = computed(() => {
        const props = unref(refProps)
        // 多项options
        if (Array.isArray(props.options)) {
          return props.options.map((item, idx) => ({
            label: unref(item.title),
            value: idx,
          }))
        }
        return []
      })

      const title = computed(() => {
        const props = unref(refProps)
        // 多项options 标题采用大标题
        if (Array.isArray(props.options))
          return props.title

        // 单options 直接采用配置内的标题
        return props.options.title
      })

      const config = computed(() => {
        return {
          icon: (
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.8613 5.08333H17.1113" stroke="#409EFF" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
              <path d="M12.604 3.25V6.91667" stroke="#409EFF" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
              <path d="M10.9999 5.38889H2.44434" stroke="#409EFF" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
              <path d="M6.18766 11.5H2.521" stroke="#409EFF" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
              <path d="M9.854 9.66667V13.3333" stroke="#409EFF" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
              <path d="M19.5556 11.5L11 11.5" stroke="#409EFF" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
              <path d="M19.8613 17.9167H17.1113" stroke="#409EFF" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
              <path d="M12.604 16.0833V19.75" stroke="#409EFF" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
              <path d="M10.9999 17.6111H2.44434" stroke="#409EFF" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
            </svg>
          ),
          title: title.value,
          menu: menuTmpl.value,
        }
      })

      function handleSelet({ key }) {
        const props = unref(refProps)
        if (Array.isArray(props.handlers)) {
          if (props.handlers[activeTabIdx.value].tabChange)
            props.handlers[activeTabIdx.value].tabChange()
          // workInOptions.value = props.options[activeTabIdx.value]
          workInProgressFuzzy.options.value = props.options[activeTabIdx.value]
        }
        else {
          if (props.handlers.tabChange)
            props.handlers.tabChange()
          // workInOptions.value = props.options
          workInProgressFuzzy.options.value = props.options
        }
        activeTabIdx.value = key
      }

      return () => (
        (
          <Menu.render
            config={config.value}
            onSelect={handleSelet}
          />
        )
      )
    },
  })

  return {
    menu,
    activeTabIdx,
  }
}
