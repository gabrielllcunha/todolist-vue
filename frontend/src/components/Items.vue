<script setup lang="ts">
import { ref, computed } from 'vue';
import { CircleCheck } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { auth, database } from '@/firebase.client';
import { ref as dbRef, get, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const props = defineProps({
  activeTab: {
    type: String,
    required: true
  }
});
const items = ref<any[]>([]);
const userId = ref<string | null>(null);
const fetchUserItems = async (uid: string) => {
  const itemsRef = dbRef(database, `users/${uid}/items`);
  const snapshot = await get(itemsRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    items.value = Object.keys(data).map(key => ({
      id: key, 
      ...data[key]
    }));
  } else {
    console.log('No data');
  }
};
onAuthStateChanged(auth, (user: any) => {
  if (user) {
    userId.value = user.uid;
    fetchUserItems(user.uid);
  } else {
    userId.value = null;
  }
});
const filteredItems = computed(() => {
  return items.value.filter(item => {
    if (props.activeTab === 'incomplete') {
      return item.status === 'incomplete';
    } else if (props.activeTab === 'completed') {
      return item.status === 'completed';
    }
  });
});
const handleCheck = async (item: any) => {
  item.status = item.status === 'completed' ? 'incomplete' : 'completed';
  if (userId.value) {
    const itemRef = dbRef(database, `users/${userId.value}/items/${item.id}`);
    await update(itemRef, { status: item.status });
  }
};
const hoveredItemId = ref<any>(null);
const setHoveredItem = (id: string | null) => {
  hoveredItemId.value = id;
};
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};
</script>

<template>
  <div class="card-wrapper">
    <div v-for="(item, index) in filteredItems" :key="index" class="item">
      <div class="item-wrapper">
        <el-icon
          class="check-icon"
          size="25"
          :style="{ 
            color: hoveredItemId === item.id && item.status === 'incomplete' ? '#16CC31' : '#EBEBEBA3', 
            transition: 'color 0.3s ease' 
          }"
          @click="handleCheck(item)"
          @mouseover="setHoveredItem(item.id)"
          @mouseleave="setHoveredItem(null)"
        >
          <CircleCheck />
        </el-icon>
        <div class="item-content">
          <div class="item-header">
            <span
              class="item-title"
              :class="{ 'dashed': item.status === 'completed' }"
            >
              {{ item.title }}
            </span>
            <span class="item-date">{{ formatDate(item.createdAt) }}</span>
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

.item-title {
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