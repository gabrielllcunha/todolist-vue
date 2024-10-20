<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElNotification, ElForm, ElFormItem, ElInput } from 'element-plus'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '@/firebase.client'

const inputs = ref({
  email: '',
  password: ''
})

const recoverInputs = ref({
  email: ''
})

const router = useRouter()

const screen = ref<'signin' | 'signup' | 'recovery'>('signin')

const handleSignin = async () => {
  const trimmedEmail = inputs.value.email.trim()
  const trimmedPassword = inputs.value.password.trim()
  try {
    await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
    router.push('/items')
  } catch (error) {
    ElNotification({
      title: 'Erro',
      message: 'Email ou senha inválidos!',
      type: 'error'
    })
  }
}

const handleSignup = async () => {
  const trimmedEmail = inputs.value.email.trim()
  const trimmedPassword = inputs.value.password.trim()
  try {
    await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
    ElNotification({
      title: 'Sucesso',
      message: 'Sua conta está pronta para ser utilizada!',
      type: 'success'
    })
    router.push('/items')
  } catch (error) {
    ElNotification({
      title: 'Erro',
      message: 'Não foi possível criar a conta!',
      type: 'error'
    })
  }
}

const handleRecovery = async () => {
  const trimmedRecoveryEmail = recoverInputs.value.email.trim()
  try {
    await sendPasswordResetEmail(auth, trimmedRecoveryEmail)
    ElNotification({
      title: 'Sucesso',
      message: 'Um link de recuperação de senha foi enviado no seu email!',
      type: 'success'
    })
  } catch (error) {
    ElNotification({
      title: 'Erro',
      message: 'Não foi possível enviar o link de recuperação de senha!',
      type: 'error'
    })
  }
}
</script>

<template>
  <div class="login-card">
    <div v-if="screen === 'signin'">
      <h2>Login</h2>
      <el-form
        label-position="top"
        label-width="auto"
        :model="inputs"
        @submit.prevent="handleSignin"
      >
        <el-form-item label="Email" label-position="top">
          <el-input
            size="large"
            v-model="inputs.email"
            type="email"
            id="email"
            placeholder="Digite seu email"
          />
        </el-form-item>
        <el-form-item label="Senha" label-position="top">
          <el-input
            size="large"
            v-model="inputs.password"
            type="password"
            id="password"
            show-password
            placeholder="Digite sua senha"
          />
        </el-form-item>
        <el-button type="primary" native-type="submit" class="submit-button">Login</el-button>
      </el-form>
      <div class="form-links">
        <a href="#" @click.prevent="screen = 'recovery'" class="forgot-password"
          >Esqueci minha senha</a
        >
        <a href="#" @click.prevent="screen = 'signup'" class="sign-up"
          >Não tem conta? Registrar-se</a
        >
      </div>
    </div>

    <div v-if="screen === 'recovery'">
      <h2>Recuperar Senha</h2>
      <el-form
        label-position="top"
        label-width="auto"
        :model="recoverInputs"
        @submit.prevent="handleRecovery"
      >
        <el-form-item label="Email" label-position="top">
          <el-input
            size="large"
            v-model="recoverInputs.email"
            type="email"
            id="recovery-email"
            placeholder="Digite seu email"
          />
        </el-form-item>
        <el-button type="primary" native-type="submit" class="submit-button">
          Enviar link de recuperação
        </el-button>
      </el-form>
      <div class="form-links">
        <a href="#" @click.prevent="screen = 'signin'">Voltar ao login</a>
      </div>
    </div>

    <div v-if="screen === 'signup'">
      <h2>Registrar-se</h2>
      <el-form
        label-position="top"
        label-width="auto"
        :model="inputs"
        @submit.prevent="handleSignup"
      >
        <el-form-item label="Email" label-position="top">
          <el-input
            size="large"
            v-model="inputs.email"
            type="email"
            id="signup-email"
            placeholder="Digite seu email"
          />
        </el-form-item>
        <el-form-item label="Senha" label-position="top">
          <el-input
            size="large"
            v-model="inputs.password"
            type="password"
            id="signup-password"
            show-password
            placeholder="Digite sua senha"
          />
        </el-form-item>
        <el-button type="primary" native-type="submit" class="submit-button">
          Registrar-se
        </el-button>
      </el-form>
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
  margin-top: 1rem;
  padding: 1.25rem;
}
</style>
