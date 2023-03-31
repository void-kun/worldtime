<template>
  <div class="container">
    <header-component />
    <slot></slot>
    <footer-component />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '@/components/Header.vue';
import FooterComponent from '@/components/Footer.vue';

export default defineComponent({
  name: 'MainLayoutComponent',
  components: {
    HeaderComponent,
    FooterComponent,
  },
});
</script>

<style lang="scss">
.container {
  width: var(--width-app);
  margin: 0 auto;
}
</style>
