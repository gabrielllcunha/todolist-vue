<script setup lang="ts">
import NewItem from '@/components/NewItem.vue'
import Items from '@/components/Items.vue'
import Tabs from '@/components/Tabs.vue'
import Header from '@/components/Header.vue'
import { ref } from 'vue'
const activeTab = ref<'completed' | 'incomplete'>('incomplete');
</script>

<template>
    <Header />
    <NewItem />
    <Tabs v-model="activeTab">
    <template #incomplete>
      <Items :activeTab="activeTab" />
    </template>
    <template #completed>
      <Items :activeTab="activeTab" />
    </template>
    </Tabs>
</template>
