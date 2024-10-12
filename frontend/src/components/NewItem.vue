<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElButton } from 'element-plus'
import { TodoItemStore } from '@/stores/item';

const itemStore = TodoItemStore();
const item = ref('');
const emptyNewItem = computed(() => item.value.length === 0);
const handleCreate = () => {
  if (emptyNewItem.value) return;
  itemStore.createItem({
    title: item.value,
    description: '',
    status: 'incomplete',
  });
  item.value = '';
};
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleCreate();
  }
};
</script>

<template>
  <div class="newitem-wrapper">
    <input
      v-model="item"
      type="text"
      placeholder="Digite para adicionar um novo item"
      class="item-input"
      @keydown="handleKeydown"
    />
    <el-button 
        type="primary"
        @click="handleCreate"
        :disabled="emptyNewItem"
        class="create-button"
    >
        Adicionar
    </el-button>
  </div>
</template>

<style scoped>
.newitem-wrapper {
  display: flex;
  gap: 1rem;
  width: 750px;
  margin-bottom: 2rem;
}

@media (max-width: 767px) {
  .newitem-wrapper {
    width: 100%;
  }
}

.item-input {
  flex-grow: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.create-button {
  padding: 0.5rem 1rem;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
