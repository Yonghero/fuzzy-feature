import { ref } from 'vue'
import type { WorkInData } from '../types/provider'

/**
 * 该文件暴露调用内部数据和方法, 可以在外部调用更加灵活处理
 */

export const workInProgressFuzzy = {
  shallowUpdate: p => p,
  shallowDelete: p => p,
  dataProvider: ref<WorkInData>(),
}

/**
 * 请求数据更新
 */
export async function $shallowUpdate(params = {}) {
  if (workInProgressFuzzy.shallowUpdate)
    return await workInProgressFuzzy.shallowUpdate(params)
}

/**
 * 删除数据
 * @param params
 * @returns
 */
export async function $shallowDelete(params) {
  if (workInProgressFuzzy.shallowDelete)
    return await workInProgressFuzzy.shallowDelete(params)
}

export function $insideReactiveValue() {
  return workInProgressFuzzy.dataProvider
}

/**
 * 组件尺寸
 */
// export const FuzzyComponentSize = ref<FuzzySize>('default')
