import { AppProviderKey } from '../types/types'
import { getAppProviderValue } from './provider'

export function createExtra(renderer, options, extraRenderer) {
  return (
    <>
    {
        options?.feature?.create
          ? (
            <renderer.button.render type="primary">
              {getAppProviderValue(AppProviderKey.Lang).create}
            </renderer.button.render>
            )
          : null
      }
      {
        extraRenderer && extraRenderer.length
          ? extraRenderer.map(render => render)
          : null
      }
    </>
  )
}
