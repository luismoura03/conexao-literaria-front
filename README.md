📂 Estrutura do Projeto - Quasar App

Este documento descreve a estrutura do projeto Quasar App e a finalidade de cada pasta e arquivo.

📁 Estrutura de Pastas

frontend/
├── 📁 src/                  # Código-fonte do frontend

│   ├── 📁 assets/           # Recursos estáticos como imagens e fontes

│   ├── 📁 boot/             # Arquivos de inicialização do Quasar

│   │   ├── 🔹 apollo.js     # Configuração do Apollo Client

│   ├── 📁 components/       # Componentes reutilizáveis

│   │   ├── 📁 ConfirmDelete/      # Modal de confirmação de exclusão

│   │   ├── 📁 EditDialog/         # Modais de edição

│   │   ├── 📁 tables/             # Componentes de tabelas

│   │   │   ├── 📄 AuthorsTable.vue  # Tabela de autores

│   │   │   ├── 📄 BooksTable.vue    # Tabela de livros

│   │   │   ├── 📄 AuthorList.vue    # Lista de autores

│   │   │   ├── 📄 BooksList.vue     # Lista de livros

│   ├── 📁 css/              # Arquivos de estilos globais

│   │   ├── 🎨 app.css       # Estilização global

│   ├── 📁 graphql/          # Configurações GraphQL

│   │   ├── 📁 mutations/    # Mutations do GraphQL

│   │   │   ├── 📁 mutationsAuthors/  # Mutations relacionadas a autores

│   │   │   │   ├── 📄 createAuthor.js   # Criar autor

│   │   │   │   ├── 📄 deleteAuthor.js   # Deletar autor

│   │   │   │   ├── 📄 updateAuthor.js   # Atualizar autor

│   │   │   ├── 📁 mutationsBooks/    # Mutations relacionadas a livros

│   │   │   │   ├── 📄 createBook.js     # Criar livro

│   │   │   │   ├── 📄 deleteBook.js     # Deletar livro

│   │   │   │   ├── 📄 updateBook.js     # Atualizar livro

│   │   ├── 📁 queries/     # Queries do GraphQL

│   │   │   ├── 📄 authorsQueries.js   # Consultas de autores

│   │   │   ├── 📄 booksQueries.js     # Consultas de livros

│   ├── 📁 layouts/         # Layouts da aplicação

│   │   ├── 📄 MainLayout.vue  # Layout principal

│   ├── 📁 pages/           # Páginas da aplicação

│   │   ├── 📄 AuthorsPage.vue   # Página de autores

│   │   ├── 📄 BooksPage.vue     # Página de livros

│   │   ├── 📄 IndexPage.vue     # Página inicial

│   │   ├── 📄 ErrorNotFound.vue # Página de erro 404

│   ├── 📁 router/          # Configuração de rotas do Vue Router

│   │   ├── 📄 index.js         # Definição das rotas

│   │   ├── 📄 routes.js        # Arquivo de configuração de rotas

│   ├── 📄 App.vue           # Componente raiz do Vue

├── 📄 .gitignore           # Arquivo de exclusão do Git

├── 📄 package.json         # Configuração e dependências do projeto

├── 📄 quasar.config.js     # Configuração do Quasar

├── 📄 README.md            # Documentação do projeto

📝 Descrição das Principais Pastas e Arquivos

📁 src/: Contém todo o código-fonte do frontend.

📁 assets/: Armazena arquivos estáticos.

📁 boot/: Configurações de inicialização do Quasar, incluindo Apollo Client.

📁 components/: Componentes reutilizáveis usados nas páginas.

📁 tables/: Contém tabelas específicas para autores e livros.

📁 graphql/: Implementação das queries e mutations GraphQL.

📁 layouts/: Estrutura da aplicação.

📁 pages/: Diferentes páginas do sistema.

📁 router/: Configuração das rotas da aplicação.

📦 Dependências Principais (do package.json)

@apollo/client - Cliente GraphQL para comunicação com o backend.

@vue/apollo-composable - Integração do Apollo com Vue 3.

quasar - Framework Vue para UI.

vue - Framework principal do frontend.

vue-router - Gerenciamento de rotas no Vue.

🔹 Autor: luismoura03📌 Descrição: Um projeto Quasar com Vue 3, Vue Router e Apollo GraphQL.

