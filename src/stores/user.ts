import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase.client'

export type User = {
  email: string
  uid: string | null
}

export const UserStore = defineStore('user', () => {
  const router = useRouter()
  const isLogged = ref<boolean>(false)
  const isAuthReady = ref<boolean>(false)
  const user = ref<User>({
    email: '',
    uid: null
  })

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      isLogged.value = true
      user.value = {
        email: firebaseUser.email || '',
        uid: firebaseUser.uid
      }
    } else {
      isLogged.value = false
      user.value = { email: '', uid: null }
    }
    isAuthReady.value = true
  })

  const getUser = () => {
    const currentUser = auth.currentUser
    if (currentUser) {
      user.value = {
        email: currentUser.email || '',
        uid: currentUser.uid
      }
      isLogged.value = true
    } else {
      isLogged.value = false
      user.value = { email: '', uid: null }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      isLogged.value = false
      user.value = { email: '', uid: null }
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return { isLogged, isAuthReady, user, getUser, logout }
})
