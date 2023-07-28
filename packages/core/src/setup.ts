import type { Adapters } from 'packages/renderer'
import type { App } from './types'
import { createViewer } from './viewer'

/**
 * 创建一个Fuzzy应用
 * @param adapters
 * @returns
 */
export function createFuzzyApp(adapters: Adapters): App {
  /**
   * fuzzy 应用安装
   * @param name 组件名称
   * @returns
   */
  function install(name) {
    return function vueAppInstall(app) {
      app.component(name, createViewer(adapters))
    }
  }

  function use() {

  }

  return {
    install,
    use,
  }
}
