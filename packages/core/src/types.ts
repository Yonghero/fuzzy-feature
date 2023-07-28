export interface App {
  install: (name) => (app) => void
  use: (installPlugin: InstallPlugin) => void
}

export type InstallPlugin = (implPlugin: ImplPlugins) => void

export interface ImplPlugins {

}
