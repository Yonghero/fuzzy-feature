import type { FilterRenderer } from 'packages/renderer/types-renderer'
import type { OptionsConfiguration } from '../types/options'
import { mapTemplateDefaultValue, mapTemplatesOfFeature, mapTemplatesRenderer, templateMiddleWare } from '../utils/templates'

export function createFilter(Filter: FilterRenderer, options: OptionsConfiguration) {
  return (
    <Filter.render templates={templateMiddleWare([mapTemplatesOfFeature, mapTemplateDefaultValue, mapTemplatesRenderer])(options.templates, 'filter')}/>
  )
}
