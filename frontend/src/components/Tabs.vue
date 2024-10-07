<script setup lang="ts">
import { ref } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';
const activeTab = ref('incomplete');
</script>

<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="À fazer" name="incomplete">
      <slot name="incomplete"></slot>
    </el-tab-pane>
    <el-tab-pane label="Completados" name="completed">
      <slot name="completed"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.el-tabs {
  margin-top: 1rem;
}

.el-tab-pane {
  padding: 1rem 0;
}

::v-deep .el-tabs__item:not(.is-active) {
  color: #6c6c6c;
}
</style>
