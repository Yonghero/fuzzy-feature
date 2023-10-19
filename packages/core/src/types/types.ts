import type { HttpAdapters } from 'packages/core/http'
import type { Renderer } from 'packages/renderer'
import type { LayoutProvider } from 'packages/layout-provider'
import type { Templates } from './options'

export interface App {
  install: (app, options?: { name?: string }) => void
}

export type InstallPlugin = (implPlugin: ImplPlugins) => void

export interface ImplPlugins {

}

export enum AppProviderKey {
  Lang = 'lang',
  Paging = 'paging',
}

export interface AppProvider {
  lang: {
    update: string
    delete: string
    create: string
    success: string
    warning: string
    fail: string
  }
  paging: {
    current: string
    size: string
  }
}

export interface FuzzyPlugin {
  install: (templates: Templates[]) => Templates[] | Promise<Templates[]>
  setup?: () => void
}

/**
 * 创造FuzzyApp需要提供的适配器
 */
export interface Adapters {
  renderer: Renderer
  http: HttpAdapters
  layout: LayoutProvider
  lang: {
    update: string
    delete: string
    create: string
    success: string
    warning: string
    fail: string
  }
  paging: {
    current: string
    size: string
  }
  plugins?: FuzzyPlugin[]
}
