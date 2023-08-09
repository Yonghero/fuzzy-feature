import type { FilterRenderer } from 'packages/renderer/types-renderer'
import type { OptionsConfiguration } from '../types/options'
import { mapTemplateDefaultValue, mapTemplatesOfFeature, mapTemplatesRenderer, templateMiddleWare } from '../utils/templates'
import type { HttpProvider } from '../types/provider'

export function createFilter(Filter: FilterRenderer, options: OptionsConfiguration, httpProvider: HttpProvider) {
  const templates = templateMiddleWare([mapTemplatesOfFeature, mapTemplateDefaultValue, mapTemplatesRenderer])(options.templates, 'filter')

  // 过滤出输入框类型的tmpl
  const inputTemplates = templates.filter(tmpl => tmpl.type === 'input')

  // 其他类型的tmpl查询
  function onChange(pairs) {
    httpProvider.get({ ...pairs })
  }

  // 输入框类型的tmpl查询
  function onEnter(inputVal) {
    // 输入框类型的tmpl都赋值上inputVal
    const reqParams = inputTemplates.reduce((pre, tmpl) => {
      pre[tmpl.value] = inputVal
      return pre
    }, {})

    httpProvider.get({ ...reqParams })
  }

  // 初始化请求参数
  const initialRequestParams = templates.reduce((pre, tmpl) => {
    pre[tmpl.value] = tmpl?.defaultValue ?? ''
    return pre
  }, {})

  // 首次请求
  Promise.resolve().then(() => {
    httpProvider.get(initialRequestParams)
  })

  // function onInputChange(val) {
  //   console.log('🚀 ~ file: createFilter.tsx:12 ~ onInputChange ~ val:', val)
  // }

  return (
    <Filter.render
      onEnter={onEnter}
      // onInputChange={onInputChange}
      onChange={onChange}
      templates={templates}
    />
  )
}
