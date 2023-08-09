import { ref } from 'vue'
import type { ComputedRef } from 'vue'
import type { WorkInData } from '../types/provider'

/**
 * 该文件暴露调用内部数据和方法, 可以在外部调用更加灵活处理
 */

export const workInProgressFuzzy = {
  shallowUpdate: (p?: any) => p,
  dataProvider: ref<ComputedRef<WorkInData>>(),
}

/**
 * 只重新请求组件数据，不重新渲染
 */
export async function $shallowUpdate(params = {}) {
  if (workInProgressFuzzy.shallowUpdate)
    return await workInProgressFuzzy.shallowUpdate(params)
}

export function $insideReactiveValue() {
  return workInProgressFuzzy.dataProvider.value
}

/**
 * 组件尺寸
 */
// export const FuzzyComponentSize = ref<FuzzySize>('default')
