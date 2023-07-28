import type { DefineComponent } from 'vue'
import type { LayoutProvider } from '../layout-provider/types-layout-provider'
import type { HttpAdapters } from '../http'

export interface FilterRenderer {
  render: DefineComponent
}

export interface TableRenderer {
  render: DefineComponent
}

export interface ButtonRenderer {
  render: DefineComponent
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

/**
 * 渲染器
 */
export interface Renderer {
  filter: FilterRenderer
  table: TableRenderer
  button: ButtonRenderer
  menu: MenuRenderer
  pagination: PaginationRenderer
  form: FormRenderer
  dialog: DialogRenderer
}

/**
 * 创造FuzzyApp需要提供的适配器
 */
export interface Adapters {
  renderer: Renderer
  http: HttpAdapters
  layout: LayoutProvider
}

export interface FuzzyPlugins {

}
