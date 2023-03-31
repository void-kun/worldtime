<template>
  <div class="home">
    <timezone-board />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimezoneBoard from '@/components/TimezoneBoard.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    TimezoneBoard,
  },
});
</script>
