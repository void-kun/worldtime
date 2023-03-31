<template>
  <div class="timezone-board">
    <timezone-toolbar />
    <div class="content">
      <timezone-line
        v-for="(timeline, index) in lines"
        v-bind:key="timeline.id"
        :timeline="timeline"
        :is-odd="index % 2 == 0"
        :home="home"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTimezoneStore } from '@/stores/timezone';
import TimezoneToolbar from '@/components/TimezoneToolbar.vue';
import TimezoneLine from '@/components/TimezoneLine.vue';

const timezoneStore = useTimezoneStore();
const lines = computed(() => timezoneStore.timeline);
const home = computed(() => timezoneStore.home);

onMounted(() => {
  timezoneStore.initTimeline();
  timezoneStore.setCurrentTime();
});
</script>

<style lang="scss">
.timezone-board {
  background: white;
  margin: 30px 0;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 3px;
  -moz-box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 20px 50px -20px rgb(0 0 0 / 30%);
  box-shadow: 0 20px 50px -20px rgb(0 0 0 / 30%);
}
</style>
