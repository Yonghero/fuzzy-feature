import type { ComponentPublicInstance, DefineComponent } from 'vue'

export interface LayoutRenderer {
  filter: DefineComponent
  table: DefineComponent
  pagination: DefineComponent
  dialogForm: DefineComponent
  menu: DefineComponent
  extra: DefineComponent
  delete: DefineComponent
}

export interface LayoutSlots {
  tree: () => JSX.Element
  default: () => JSX.Element
}

export interface LayoutProviderProps {
  renderer: LayoutRenderer
}

export type LayoutProvider = ComponentPublicInstance<any>
