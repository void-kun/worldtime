<template>
  <div class="controls">
    <div class="glass"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.controls {
  display: block;
  .glass {
    z-index: 1001;
    inset: 0px 22px 0px 315px;
    position: absolute;
    cursor: default;
  }
}
</style>
