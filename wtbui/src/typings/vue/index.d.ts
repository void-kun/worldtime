import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    log(message: string, level?: 'info' | 'warn' | 'error'): void;
  }
}
