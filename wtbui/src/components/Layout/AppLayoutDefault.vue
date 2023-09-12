<template>
  <div class="container">
    <header-component />
    <slot />
    <footer-component />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/Common/Header.vue';
import FooterComponent from '@/components/Common/Footer.vue';
</script>

<style lang="scss">
.container {
  width: var(--width-app);
  margin: 0 auto;
}
</style>
