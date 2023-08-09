export interface App {
  install: (app, options?: { name?: string }) => void
  use: (installPlugin: InstallPlugin) => void
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
