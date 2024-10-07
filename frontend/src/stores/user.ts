import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import api from '@/api';

export const UserStore = defineStore('user', () => {
	const router = useRouter();
	const isLogged = ref(false);
	const user = ref({
		email: '',
	});

	const getUser = async () => {
		try {
			const { data } = await api.get<{ email: string }>('/auth/user');
			if (data && typeof data.email === 'string') {
				user.value = data;
				isLogged.value = true;
			} else {
				console.error('Unexpected response structure:', data);
			}
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const logout = async () => {
		try {
			await api.post('/auth/logout');
		} catch (error) {
			console.error(error);
		} finally {
			user.value = { email: '' };
			router.push('/');
		}
	};


	const recoveryPassword = async (email: string) => {
		await api.post('/auth/recovery', {
			email,
		});
	}

  return { user, getUser, logout, recoveryPassword, isLogged }
})


