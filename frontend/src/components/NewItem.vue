<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElButton } from 'element-plus'
import { auth, database } from '@/firebase.client';
import { ref as dbRef, push } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const item = ref('')
const emptyNewItem = computed(() => item.value.length === 0)
const userId = ref<string | null>(null);
onAuthStateChanged(auth, (user: any) => {
  if (user) {
    userId.value = user.uid;
  } else {
    userId.value = null;
  }
});
const handleCreate = async () => {
  if (!userId.value) {
    console.log('User not authenticated.');
    return;
  }
  const newItem = {
    title: item.value,
    createdAt: new Date().toISOString(),
    description: '',
    status: 'incomplete',
  };
  try {
    const itemsRef = dbRef(database, `users/${userId.value}/items`);
    await push(itemsRef, newItem);
    item.value = '';
  } catch (error) {
    console.error('Error adding new item:', error);
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
