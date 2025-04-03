<!-- 分页打印 -->
<template>
  <div class="print-content">
    <div class="print-page">1</div>
    <div class="print-page">2</div>
    <div class="print-page">3</div>
  </div>
  <button @click="print">打印</button>
</template>

<script setup>
const print = () => {
  window.print();
}
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }

  .print-content,
  .print-content * {
    visibility: visible;
  }

  .print-content {
    position: absolute;
    left: 0;
    top: 0;
  }

  .print-page {
    page-break-after: always;
  }
}
</style>
