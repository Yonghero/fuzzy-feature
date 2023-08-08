import type { MenuRenderer } from 'packages/renderer/types-renderer'
import { FYTopNavigation } from '@hitotek/fuzzy-ui'

export class FuzzyUIMenuRenderer implements MenuRenderer {
  render = FYTopNavigation
}
