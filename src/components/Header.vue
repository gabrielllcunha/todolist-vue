<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus'
import { UserStore } from '@/stores/user';
const router = useRouter();
const userStore = UserStore();
const handleLogout = async () => {
  try {
    await userStore.logout();
    router.push('/');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
</script>

<template>
  <header class="header">
    <div class="header-content">
        <el-button class="logout" link @click="handleLogout">
            Sair
        </el-button>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #121212;
  padding: 1rem;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.logout {
  color: white !important;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 0.08rem;
}

.logout:hover {
  background-color: transparent !important;
  text-decoration: none !important;
  color: white !important;
}
</style>