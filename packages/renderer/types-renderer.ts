import type { Component, DefineComponent, VNode } from 'vue'
import type { Templates } from 'packages/core/src/types/options'
import type { HttpAdapters } from '../http'
import type { LayoutProvider } from './../layout-provider/types'

export interface FilterRenderer {
  render: Component<{ templates: Templates[] }>
}

export interface TableRenderer {
  render: Component<{ templates: Templates[]; data: any[] }>
}

export interface ButtonRenderer {
  render: Component<{ type: string }> | VNode | JSX.Element
}

export interface MenuRenderer {
  render: DefineComponent
}

export interface PaginationRenderer {
  render: DefineComponent
}

export interface FormRenderer {
  render: DefineComponent
}

export interface DialogRenderer {
  render: DefineComponent
}

export interface DialogFormRenderer {
  render: Component<{ dialogConfig: Record<string, any> }>
}
/**
 * 渲染器
 */
export interface Renderer {
  filter: FilterRenderer
  table: TableRenderer | any
  button: ButtonRenderer | any
  menu: MenuRenderer
  pagination: PaginationRenderer
  dialogForm: DialogFormRenderer | any
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
  }
  paging: {
    current: string
    size: string
  }
}

export interface FuzzyPlugins {

}

export type ExtraRenderer = Component[] | Element[] | VNode[]
