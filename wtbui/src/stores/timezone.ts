import moment from 'moment';
import { defineStore } from 'pinia';

import Timezone from '@/models/Timezone';
import localStore from '@/config/localstore';
import Timeline from '@/models/Timeline';
import { TIME_MODE } from '@/utils/constants';
import { numberRange } from '@/utils';
import { timezoneService } from '@/api';

export const useTimezoneStore = defineStore({
  id: 'timezone',
  state: () => ({
    _timezones: [] as Timezone[],
    _timeline: [] as Timeline[],
    _home: {} as Timezone,
    _now: new Date(),
    _blink: true,
    _timeMode: TIME_MODE.MODE_24,
  }),
  actions: {
    async initTimeline() {
      try {
        // get timeline from local store
        const timeline: Timeline[] = localStore.getTimeline();
        const home: Timezone = localStore.getHome();
        if (timeline && timeline.length > 0) {
          this._timeline = [...timeline];
          if (home) {
            this._home = home;
          } else {
            this._home = Object.assign({}, timeline[0]);
          }
        } else {
          throw new Error();
        }
      } catch (error) {
        await this.fetchTimezone('Can');
        this._timeline = [...(this._timezones as Timeline[])];
        this._home = Object.assign({}, this._timeline[0]);

        // save to local storage
        localStore.setTimeline(this._timeline);
        localStore.setHome(this._home);
      }

      this.calculateHourLine();
    },
    async fetchTimezone(placeOrZone?: string) {
      if (placeOrZone === undefined) placeOrZone = '';
      const data = await timezoneService.gets(placeOrZone);
      this._timezones = data.filter(
        (tz) => !this._timeline.some((tl) => tz.id === tl.id)
      );
    },
    addTimeLine(timezone: Timezone) {
      if (this._timeline.find((tz) => tz.id === timezone.id)) return;
      this._timeline.push(timezone as Timeline);
      this._timezones = this._timezones.filter((tz) => tz.id !== timezone.id);
      this.calculateHourLine();
    },
    setCurrentTime() {
      this._now = new Date();
      this._blink = !this._blink;
      setTimeout(this.setCurrentTime, 1000);
    },
    currentTime(utcOffset: number) {
      const date = moment(this._now).add(utcOffset, 'hours');
      return {
        date: date.format('ddd, MMM DD'),
        hour: date.format('HH'),
        minute: date.format('mm'),
        second: date.format('ss'),
      };
    },
    calculateHourLine() {
      this._timeline.forEach((tz) => {
        const hourline = this.hourLine(tz.utcOffset - this._home.utcOffset);
        if (hourline) {
          tz.hourLine = hourline;
        }
      });
    },
    hourLine(startHour: number) {
      if (this._timeMode === TIME_MODE.MODE_24) {
        if (startHour < 0) {
          return [
            ...numberRange(24 - startHour, 23, 1),
            ...numberRange(0, 24 - startHour - 1, 1),
          ];
        } else {
          return [
            ...numberRange(startHour, 23, 1),
            ...numberRange(0, startHour - 1, 1),
          ];
        }
      } else if (this._timeMode === TIME_MODE.MODE_12) {
        return [
          ...numberRange(startHour, 11, 1),
          ...numberRange(0, 11, 1),
          ...numberRange(0, startHour - 1, 1),
        ];
      }
    },
    updateTimeline(newTimeline: Timeline[]) {
      this._timeline.length = 0;
      this._timeline.push(...newTimeline);
    },
  },
  getters: {
    home: (state) => state._home,
    timeline: (state) => state._timeline,
    timezones: (state) => state._timezones,
    blink: (state) => state._blink,
  },
});
