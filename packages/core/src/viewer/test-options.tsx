import { ref } from 'vue'
import type { Handlers } from '../types/handlers'
import { defineConfig } from '../utils/defineConfig'
import { mergeFuzzyOptions } from '../utils/merge'
import useActionChip from './useActionChip'

export const testOptions = defineConfig({
  id: 'vcenter_2_1_1',
  dialog: {
    title: '用户',
  },
  title: 'tab1',
  api: '/get/api',
  table: {

  },
  lang: {
    deletePrompt: {
      tagText: data => 'test del',
    },
  },
  inject() {
    const count = ref(1)

    return () => ({
      count,
    })
  },
  slots: {
    dialogbox: (props) => {
      console.log('props: ', props)
      return (<div class="w-20 h-10 bg-red fixed left-0 top-10" onClick={() => {}}>{props.count.value}</div>)
    },
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
      rules: [{
        min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur',
      }],
      visible: {
        table: true,
        filter: false,
        update: true,
        create: true,
      },
      ...useActionChip(),
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
})

export const testOptions2 = defineConfig({
  dialog: {
    title: '用户',
  },
  id: 'vcenter_2_1_2',
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
})

export const mergeOptions = mergeFuzzyOptions(testOptions, testOptions2)

export const handlers1: Handlers = {
  async queryBefore({ data }) {
    console.log('queryBefore')
    return data
  },
  async updateBeforePop({ data }) {
    console.log('updateBeforePop')
    return data
  },
  async updateConfirm({ data }) {
    console.log('updateConfirm')

    return data
  },
  async createConfirm({ data }) {
    console.log('updateConfirm')
    return data
  },
  tabChange() {
    console.log('tabChange')
  },
  async deleteBefore({ data }) {
    console.log('deleteBefore')
    return data
  },
  createCancel() {
    console.log('createCancel')
  },
  updateCancel() {
    console.log('updateCancel')
  },
  updated() {
    console.log('updated')
  },
  onSelection(v) {
    console.log('onSelection', v)
  },
  onHeaderSelection(v) {
    console.log('onHeaderSelection', v)
  },
}

export const mergeHandlers = mergeFuzzyOptions(handlers1, handlers1)
