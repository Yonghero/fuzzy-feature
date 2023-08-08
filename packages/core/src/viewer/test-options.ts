import type { OptionsConfiguration } from '../types/options'

export const testOptions: OptionsConfiguration = {
  title: '报警管理',
  api: undefined,
  table: {

  },
  feature: {
    update: true,
    create: true,
  },
  templates: [
    {
      label: '姓名',
      value: 'name',
      visible: {
        table: true,
        filter: false,
      },
    },
    {
      label: '负责人',
      type: 'input',
      value: 'fzr',
      onChange({ value }) {
        // console.log('🚀 ~ file: basic.vue:11 ~ onChange ~ e:', value)
      },
      visible: {
        filter: true,
      },
    },
    {
      label: '报警人',
      type: 'input',
      value: 'bjr',
      onChange({ value }) {
        // console.log('🚀 ~ file: basic.vue:11 ~ onChange ~ e:', value)
      },
      visible: {
        filter: true,
      },
    },
    {
      label: '创建人',
      type: 'select',
      value: 'createperson',
      defaultValue: {
        filter: [2],
      },
      options: [{ label: '李校长', value: 1 }, { label: '王美丽', value: 2 }],
      onChange({ value }) {
        // console.log('🚀 ~ file: basic.vue:21 ~ onChange ~ e:', value)
      },
      visible: {
        filter: true,
      },
    },
    {
      label: '都是人',
      type: 'select',
      value: 'createperson1',
      defaultValue: [2],
      options: [{ label: '李校长', value: 1 }, { label: '王美丽', value: 2 }],
      onChange({ value }) {
        // console.log('🚀 ~ file: basic.vue:21 ~ onChange ~ e:', value)
      },
      visible: {
        filter: false,
      },
    },
  ],
}
