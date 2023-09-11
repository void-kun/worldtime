<script setup lang="ts">
import AppLayoutDefault from '@/components/Layout/AppLayoutDefault.vue';
import { markRaw, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const layout = ref();
const route = useRoute();

watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      const component = metaLayout && (await import(`./${metaLayout}.vue`));
      layout.value = markRaw(component?.default || AppLayoutDefault);
    } catch (e) {
      layout.value = markRaw(AppLayoutDefault);
    }
  },
  { immediate: true }
);
</script>

<template>
  <transition-group>
    <component :is="layout"><router-view /></component>
  </transition-group>
</template>
