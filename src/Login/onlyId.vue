
<template>
  <div>
    <p>Device Fingerprint: {{ deviceFingerprint }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default {
  setup() {
    const deviceFingerprint = ref('Loading...');

    onMounted(async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      deviceFingerprint.value = result.visitorId;
    });

    return {
      deviceFingerprint,
    };
  },
};
</script>
