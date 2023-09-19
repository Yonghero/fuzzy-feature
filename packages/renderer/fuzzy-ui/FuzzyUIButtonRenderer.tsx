import type { ButtonRenderer } from 'packages/renderer/types-renderer'
import { FYButton } from '@hitotek/fuzzy-ui'

export class FuzzyUIButtonRenderer implements ButtonRenderer {
  render = FYButton
}
