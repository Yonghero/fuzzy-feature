import { computed, markRaw, unref } from 'vue'
import { isDeep, transferToArray } from './merge'

export function useActivated(props, activeMenuIndex) {
  const _p = unref(props)

  // 合并options 为多tab页做准备
  const mergeOptions = computed(() => transferToArray(_p.options))

  // 激活的页面配置
  const options = computed(() => mergeOptions.value[activeMenuIndex.value])

  // 合并扩展组件
  const mergeExtraRenderer = computed(() => {
    if (isDeep(_p.extraRenderer)) {
      return _p.extraRenderer
    }
    else {
      return Array.from({ length: mergeOptions.value.length }).map((_, idx) => {
        if (idx === 0)
          return _p.extraRenderer

        return undefined
      })
    }
  })
  // 激活的扩展组件
  const extraRenderer = computed(() => mergeExtraRenderer.value[activeMenuIndex.value])

  // 合并布局器
  const mergeLayoutProvider = computed(() => transferToArray(_p.layout))

  // 激活的布局器
  const layoutProvider = computed(() => {
    if (mergeLayoutProvider.value.length === mergeOptions.value.length)
      return markRaw(mergeLayoutProvider.value[activeMenuIndex.value])
    return markRaw(mergeLayoutProvider.value[0])
  })

  // 合并处理函数
  const mergeHandlers = computed(() => transferToArray(_p.handlers))

  // 激活的处理函数
  const handlers = computed(() => mergeHandlers.value[activeMenuIndex.value])

  return {
    options,
    extraRenderer,
    layoutProvider,
    handlers,
    mergeOptions,
  }
}
