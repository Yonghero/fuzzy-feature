import type { DialogFormRenderer } from 'packages/renderer/types-renderer'
import { FYDialog } from '@hitotek/fuzzy-ui'

export class FuzzyUIDialogFromRenderer implements DialogFormRenderer {
  render = FYDialog
}
