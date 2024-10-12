<script setup lang="ts">
import { ref, computed } from 'vue';
import { CircleCheck, Delete } from '@element-plus/icons-vue';
import { ElIcon, ElInput } from 'element-plus';
import { TodoItemStore } from '@/stores/item';
import { storeToRefs } from 'pinia';

const props = defineProps({
  activeTab: {
    type: String,
    required: true
  }
});
const itemStore = TodoItemStore();
const { items } = storeToRefs(itemStore);
const editingItem = ref<{ id: string | null, field: string | null }>({ id: null, field: null });
const setEditingItem = (id: string | null, field: string | null) => {
  editingItem.value = { id, field };
};
const updateItemField = (item: any, field: string, value: string) => {
  itemStore.updateItemField(item.id, field, value);
};
const filteredItems = computed(() => {
  if (props.activeTab === 'incomplete') {
    return items.value.incomplete;
  } else if (props.activeTab === 'completed') {
    return items.value.completed;
  } else {
    return [];
  }
});
const handleCheck = (item: any) => {
  const newStatus = item.status === 'completed' ? 'incomplete' : 'completed';
  itemStore.updateItemStatus(item, newStatus);
};
const hoveredIcon = ref<{ type: string | null, id: string | null }>({ type: null, id: null });
const setHoveredIcon = (type: string | null, id: string | null) => {
  hoveredIcon.value = { type, id };
};
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};
</script>

<template>
  <div class="items-wrapper">
    <div v-for="(item, index) in filteredItems" :key="index" class="item">
      <div class="item-wrapper">
        <el-icon
          class="check-icon"
          size="25"
          :style="{ 
            color: hoveredIcon.type === 'check' && hoveredIcon.id === item.id && item.status === 'incomplete' 
              ? '#16CC31' 
              : '#EBEBEBA3', 
            transition: 'color 0.3s ease' 
          }"
          @click="handleCheck(item)"
          @mouseover="setHoveredIcon('check', item.id)"
          @mouseleave="setHoveredIcon(null, null)"
        >
          <CircleCheck />
        </el-icon>
        <div class="item-content">
          <div class="item-text">
            <span v-if="editingItem.id !== item.id || editingItem.field !== 'title'"
                class="item-title"
                :class="{ 'dashed': item.status === 'completed' }"
                @click="setEditingItem(item.id, 'title')">
              {{ item.title }}
            </span>
            <el-input v-else
              v-model="item.title"
              @blur="() => { setEditingItem(null, null); updateItemField(item, 'title', item.title); }"
              style="width: 240px"
              placeholder="Edit title" 
            />
            <span v-if="editingItem.id !== item.id || editingItem.field !== 'description'"
                class="item-description"
                :class="{ 'dashed': item.status === 'completed' }"
                @click="setEditingItem(item.id, 'description')">
              {{ item.description }}
            </span>
            <el-input v-else
              v-model="item.description"
              @blur="() => { setEditingItem(null, null); updateItemField(item, 'description', item.description); }"
              style="width: 240px"
              placeholder="Edit description" 
            />
          </div>
          <div class="item-info">
            <span class="item-date">{{ formatDate(item.createdAt) }}</span>
            <el-icon 
              class="delete-icon"
              size="16"
              :style="{ 
                color: hoveredIcon.type === 'delete' && hoveredIcon.id === item.id 
                  ? '#FF4C4C' 
                  : '#EBEBEBA3', 
                transition: 'color 0.3s ease' 
              }"
              @click="itemStore.deleteItem(item.id)"
              @mouseover="setHoveredIcon('delete', item.id)"
              @mouseleave="setHoveredIcon(null, null)"
            >
              <Delete />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.items-wrapper {
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
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
}

.item-text {
  display: flex;
  flex-direction: column;
}

.item-info {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
}

.item-title {
  font-size: 24px;
  font-weight: 700;
}

.item-description {
  margin-top: 0.5rem;
}

.item-date {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.7;
  margin-top: 0.5rem;
}

.delete-icon {
  margin-bottom: 0.3rem;
  cursor: pointer;
}

.check-icon {
  margin-top: 10px;
  cursor: pointer;
}

.dashed {
  text-decoration: line-through;
}

@media (max-width: 767px) {
  .items-wrapper {
    width: 100%;
  }
}
</style>