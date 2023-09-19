import type { Adapters } from 'packages/renderer'

export function injectPlugins(adapters: Adapters, activatedProps) {
  const hasPlugins = !!adapters?.plugins?.length
  const hasTemplates = !!activatedProps?.options?.value?.templates.length

  if (hasPlugins && hasTemplates) {
    (adapters.plugins!).reduce((templates, plugin) => {
      return plugin.install(templates)
    }, activatedProps.options.value.templates)
  }
}
