<template>
    <div ref="chartContainer" style="height: 600px;width: 400px;"></div>
    <ImportBtn :url="'http://10.20.72.231:9999' + 'incoming_template'" :parameter="{ state: 1 }" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import ImportBtn from '../assets/import.vue'
const chartContainer = ref(null);
onMounted(() => {
    // 初始化echarts
    let myChart = echarts.init(chartContainer.value);

    // 定义图表配置项
    let options = {
        title: {
            text: '示例图表',
            subtext: '这是一个示例图表的子标题'
        },
        xAxis: {
            type: 'category',
            data: ['选项1', '选项2', '选项3', '选项4', '选项5']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70],
                type: 'bar'
            },
            {
                data: [120, 200, 150, 80, 70],
                type: 'line'
            }
        ]
    };

    // 使用配置项绘制图表
    myChart.setOption(options);
});

// return {
//     chartContainer
// };

</script>

<style ></style>