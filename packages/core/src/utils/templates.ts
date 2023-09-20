import { unref } from 'vue'
import type { Templates } from '../types/options'

/**
 * 功能启停
 * @param templates
 * @param feature
 * @returns
 */
export function mapTemplatesOfFeature(templates: Templates[], feature) {
  return templates.filter((item) => {
    if (!item.visible)
      return true
      // || item.visible[feature] === undefined
    return !!(item.visible && (item.visible[feature]))
  })
}

export function templateMiddleWare(callback: TemplateMiddlewareCallback[]) {
  return (templates, type) => {
    return callback.reduce((templates, callback) => {
      return callback(templates, type)
    }, templates)
  }
}

/**
 * 填充默认值
 * @param templates
 * @param type
 * @returns
 */
export function mapTemplateDefaultValue(templates: Templates[], type) {
  return templates.map((templates) => {
    const _template = { ...templates }
    if (_template.defaultValue && _template.defaultValue[type] !== undefined)
      _template.defaultValue = unref(_template.defaultValue[type])

    return _template
  })
}

/**
 * 根据renderer重新映射自定组件
 * @param templates
 * @param type
 */
export function mapTemplatesRenderer(templates: Templates[], type) {
  return templates.map((template) => {
    const _template = { ...template }
    if (_template.renderer && _template.renderer[type])
      _template.render = _template.renderer[type]

    return _template
  })
}

export interface TemplateMiddlewareCallback {
  (templates: Templates[], type: string): Templates[]
}
