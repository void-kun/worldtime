<template>
  <div class="toolbar">
    <div class="toolbar__sort">
      <v-icon name="oi-triangle-up" />
      <v-icon name="oi-triangle-down" />
    </div>
    <div class="toolbar__search">
      <v-icon name="md-add-round" />
      <input
        class="search-input"
        type="text"
        :value="searchText"
        @input="changeSearchText"
        @click="clickSearch"
        v-click-outside="clickSearchOutside"
        placeholder="Place or timezone"
        maxlength="50"
      />
      <v-icon
        name="co-clear-all"
        class="search-clear"
        v-show="searchText.length > 0"
        @click="clearSearchText"
      />
      <div
        class="search_autocomplete"
        :style="{ display: isSearch ? 'block' : 'none' }"
      >
        <ul class="autocomplete_list">
          <li
            class="autocomplete_list--item"
            v-for="tz in searchTimezones"
            v-bind:key="tz.id"
            @click="() => selectSearchResult(tz)"
          >
            {{ tz.country }}, {{ tz.city }}
          </li>
        </ul>
      </div>
    </div>
    <div class="toolbar__calendar">
      <flat-pickr
        v-model="timezPick"
        :config="timezPickConfig"
        class="time-pick"
        name="timezPick"
      />
      <button
        title="Toggle"
        data-toggle
      >
        <v-icon name="bi-calendar-date">
          <span
            aria-hidden="true"
            class="sr-only"
          >
            Toggle
          </span>
        </v-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { addIcons } from 'oh-vue-icons';
import {
  OiTriangleUp,
  OiTriangleDown,
  MdAddRound,
  BiCalendarDate,
  CoClearAll,
} from 'oh-vue-icons/icons';
import { Vietnamese } from 'flatpickr/dist/l10n/vn';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

import { useTimezoneStore } from '@/stores';
import { computed } from '@vue/reactivity';
import Timezone from '@/models/Timezone';

addIcons(OiTriangleDown, OiTriangleUp, MdAddRound, BiCalendarDate, CoClearAll);

const isSearch = ref(false);
const searchText = ref('');
const timezPick = ref(null);
const timezPickConfig = ref({
  wrap: true,
  altFormat: 'M j, Y',
  altInput: true,
  dateFormat: 'Y-m-d',
  locale: Vietnamese,
});

const timezoneStore = useTimezoneStore();
const searchTimezones = computed(() => timezoneStore.timezones);

const changeSearchText = async (event: Event) => {
  searchText.value = (event.target as HTMLInputElement).value;
  await timezoneStore.fetchTimezone(searchText.value);
  isSearch.value = true;
};

const clickSearch = () => {
  isSearch.value = true;
};

const clickSearchOutside = () => {
  isSearch.value = false;
};

const clearSearchText = () => {
  searchText.value = '';
};

const selectSearchResult = (tz: Timezone) => {
  timezoneStore.addTimeLine(tz);
};
</script>

<style lang="scss">
.toolbar {
  background: #eee;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  border-radius: 2px 2px 0 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &__sort {
    max-width: min-content;
    display: flex;
    align-items: center;
    padding: 0 5px;

    svg {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  &__search {
    background: white;
    border-radius: 3px;
    padding: 2px 5px;
    display: flex;
    align-items: center;
    position: relative;

    svg {
      color: #aaa;
      width: 15px;
    }

    input[type='text'] {
      border: none;
      width: 13rem;
      font-size: 0.75rem;
      color: #000;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #aaa;
      }
    }

    .search-clear {
      cursor: pointer;
      &:hover {
        color: #000;
        transition: color 0.3s;
      }
    }

    .search_autocomplete {
      position: absolute;
      background-color: #fff;
      border: 1px solid #ddd;
      top: 110%;
      left: 0;
      z-index: 1000;
      width: 100%;
      .autocomplete_list {
        display: flex;
        flex-direction: column;
        color: #bbb;

        &--item {
          font-size: 14px;
          padding: 5px 10px;
          border-bottom: 1px dashed #ddd;
          cursor: pointer;
          display: flex;
          align-items: center;

          &:hover {
            background-color: #eee;
            transition: background-color #eee;
          }
        }
      }
    }
  }

  &__calendar {
    margin-left: 1rem;
    position: relative;

    input[type='text'] {
      position: absolute;
      bottom: 0;
      z-index: -1;
    }

    button {
      border: none;
    }

    svg {
      cursor: pointer;
      width: 22px;
      height: 22px;
    }
  }
}
</style>
