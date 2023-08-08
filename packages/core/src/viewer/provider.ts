import type { AppProvider } from '../types/types'
import { AppProviderKey } from '../types/types'

/**
 * app 数据提供者
 */
export const appProvider = new Map<AppProviderKey, any>()

/**
 *  注入 app 顶层数据
 * @param options
 */
export function injectAppProvider(options: AppProvider) {
  if (options.renderer)
    appProvider.set(AppProviderKey.Renderer, options.renderer)

  if (options.lang)
    appProvider.set(AppProviderKey.Lang, options.lang)

  if (options.paging)
    appProvider.set(AppProviderKey.Paging, options.paging)
}

/**
 * 获取顶层数据
 * @param key
 * @returns
 */
export function getAppProviderValue(key: AppProviderKey) {
  return appProvider.get(key)
}
