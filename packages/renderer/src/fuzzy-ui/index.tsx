import { defineComponent } from 'vue'
import type { Renderer } from '../../types-renderer'

export const TestRenderer: Renderer = {
  filter: {
    render: defineComponent({
      render() {
        return <div>filter</div>
      },
    }),
  },
  table: {
    render: defineComponent({
      render() {
        return <div>table</div>
      },
    }),
  },
  button: {
    render: defineComponent({
      render() {
        return <div>button</div>
      },
    }),
  },
  menu: {
    render: defineComponent({
      render() {
        return <div>menu</div>
      },
    }),
  },
  pagination: {
    render: defineComponent({
      render() {
        return <div>pagination</div>
      },
    }),
  },
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
