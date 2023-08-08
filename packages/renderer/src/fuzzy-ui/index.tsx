import type { Renderer } from '../../types-renderer'
import { FuzzyUIFilterRenderer } from './FuzzyUIFilterRenderer'
import { FuzzyUITableRenderer } from './FuzzyUITableRenderer'
import { FuzzyUIButtonRenderer } from './FuzzyUIButtonRenderer'
import { FuzzyUIDialogFromRenderer } from './FuzzyUIDialogFromRenderer'
import { FuzzyUIPaginationRenderer } from './FuzzyUIPaginationRenderer'
import { FuzzyUIMenuRenderer } from './FuzzyUIMenuRenderer'

export const FuzzyUIRenderer: Renderer = {
  filter: new FuzzyUIFilterRenderer(),
  table: new FuzzyUITableRenderer(),
  button: new FuzzyUIButtonRenderer(),
  dialogForm: new FuzzyUIDialogFromRenderer(),
  menu: new FuzzyUIMenuRenderer(),
  pagination: new FuzzyUIPaginationRenderer(),
}
