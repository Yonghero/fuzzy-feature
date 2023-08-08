import type { Component } from 'vue'

export interface LayoutRenderer {
  filter: any
  table: any
  pagination: any
  dialogForm: any
}

export interface LayoutProviderProps {
  renderer: LayoutRenderer
}
// export interface LayoutProvider {
//   setup(props: Readonly<LayoutProviderProps>, context: SetupContext): () => VNode | Record<string, any>

//   render?: (props: Readonly<LayoutProviderProps>) => VNode
// }

// 定义一个 DefineComponent 类型
export type LayoutProvider = Component<LayoutProviderProps>
