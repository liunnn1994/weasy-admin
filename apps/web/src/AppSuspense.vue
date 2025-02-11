<script setup lang="ts">
  import App from '@/App.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <App />
    </template>
    <template #fallback>
      <div class="loader"> </div>
    </template>
  </Suspense>
</template>
<style lang="scss" scoped>
  .loader {
    --gradient-1: #000000;
    --gradient-2: #ffffff00;
    width: 60px;
    display: flex;
    align-items: flex-start;
    aspect-ratio: 1;
    align-self: center;
    margin: auto;
  }
  .loader:before,
  .loader:after {
    content: '';
    flex: 1;
    aspect-ratio: 1;
    --g: conic-gradient(from -90deg at 10px 10px, var(--gradient-1) 90deg, var(--gradient-2) 0);
    background: var(--g), var(--g), var(--g);
    filter: drop-shadow(30px 30px 0 var(--gradient-1));
    animation: l20 1s infinite;
  }
  .loader:after {
    transform: scaleX(-1);
  }
  @keyframes l20 {
    0% {
      background-position:
        0 0,
        10px 10px,
        20px 20px;
    }
    33% {
      background-position: 10px 10px;
    }
    66% {
      background-position:
        0 20px,
        10px 10px,
        20px 0;
    }
    100% {
      background-position:
        0 0,
        10px 10px,
        20px 20px;
    }
  }
</style>
