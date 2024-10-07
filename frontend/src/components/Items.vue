<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { CircleCheck } from '@element-plus/icons-vue';
const props = defineProps({
  activeTab: {
    type: String,
    required: true
  }
});
const items = ref([
  {
    id: 0,
    name: 'Task 1',
    createdAt: '2024-10-01',
    description: 'Description for task 1',
    status: 'completed',
  },
  {
    id: 1,
    name: 'Task 2',
    createdAt: '2024-10-02',
    description: 'Description for task 2',
    status: 'incomplete',
  },
  {
    id: 2,
    name: 'Task 3',
    createdAt: '2024-10-03',
    description: 'Description for task 3',
    status: 'incomplete',
  }
])
const filteredItems = computed(() => {
  return items.value.filter(item => {
    if (props.activeTab === 'incomplete') {
      return item.status === 'incomplete';
    } else if (props.activeTab === 'completed') {
      return item.status === 'completed';
    }
  });
});
const handleCheck = (item: any) => {
  item.status = item.status === 'completed' ? 'incomplete' : 'completed';
};
</script>

<template>
  <div class="card-wrapper">
    <div v-for="(item, index) in filteredItems" :key="index" class="item">
      <div class="item-wrapper">
        <CircleCheck class="check-icon" @click="handleCheck(item)"/>
        <div class="item-content">
          <div class="item-header">
            <span
              class="item-name"
              :class="{ 'dashed': item.status === 'completed' }"
            >
              {{ item.name }}
            </span>
            <span class="item-date">{{ item.createdAt }}</span>
          </div>
          <div class="item-contentDesc">
            <span
              class="item-description"
              :class="{ 'dashed': item.status === 'completed' }"
            >
              {{ item.description }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  display: flex;
  flex-direction: column;
  width: 750px;
}

.item {
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  background-color: #272727;
  padding: 1rem;
  border-radius: 8px;
}

.item-wrapper {
  display: flex;
  gap: 1rem;
}

.item-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.item-header {
  display: flex; 
  justify-content: space-between;
  font-size: 18px;
}

.item-name {
  font-size: 24px;
  font-weight: 700;
}

.item-date {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.7;
}

.item-contentDesc {
  margin-top: 0.5rem;
}

.item-description {
  flex-grow: 1;
}

.item-date {
  margin-left: 1rem;
}

.check-icon {
  height: 25px;
  margin-top: 10px;
  cursor: pointer;
}

.dashed {
  text-decoration: line-through;
}

@media (max-width: 767px) {
  .card-wrapper {
    width: 100%;
  }
}
</style>