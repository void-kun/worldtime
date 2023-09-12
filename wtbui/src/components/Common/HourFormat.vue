<template>
  <div class="hformat">
    <span
      class="btn"
      v-for="mode in hformat"
      :key="mode.code"
    >
      <pre>{{ mode.title }}</pre>
    </span>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const hformat = reactive([
  {
    title: 'am\npm',
    code: 'AM',
  },
  {
    title: '24',
    code: '24',
  },
  {
    title: 'MX',
    code: 'MX',
  },
]);
</script>

<style lang="scss">
.hformat {
  display: flex;

  .btn {
    display: block;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid var(--text-cl);

    &:hover {
      background-color: white;
    }
  }

  .btn:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    transform: translateX(1px);
  }

  .btn:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    transform: translateX(-1px);
  }

  pre {
    margin: 0;
    line-height: 0.7;
  }
}
</style>
