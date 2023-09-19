import type { Component, DefineComponent, VNode } from 'vue'
import type { Templates } from 'packages/core/src/types/options'

/**
 * 筛选面板组件实现
 */
export interface FilterRenderer {
  render: DefineComponent<{ templates: Templates[] }> | any
}

/**
 * 表格组件实现
 */
export interface TableRenderer {
  render: DefineComponent<{ templates: Templates[]; data: any[]; selection: boolean | undefined; index: boolean | undefined; loading: boolean }> | any
}

/**
 * 按钮组件实现
 */
export interface ButtonRenderer {
  render: DefineComponent<{ type: string; link?: boolean; onClick: () => void }>
}

/**
 * 菜单组件实现
 */
export interface MenuRenderer {
  render: DefineComponent<{ config: { icon: any; title: any; menu: any }; onSelect: ({ key, path, item }) => void }>
}

/**
 * 分页组件实现
 */
export interface PaginationRenderer {
  render: DefineComponent<{ total: number; onSizeChange: (size) => void; onCurrentChange: (current) => void; currentPage: number; pageSize: number;background: boolean; layout: string }>
}

/**
 * 对话框表单组件实现
 */
export interface DialogFormRenderer {
  render: DefineComponent<{ 'v-model': boolean; dialogConfig: Record<string, any> ; formModel?: Record<string, any>; onSubmit?: (formModel) => void ; onCancel: (formModel?) => void; onConfirm?: (formModel?) => void }>
}

export interface MessageRenderer {
  render: any
}

export interface TableHeader {
  header: any
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
  dialogForm: DialogFormRenderer
  message: MessageRenderer
  tableHeader: TableHeader
}

export type ExtraRenderer = Component[] | Element[] | VNode[]
