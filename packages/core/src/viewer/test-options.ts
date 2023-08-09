import type { OptionsConfiguration } from '../types/options'
import { mergeFuzzyOptions } from '../utils/merge'

export const testOptions: OptionsConfiguration = {
  title: 'Tab1',
  api: '/get/api',
  table: {

  },
  feature: {
    update: true,
    delete: true,
    create: true,
  },
  templates: [
    {
      label: '姓名',
      value: 'name',
      type: 'input',
      require: true,
      visible: {
        table: true,
        filter: false,
        update: true,
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
        update: true,

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
        update: true,
      },
    },
  ],
}

export const testOptions2: OptionsConfiguration = {
  title: 'Tab2',
  api: '/get/api/2',
  table: {

  },
  feature: {
    update: true,
    delete: true,
    create: true,
  },
  templates: [
    {
      label: '姓名2',
      value: 'name',
      visible: {
        table: true,
        filter: false,
      },
    },
    {
      label: '负责人2',
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
      label: '报警人2',
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
      label: '创建人2',
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
      label: '都是人2',
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

export const mergeOptions = mergeFuzzyOptions(testOptions, testOptions2)
