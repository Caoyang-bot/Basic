<template>
        <el-table-column v-for="row in rowList" :prop="row.prop" :label="row.label" :min-width="row.width" align="center"
            show-overflow-tooltip>
            <template v-if="row.custom" #default="scope">
                {{ row.custom(scope) }}
            </template>
        </el-table-column>
</template>

<script setup lang="ts">
const props = defineProps<{ rowList: { prop: string, label: string, width: string, custom?: (scope) => {} }[] }>()
</script>