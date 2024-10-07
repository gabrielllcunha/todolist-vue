import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api';

export type Item = {
  id: string;
  title: string;
  description: string;
  status: 'incomplete' | 'completed';
  date: Date;
};

export const TodoItemStore = defineStore('item', () => {
	const items = ref<{
		completed: Item[],
		incomplete: Item[],
	}>({
		completed: [],
		incomplete: [],
	});
	const hasMore = ref({
		completed: true,
		incomplete: true,
	});

	const getItem = async (pageNumber: string, status: 'completed' | 'incomplete') => {		
		const { data } = await api.get<{items: Item[], hasMore: boolean}>('/item', {
			params: {
				pageNumber,
				status: parseStatus(status),
			}
		});		
		
		if (pageNumber === '1')	items.value[status] = data.items;
		else items.value[status] = [...items.value[status], ...data.items];
		hasMore.value[status] = data.hasMore;
	}

	const createItem = async (item: Omit<Item, 'id' | 'createdAt'>) => {
			await api.post('/item/create', item);
			await getItem('1', 'incomplete');
	}

	const updateItemStatus = async (item: Item, newStatus: 'completed' | 'incomplete') => {
		await api.put(`/item/update/${item.id}`, {
			...item,
			status: newStatus
		});

		await getItem('1', item.status === 'incomplete' ? 'incomplete' : item.status)
		await getItem('1', newStatus === 'incomplete' ? 'incomplete' : newStatus)
	}

	const deleteItem = async (item: Item) => {
		await api.delete(`/item/delete/${item.id}`);

		await getItem('1', item.status === 'incomplete' ? 'incomplete' : item.status)
	}

	const updateItem = async (id: string, item: Omit<Item, 'id' | 'createdAt'>) => {
		await api.put(`/item/update/${id}`, item)
		await getItem('1', item.status === 'incomplete' ? 'incomplete' : item.status)
	}

	const parseStatus = (status: 'completed' | 'incomplete') => {
		if (status === 'incomplete') return 'incomplete';
		return status;
	};

  return { getItem, items, hasMore, createItem, updateItem, updateItemStatus, deleteItem }
})


