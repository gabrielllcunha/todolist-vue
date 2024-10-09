<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase.client';

const inputs = ref({
	email: '',
	password: ''
})

const recoverInputs = ref({
	email: ''
})

const router = useRouter();

const screen = ref<'signin' | 'signup' | 'recovery'>('signin')

const handleSignin = async () => {
  const trimmedEmail = inputs.value.email.trim();
  const trimmedPassword = inputs.value.password.trim();
  try {
    await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
    router.push('/items');
  } catch (error) {
    console.error('Login failed:', error);
  }
}

const handleSignup = async () => {
  const trimmedEmail = inputs.value.email.trim();
  const trimmedPassword = inputs.value.password.trim();
  try {
    await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
    router.push('/items');
  } catch (error) {
    console.error('Signup failed:', error);
  }
}

const handleRecovery = async () => {
  const trimmedRecoveryEmail = recoverInputs.value.email.trim();
  try {
    await sendPasswordResetEmail(auth, trimmedRecoveryEmail);
  } catch (error) {
    console.error('Password recovery failed:', error);
  }
}
</script>

<template>
  <div class="login-card">
    <div v-if="screen === 'signin'">
      <h2>Login</h2>
      <form @submit.prevent="handleSignin">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="inputs.email" type="email" id="email" placeholder="Digite seu email" />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input v-model="inputs.password" type="password" id="password" placeholder="Digite sua senha" />
        </div>
        <el-button
          type="primary"
          native-type="submit"
          class="submit-button"
        >
          Login
        </el-button>
      </form>

      <div class="form-links">
        <a href="#" @click.prevent="screen = 'recovery'" class="forgot-password">Esqueci minha senha</a>
        <a href="#" @click.prevent="screen = 'signup'" class="sign-up">Não tem conta? Registrar-se</a>
      </div>
    </div>

    <div v-if="screen === 'recovery'">
      <h2>Recuperar Senha</h2>
      <form @submit.prevent="handleRecovery">
        <div class="form-group">
          <label for="recovery-email">Email</label>
          <input v-model="recoverInputs.email" type="email" id="recovery-email" placeholder="Digite seu email" />
        </div>
        <el-button
          type="primary"
          native-type="submit"
          class="submit-button"
        >
          Enviar link de recuperação
        </el-button>
      </form>

      <div class="form-links">
        <a href="#" @click.prevent="screen = 'signin'">Voltar ao login</a>
      </div>
    </div>

    <div v-if="screen === 'signup'">
      <h2>Registrar-se</h2>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="signup-email">Email</label>
          <input v-model="inputs.email" type="email" id="signup-email" placeholder="Digite seu email" />
        </div>
        <div class="form-group">
          <label for="signup-password">Senha</label>
          <input v-model="inputs.password" type="password" id="signup-password" placeholder="Digite sua senha" />
        </div>
        <el-button
          type="primary"
          native-type="submit"
          class="submit-button"
        >
          Registrar-se
        </el-button>
      </form>

      <div class="form-links">
        <a href="#" @click.prevent="screen = 'signin'">Já tem conta? Fazer login</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-card {
  display: flex;
  flex-direction: column;
  width: 35vw;
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 12px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 767px) {
  .login-card {
    width: 100%;
  }
}

h2 {
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  background-color: #333;
  color: #fff;
}

input::placeholder {
  color: #bbb;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #e69500;
}

.form-links {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.forgot-password,
.sign-up {
  color: orange;
  text-decoration: none;
  font-size: 0.9rem;
}

.sign-up {
  text-align: end;
}

.forgot-password:hover,
.sign-up:hover {
  text-decoration: underline;
}

.submit-button {
  padding: 1.25rem;
}
</style>
