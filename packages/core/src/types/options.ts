import type { Component, ComputedRef, Ref, VNode } from 'vue'

export interface Api {
  create: string | ComputedRef<string> | Ref<string>
  update: string | ComputedRef<string> | Ref<string>
  delete: string | ComputedRef<string> | Ref<string>
  filter: string | ComputedRef<string> | Ref<string>
}

export interface Feature {
  create?: boolean
  update?: boolean
  delete?: boolean
}

export type Templates = BaseTemplate

export interface BaseTemplate {
  /**
   *  字段名称
   */
  label?: string
  /**
   *  后端需要的字段值
   */
  value: string
  /**
   * 数据默认值
   */
  defaultValue?: {
    filter?: any
    update?: any
    create?: any
  }
  options?: { label: string; value: any }[]
  onChange?: (params?) => void
  /**
   * 单元格内容过长, 多余的内容会在 hover 时以 tooltip 的形式显示出来
   */
  'show-overflow-tooltip'?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  type?: string
  /**
   * 是否在增删改查中包含此字段
   */
  visible?: {
    filter?: boolean | ((row: any) => boolean)
    table?: boolean | ((row: any) => boolean)
    create?: boolean | ((row: any) => boolean)
    update?: boolean | ((row: any) => boolean)
    delete?: boolean | ((row: any) => boolean)
  }
  /**
   * 替换以下类型的组件实现
   */
  renderer?: {
    filter?: (props) => Component | Element | VNode
    table?: (props) => Component | Element | VNode
    update?: (props) => Component | Element | VNode
    create?: (props) => Component | Element | VNode
  }
  render?: (props) => Component | Element | VNode
  /**
   *  该字段的表单规则 参照element-plus
   */
  rules?: any[]
  /**
     * 是否必填
     */
  require?: boolean
}

export interface OptionsConfiguration {
  id?: string
  title: string | Ref<string>
  api: string | Api | Array<string> | Array<Api> | ComputedRef<string> | Ref<string> | any
  /**
   * 是否开启增删改查中其中一项功能
   * 默认全部开启
   */
  feature?: Feature
  /**
   * 需要展示的每个字段 可配置每个字段对应的功能
   */
  templates: Templates[]
  /**
   * 配置表格的特有属性
   */
  table?: {
    selection?: boolean // 开启多选
    index?: boolean // 开启序号
    actionWidth?: string // 操作列宽度 默认180px
    /**
     *
     * @param scope 当前表格行的数据
     * @param UpdateRender 编辑操作的组件
     * @param DeleteRender 删除操作的组件
     * @returns
     */
    actions?: (scope, { UpdateRender, DeleteRender }) => VNode[]
  }
}
