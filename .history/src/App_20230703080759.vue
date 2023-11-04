<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import appHistory from '@ice/stark-app/lib/appHistory';

const jumpToLayout = () => {
  appHistory.push('/');
};

</script>

<template>
<RouterView/>
</template>

<style scoped>
</style>
