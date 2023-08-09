import type { Renderer } from 'packages/renderer/types-renderer'
import { FuzzyUIFilterRenderer } from './FuzzyUIFilterRenderer'
import { FuzzyUITableRenderer } from './FuzzyUITableRenderer'
import { FuzzyUIButtonRenderer } from './FuzzyUIButtonRenderer'
import { FuzzyUIDialogFromRenderer } from './FuzzyUIDialogFromRenderer'
import { FuzzyUIPaginationRenderer } from './FuzzyUIPaginationRenderer'
import { FuzzyUIMenuRenderer } from './FuzzyUIMenuRenderer'
import { FuzzyUIMessageRenderer } from './FuzzyUIMessageRenderer'

export class FuzzyUIRenderer implements Renderer {
  filter = new FuzzyUIFilterRenderer()
  table = new FuzzyUITableRenderer()
  button = new FuzzyUIButtonRenderer()
  dialogForm = new FuzzyUIDialogFromRenderer()
  menu = new FuzzyUIMenuRenderer()
  pagination = new FuzzyUIPaginationRenderer()
  message = new FuzzyUIMessageRenderer()
}
