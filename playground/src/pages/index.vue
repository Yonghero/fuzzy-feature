<script setup lang="ts" generic="T extends any, O extends any">
import { ABC } from '~/components/Test'

defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div>
    <div i-carbon-campsite inline-block text-4xl />
    <ABC />
    <div py-4 />
  </div>
</template>
