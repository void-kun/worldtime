<template>
  <div class="line">
    <v-icon
      name="co-cursor-move"
      class="move"
    />
    <div class="line__options"></div>
    <div class="line__content">
      <div class="offset tooltip">
        <div
          class="tz_offset"
          :style="{ color: '#000000' }"
          v-if="isHome"
        >
          <v-icon name="px-home" />
        </div>
        <div
          class="tz_offset"
          v-else
        >
          {{
            hourDiffWithHome >= 0 ? '+' + hourDiffWithHome : hourDiffWithHome
          }}
        </div>
        <span class="tooltiptext">
          {{ tooltiptext }}
        </span>
      </div>
      <div class="location">
        <span class="country">
          <span class="title">{{ timeline.country }}</span>
          <span class="timezone">{{ `GMT${offset}` }}</span>
        </span>
        <span class="city">{{ timeline.city }}</span>
      </div>
      <div class="time">
        <span class="current_time">
          {{ currentTime.hour }}
          <span :style="{ color: blink ? '#ccc' : '#000' }">:</span>
          {{ currentTime.minute }}
          <span :style="{ color: blink ? '#ccc' : '#000' }">:</span>
          {{ currentTime.second }}
        </span>
        <span class="current_date">{{ currentTime.date }}</span>
      </div>
      <hour-line :hourline="timeline.hourLine" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { addIcons } from 'oh-vue-icons';
import { PxHome, CoCursorMove } from 'oh-vue-icons/icons';

import Timezone from '@/models/Timezone';
import { useTimezoneStore } from '@/stores/timezone';
import HourLine from '@/components/HourLine.vue';
import Timeline from '@/models/Timeline';

addIcons(PxHome, CoCursorMove);

interface Props {
  timeline: Timeline;
  home: Timezone;
}

const props = defineProps<Props>();
const offset = computed(() => {
  return props.timeline.utcOffset >= 0
    ? `+${props.timeline.utcOffset}`
    : `${props.timeline.utcOffset}`;
});
const isHome = computed(() => props.home.id === props.timeline.id);
const hourDiffWithHome = computed(
  () => props.timeline.utcOffset - props.home.utcOffset
);
const tooltiptext = computed(() => {
  if (isHome.value) {
    return `Home Time Zone (GMT${offset.value})`;
  } else {
    return `${hourDiffWithHome.value} hours from Home (GMT${offset.value})`;
  }
});

const timezoneStore = useTimezoneStore();
const currentTime = computed(() =>
  timezoneStore.currentTime(props.timeline.utcOffset)
);
const blink = computed(() => timezoneStore.blink);
</script>

<style lang="scss">
.line {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  &:nth-of-type(odd) {
    background-color: #ffffff;
  }
  &:nth-of-type(even) {
    background-color: #f5f5f5;
  }

  .move {
    cursor: move;
    display: block;
  }
  &__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
.offset {
  width: 40px;
}
.tz_offset {
  margin: 5px 10px;
  font-size: 13px;
  font-weight: 600;
  color: #aaa;
}
.location {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5px;
  width: 180px;
  .country {
    display: flex;
    align-items: center;
    .title {
      font-size: 14px;
      font-weight: bold;
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .timezone {
      font-size: 10px;
      font-weight: 400;
      background-color: #e6e6e6;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      margin-left: 5px;
      padding: 2px;
    }
  }
  .city {
    font-size: 12px;
    max-width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.time {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  widows: 70px;
  .current_time {
    font-size: 13px;
    font-weight: bold;
  }
  .current_date {
    font-size: 11px;
    color: #b0b0b0;
  }
}
</style>
