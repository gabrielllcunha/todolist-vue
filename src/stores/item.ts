import { ref } from 'vue'
import { defineStore } from 'pinia'
import { database } from '@/firebase.client'
import { ref as dbRef, push, update, onValue, remove } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase.client'

export type Item = {
  id: string
  title: string
  description: string
  status: 'incomplete' | 'completed'
  createdAt: string
}

export const TodoItemStore = defineStore('item', () => {
  const items = ref<{ completed: Item[]; incomplete: Item[] }>({
    completed: [],
    incomplete: []
  })
  const isLoading = ref<boolean>(false)
  const userId = ref<string | null>(null)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId.value = user.uid
      getItems(user.uid)
    } else {
      userId.value = null
      items.value = { completed: [], incomplete: [] }
      isLoading.value = false
    }
  })

  const getItems = async (uid: string) => {
    isLoading.value = true
    const itemsRef = dbRef(database, `users/${uid}/items`)
    onValue(itemsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const allItems = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }))

        items.value.completed = allItems.filter((item) => item.status === 'completed')
        items.value.incomplete = allItems.filter((item) => item.status === 'incomplete')
      } else {
        items.value = { completed: [], incomplete: [] }
      }
      isLoading.value = false
    })
  }

  const createItem = async (newItem: Omit<Item, 'id' | 'createdAt'>) => {
    if (!userId.value) return
    const item = {
      ...newItem,
      createdAt: new Date().toISOString(),
      status: 'incomplete'
    }
    const itemsRef = dbRef(database, `users/${userId.value}/items`)
    await push(itemsRef, item)
  }

  const updateItemStatus = async (item: Item, newStatus: 'completed' | 'incomplete') => {
    if (!userId.value) return
    const itemRef = dbRef(database, `users/${userId.value}/items/${item.id}`)
    await update(itemRef, { status: newStatus })
  }

  const updateItemField = async (itemId: string, field: string, value: string) => {
    if (!userId.value) return
    const itemRef = dbRef(database, `users/${userId.value}/items/${itemId}`)
    await update(itemRef, { [field]: value })
  }

  const deleteItem = async (itemId: string) => {
    if (!userId.value) return
    const itemRef = dbRef(database, `users/${userId.value}/items/${itemId}`)
    await remove(itemRef)
  }

  return { items, isLoading, createItem, updateItemStatus, updateItemField, deleteItem }
})
