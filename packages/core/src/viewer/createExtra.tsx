import { AppProviderKey } from '../types/types'
import { getAppProviderValue } from './provider'

export function createExtra(renderer, options, extraRenderer, invokeCreateEvent) {
  return (
    <>
    {
      options?.feature?.create
        ? (
          <renderer.button.render type="primary" onClick={invokeCreateEvent}>
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
