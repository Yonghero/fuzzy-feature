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

export interface Value {
  filter: string
  update: string
  create: string
  table: string
}

export type Templates = BaseTemplate
export type Where = 'eq' | 'like' | 'notLike' | 'likeLeft' | 'likeRight' | 'ne' | 'gt' | 'ge' | 'lt' | 'le' | 'between' | 'notBetween' | 'isNull' | 'isNotNull' | 'in' | 'notIn' | 'orderByAsc' | 'orderByDesc'

export interface BaseTemplate {
  /**
   *  字段名称
   */
  label?: string
  /**
   *  后端需要的字段值
   */
  value: string | Value
  /**
   * 接口传参操作符
   */
  where?: Where
  /**
   * 此函数内部注入无需传递，返回值为options的inject的返回值
   * @returns
   */
  inject?: () => any
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
  fixed?: boolean
}

type LangText = string | ((data: object | object[]) => string)

export interface Lang {
  deletePrompt?: {
    title?: LangText // 删除弹窗标题
    tagText?: LangText // 删除的提示文字
    customDesc?: LangText
  }
}
export interface OptionsConfiguration {
  id?: string
  title: string | Ref<string>
  api: string | Api | Array<string> | Array<Api> | ComputedRef<string> | Ref<string>
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
   * 1. 为slots注入数据
   * 2. 在每一项template中也同样注入inject函数 调用后可返回当前注入的值
   * @returns
   */
  inject?: () => () => Record<string, Ref<any>>
  /**
   * 注入插槽
   */
  slots?: Record<string, any>
  /**
   * 配置页面内部分操作的展示文字
   */
  lang?: Lang
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
