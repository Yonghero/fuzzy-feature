import { unref } from 'vue'
import type { Templates } from '../types/options'

export interface TemplateMiddlewareCallback {
  (templates: Templates[], type: Type): Templates[]
}

export type Type = 'filter' | 'update' | 'create' | 'table'
export function templateMiddleWare(callback: TemplateMiddlewareCallback[]) {
  return (templates, type: Type) => {
    return callback.reduce((templates, callback) => {
      return callback(templates, type)
    }, templates)
  }
}

/**
 * 功能启停
 * @param templates
 * @param feature
 * @returns
 */
export function mapTemplatesOfFeature(templates: Templates[], feature) {
  return templates.filter((item) => {
    if (!item.visible)
      return false
      // || item.visible[feature] === undefined
    return !!(item.visible && (item.visible[feature]))
  })
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

/**
 *
 * @param templates
 * @param type
 */
export function mapTemplatesValue(templates: Templates[], type) {
  return templates.map((template) => {
    const tmpl = { ...template }
    if (tmpl.value && tmpl.value[type])
      tmpl.value = tmpl.value[type]
    else if (tmpl.value && typeof tmpl.value === 'object' && tmpl.value.table)
      tmpl.value = tmpl.value.table

    return tmpl
  })
}
