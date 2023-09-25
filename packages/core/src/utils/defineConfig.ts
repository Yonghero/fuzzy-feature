import type { OptionsConfiguration } from './../types/options'

export function defineConfig<T extends Record<string, any>>(options: OptionsConfiguration<T>) {
  return options
}
