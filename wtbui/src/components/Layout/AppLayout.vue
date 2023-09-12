<script setup lang="ts">
import { markRaw, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppLayoutDefault from '@/components/Layout/AppLayoutDefault.vue';

const layout = ref();
const route = useRoute();

watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      const component =
        metaLayout && (await import(`@/components/Layout/${metaLayout}.vue`));
      layout.value = markRaw(component?.default || AppLayoutDefault);
    } catch (e) {
      layout.value = markRaw(AppLayoutDefault);
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="layout"><router-view /></component>
</template>
