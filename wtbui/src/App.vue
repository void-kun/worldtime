<template>
  <app-layout />
</template>

<script setup lang="ts">
import AppLayout from '@/components/Layout/AppLayout.vue';
</script>

<style lang="scss">
@import url(./assets/scss/_variable.scss);
@import url(./assets/scss/common.scss);

html,
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  color: var(--text-cl);
}

body {
  background: var(--primary-cl)
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABlBMVEUAAADu7u6BVFV4AAAAAXRSTlMAQObYZgAAAD1JREFUaN7t0TEBAAAMgzDm3/Rs9MiBAVJ1mioPmIgJEzFhIiZMxERMmIgJEzFhIiZiwkRMmIgJEzERk8ke1xwJxQlKQNMAAAAASUVORK5CYII=);
}
</style>
