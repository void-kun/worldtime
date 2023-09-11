<template>
  <div class="container">
    <header-component />
    <slot />
    <footer-component />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '@/components/Common/Header.vue';
import FooterComponent from '@/components/Common/Footer.vue';

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
