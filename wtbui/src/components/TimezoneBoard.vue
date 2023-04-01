<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="timezone-board">
    <timezone-toolbar />
    <div class="content">
      <timezone-control />
      <div class="timeline">
        <timezone-line
          v-for="(timeline, index) in lines"
          v-bind:key="timeline.id"
          :timeline="timeline"
          :home="home"
          :id="`line_${timeline.id}`"
          @dragstart="onDrag($event, index)"
          @dragover="onDragOver($event)"
          @dragend="onDragEnd($event)"
          @drop="onDrop($event, index)"
          v-memo="[timeline, home]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useTimezoneStore } from '@/stores/timezone';
import TimezoneToolbar from '@/components/TimezoneToolbar.vue';
import TimezoneLine from '@/components/TimezoneLine.vue';
import TimezoneControl from '@/components/TimezoneControl.vue';

const timezoneStore = useTimezoneStore();
const lines = computed(() => timezoneStore.timeline);
const home = computed(() => timezoneStore.home);

const dragging = ref<number>(-1);

function onDrag(event: DragEvent, index: number) {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    dragging.value = index;
  }
  return false;
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
}

function onDragEnd(event: DragEvent) {
  event.preventDefault();
}

function onDrop(event: DragEvent, index: number) {
  if (event.dataTransfer) {
    moveLine(dragging.value, index);
  }
}

function moveLine(from: number, to: number) {
  lines.value.splice(to, 0, lines.value.splice(from, 1)[0]);
}

// function onMouseDown(event: MouseEvent) {
//   const line = event.target as HTMLDivElement;

//   console.log(line);

//   line.style.position = 'absolute';
//   line.style.zIndex = '1002';

//   document.body.appendChild(line);

//   moveAt(event.pageX, event.pageY);

//   function onMouseMove(event: MouseEvent) {
//     moveAt(event.pageX, event.pageY);
//   }

//   function moveAt(pageX: number, pageY: number) {
//     line.style.left = `${pageX - 10}px`;
//     line.style.top = `${pageY - 10}px`;
//   }

//   document.addEventListener('mousemove', onMouseMove);

//   line.onmouseup = function () {
//     document.removeEventListener('mousemove', onMouseMove);
//     line.onmouseup = null;
//   };
// }

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

  .content {
    display: block;
    position: relative;
  }
}
</style>
