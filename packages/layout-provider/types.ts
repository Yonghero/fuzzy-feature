import type { ComponentPublicInstance, DefineComponent } from 'vue'

export interface LayoutRenderer {
  filter: DefineComponent
  table: DefineComponent
  pagination: DefineComponent
  dialogForm: DefineComponent
  menu: DefineComponent
  extra: DefineComponent
}

export interface LayoutSlots {
  tree: () => JSX.Element
}

export interface LayoutProviderProps {
  renderer: LayoutRenderer
}

export type LayoutProvider = ComponentPublicInstance<any>
