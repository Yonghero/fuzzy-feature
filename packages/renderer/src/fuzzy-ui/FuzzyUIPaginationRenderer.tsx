import type { PaginationRenderer } from 'packages/renderer/types-renderer'
import { FYPagination } from '@hitotek/fuzzy-ui'

export class FuzzyUIPaginationRenderer implements PaginationRenderer {
  render = FYPagination
}
