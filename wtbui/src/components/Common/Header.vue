<template>
  <header class="header">
    <div class="header__left">
      <img
        src="@/assets/image/logo.png"
        alt="worldtimebuddy"
      />
    </div>
    <div class="header__right">
      <div class="signin">
        <span>Sign In</span>
      </div>
      <hour-format-component />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HourFormatComponent from '@/components/Common/HourFormat.vue';

export default defineComponent({
  name: 'HeaderComponent',
  components: {
    HourFormatComponent,
  },
});
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;

  &__left {
    display: flex;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  img {
    border: 0;
    width: 165px;
    height: 35px;
  }

  .signin {
    font-size: 15px;
  }
}
</style>
