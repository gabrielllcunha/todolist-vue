# todolist-vue

Este é um projeto de um gerenciador de tarefas construído com **Vue.js**, utilizando **Element Plus** para a interface do usuário e **Firebase** para o gerenciamento de autenticação e armazenamento de dados. 
<br/>

## 🛠️ Configurando o ambiente

1. **Clone o repositório:**

    ```sh
    git clone https://github.com/gabrielllcunha/todolist-vue.git
    cd todolist-vue
    ```
    
2. **Instale as dependências:**
    
    ```sh
    cd frontend
    npm i
    ```

3. **Configure as variáveis de ambiente:**

    - Crie um arquivo `.env` na raiz da pasta `frontend` com base no `.env.example` fornecido.
    - Preencha o arquivo `.env` com suas credenciais do Firebase, que você pode encontrar no console do Firebase em **Configurações do projeto**.

    Exemplo de arquivo `.env`:
    ```sh
    VITE_FIREBASE_API_KEY=your-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    VITE_FIREBASE_APP_ID=your-app-id
    ```

4. **Inicialize o projeto:**

    ```sh
    npm run dev
    ```

## ⚡ Techs
- **Vue.js**: Framework progressivo para construção de interfaces de usuário.
- **Element Plus**: Biblioteca de componentes UI para Vue 3.
- **Vite**: Ferramenta de build rápida e leve para desenvolvimento de aplicações front-end.
- **Pinia**: Gerenciamento de estado para Vue.js.
- **Firebase**: Plataforma de desenvolvimento que fornece autenticação e armazenamento em tempo real.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao desenvolvimento.

## ✨ Funcionalidades

- Página de login para autenticação de usuários.
- Criação de tarefas.
- Marcação de tarefas como concluídas.
