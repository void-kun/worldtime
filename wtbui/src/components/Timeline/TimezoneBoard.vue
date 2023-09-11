<template>
  <div class="timezone-board">
    <timezone-toolbar />
    <div class="content">
      <timezone-control />
      <div
        class="timelines"
        id="timelines"
      >
        <timezone-line
          v-for="(timeline, index) in lines"
          v-bind:key="`line_${timeline.id}`"
          :timeline="timeline"
          :home="home"
          :id="index"
          @mousedown.prevent="(event: MouseEvent) => onMouseDown(event, index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTimezoneStore } from '@/stores';
import TimezoneToolbar from '@/components/Timeline/TimezoneToolbar.vue';
import TimezoneLine from '@/components/Timeline/TimezoneLine.vue';
import TimezoneControl from '@/components/Timeline/TimezoneControl.vue';
import Timeline from '@/models/Timeline';

const timezoneStore = useTimezoneStore();
const lines = computed(() => timezoneStore.timeline);
const home = computed(() => timezoneStore.home);
let top: number, lineHeight: number;

function onMouseDown(_event: MouseEvent, index: number) {
  const line = document.getElementById(index.toString()) as HTMLDivElement;
  const linesEle = line.parentElement as HTMLDivElement;
  top = line.offsetTop - _event.clientY;
  lineHeight = line.offsetHeight;

  // create placeholder line
  const placeholderLine = createLinePlaceholder();

  line.style.position = 'absolute';
  line.style.zIndex = '1002';
  line.style.border = '1px solid #ccc';
  line.style.backgroundColor = '#f5f5f5';
  line.style.top = `${_event.clientY + top}px`;

  let lineId = Math.round((_event.clientY + top) / lineHeight);
  linesEle.insertBefore(placeholderLine, linesEle.children[lineId]);

  function onMouseMove(event: MouseEvent) {
    line.style.top = `${event.clientY + top}px`;
    const overLine = Math.round((event.clientY + top) / lineHeight);
    if (overLine !== lineId) {
      lineId = overLine;
      linesEle.removeChild(placeholderLine);
      linesEle.insertBefore(placeholderLine, linesEle.children[lineId]);
    }
  }

  document.addEventListener('mousemove', onMouseMove);
  document.onmouseup = function (event: MouseEvent) {
    document.removeEventListener('mousemove', onMouseMove);
    line.removeAttribute('style');
    linesEle.removeChild(placeholderLine);
    const swapedId = parseInt((linesEle.children[lineId] as HTMLElement).id);

    const newLines = swapLine(lines.value, index, swapedId);
    timezoneStore.updateTimeline(newLines);
    // remove the mouse move event
    document.onmouseup = null;
  };
}

function createLinePlaceholder(): HTMLDivElement {
  const placeholderLine = document.createElement('div') as HTMLDivElement;
  placeholderLine.style.height = `${lineHeight}px`;
  placeholderLine.style.width = '999px';
  return placeholderLine;
}

function swapLine(
  lines: Timeline[],
  originId: number,
  swapedId: number
): Timeline[] {
  const temp = [...lines];
  [temp[originId], temp[swapedId]] = [temp[swapedId], temp[originId]];
  return temp;
}

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

    .timelines {
      display: flex;
      flex-direction: column;
      user-select: none;
    }
  }
}
</style>
