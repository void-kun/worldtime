<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="timezone-board">
    <timezone-toolbar />
    <div class="content">
      <timezone-control />
      <div
        class="timeline"
        id="timeline"
      >
        <timezone-line
          v-for="timeline in lines"
          v-bind:key="timeline.id"
          :timeline="timeline"
          :home="home"
          :id="`line_${timeline.id}`"
          @mousedown="onMouseDown"
          v-memo="[timeline, home]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated } from 'vue';
import { useTimezoneStore } from '@/stores/timezone';
import TimezoneToolbar from '@/components/TimezoneToolbar.vue';
import TimezoneLine from '@/components/TimezoneLine.vue';
import TimezoneControl from '@/components/TimezoneControl.vue';

const timezoneStore = useTimezoneStore();
const lines = computed(() => timezoneStore.timeline);
const home = computed(() => timezoneStore.home);

function onMouseDown(event: MouseEvent) {
  console.log('mouse down');
  
  const item = event.target as HTMLDivElement;
  if (
    !(item.className as unknown as SVGAnimatedString)?.baseVal?.includes('move')
  )
    return;
  const line = item.parentElement as HTMLDivElement;
  console.log(line.style.top);
  console.log(event.clientY);
  
  line.style.background = '#444'
  line.style.position = 'absolute';
  line.style.zIndex = '1002';
  
  function onMouseMove(event: MouseEvent) {
    line.style.top = `${event.clientY}px`;
  }

  document.addEventListener('mousemove', onMouseMove);
  document.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    line.style.position = 'unset';
    line.style.zIndex = '1';
    // remove the mouse move event
    document.onmouseup = null;
  };
}

onMounted(() => {
  timezoneStore.initTimeline();
  timezoneStore.setCurrentTime();
  console.log('board mounted');
});

onUpdated(() => {
  console.log('board updated');
})

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

  .content {
    display: block;
    position: relative;

    .timeline {
      display: flex;
      flex-direction: column;
      user-select: none;
    }
  }
}
</style>
