import type { Type } from '../utils/templates'

interface HandlerParams {
  data: any
  url?: string
  prevent?: () => void
}

export interface Handlers {
  /**
   * 查询前
   */
  queryBefore?: (params: HandlerParams) => Promise<any> //
  /**
   * 查询点击下拉框事件
   */
  querySelectChange?: ({ value, model }: any) => any
  /**
   * 点击更新对话框出来前
   */
  createBeforePop?: (params: HandlerParams) => Promise<any> //
  /**
   * 点击编辑对话框出来前
   */
  updateBeforePop?: (params: HandlerParams) => Promise<any> //
  /**
   * 删除前
   */
  deleteBefore?: (params: HandlerParams) => Promise<any>
  /**
   * 确认更新时
   */
  createConfirm?: (params: HandlerParams) => Promise<any>
  /**
   * 新增更新点击确定按钮时
   * 返回true 关闭弹窗 刷新数据
   */
  updateConfirm?: (params: HandlerParams) => Promise<any>
  /**
   * 取消更新时
   */
  createCancel?: (params: HandlerParams) => any //
  /**
   * 取消编辑时
   */
  updateCancel?: (params: HandlerParams) => any
  /**
   * 如果表格开启了多选框模式
   * 该事件可以接收多选的参数
   * @param params
   */
  onSelection?: (params: any[]) => any
  /**
   * 表格设置点击
   * @param params
   * @returns
   */
  onHeaderSelection?: (params) => any
  /**
   * 更新成功后
   */
  updated?: ({ type, response, formModel }: { type: Type; response: any; formModel: any }) => any
  /**
   * tab change
   */
  tabChange?: () => any
  inject?: () => () => any
}
