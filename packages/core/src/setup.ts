import type { Adapters, App } from './types/types'
import { createViewer } from './viewer'

/**
 * 创建一个Fuzzy应用
 * @param adapters
 * @returns
 */
export function createFuzzyApp(adapters: Adapters): App {
  function install(app, options?) {
    const appName = options?.name ?? 'FuzzyViewer'
    app.component(appName, createViewer(adapters))
  }

  function use() {

  }

  return {
    install,
    use,
  }
}
