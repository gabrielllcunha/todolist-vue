<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import { TodoItemStore } from '@/stores/item'

const itemStore = TodoItemStore()
const item = ref('')
const emptyNewItem = computed(() => item.value.length === 0)
const handleCreate = () => {
  if (emptyNewItem.value) return
  itemStore.createItem({
    title: item.value,
    description: '',
    status: 'incomplete'
  })
  item.value = ''
}
const handleKeydown = (event: Event) => {
  const keyboardEvent = event as KeyboardEvent
  if (keyboardEvent.key === 'Enter') {
    handleCreate()
  }
}
</script>

<template>
  <div class="newitem-wrapper">
    <el-input
      v-model="item"
      placeholder="Digite para adicionar um novo item"
      type="text"
      size="large"
      @keydown="handleKeydown"
    />
    <el-button type="primary" @click="handleCreate" :disabled="emptyNewItem" class="create-button">
      Adicionar
    </el-button>
  </div>
</template>

<style scoped>
.newitem-wrapper {
  display: flex;
  gap: 1rem;
  width: 750px;
  height: 40px;
  margin-bottom: 2rem;
  align-items: center;
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
  height: 100%;
  box-sizing: border-box;
}

.create-button {
  padding: 0.5rem 1rem;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
}

.create-button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
