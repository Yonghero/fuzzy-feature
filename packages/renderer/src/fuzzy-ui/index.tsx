import { defineComponent } from 'vue'
import { FYTopNavigation } from '@hitotek/fuzzy-ui'
import type { Renderer } from '../../types-renderer'
import { FuzzyUIFilterRenderer } from './FuzzyUIFilterRenderer'
import { FuzzyUITableRenderer } from './FuzzyUITableRenderer'
import { FuzzyUIButtonRenderer } from './FuzzyUIButtonRenderer'
import { FuzzyUIDialogFromRenderer } from './FuzzyUIDialogFromRenderer'
import { FuzzyUIPaginationRenderer } from './FuzzyUIPaginationRenderer'

export const FuzzyUIRenderer: Renderer = {
  filter: new FuzzyUIFilterRenderer(),
  table: new FuzzyUITableRenderer(),
  button: new FuzzyUIButtonRenderer(),
  dialogForm: new FuzzyUIDialogFromRenderer(),
  menu: {
    render: defineComponent({
      render() {
        return <FYTopNavigation>
        </FYTopNavigation>
      },
    }),
  },
  pagination: new FuzzyUIPaginationRenderer(),
  form: {
    render: defineComponent({
      render() {
        return <div>form</div>
      },
    }),
  },
  dialog: {
    render: defineComponent({
      render() {
        return <div>dialog</div>
      },
    }),
  },
}
