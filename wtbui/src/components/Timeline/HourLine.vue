<template>
  <div class="hourline">
    <ul class="hourline__content">
      <li
        :class="['hour', `hour__${hour}`]"
        v-for="hour in hours"
        v-bind:key="hour"
      >
        {{ hour }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface Props {
  hourline: number[];
}

const props = defineProps<Props>();
const hours = computed(() => props.hourline);
</script>

<style lang="scss">
.hourline {
  height: 30px;
  flex: 1;
  display: block;
  margin-left: 35px;
  position: relative;

  &__content {
    display: flex;
    height: 100%;
  }
}
.hour {
  width: 27px;
  border-top: 1px solid #8ba3c9;
  border-bottom: 1px solid #8ba3c9;
  color: #8ba3c9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  user-select: none;

  &__0 {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-left: 1px solid #8ba3c9;
    background-color: #8ba3c9;
    color: #edfbff;
  }
  &__23 {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-right: 1px solid #8ba3c9;
    margin-right: 1px;
  }
  &__1,
  &__2,
  &__3,
  &__4,
  &__5,
  &__22,
  &__23 {
    background-color: #95b3d7;
    color: #edfbff;
  }
  &__6,
  &__7,
  &__18,
  &__19,
  &__20,
  &__21 {
    background-color: #edfbff;
    color: #8ba3c9;
  }
  &__8,
  &__9,
  &__10,
  &__11,
  &__12,
  &__13,
  &__14,
  &__15,
  &__16,
  &__17 {
    background-color: #fffff3;
    color: #8ba3c9;
  }
}
</style>
