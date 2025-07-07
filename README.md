# products-widget  
Aplicação de produtos com um monorepo incluindo `/api`, backend feito com Nest.js usando express, prisma com postgres e swagger, e `/app`, frontend feito com Nuxt com tailwind e daisy UI.  

---

## 🛠️ Tech Stack

- **Framework Backend**: [Nest.js 11 (api)](https://nestjs.com/)
- **Framework Frontend**: [Nuxt.js 3 (app)](https://nuxt.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **Tests**: [Jest](https://jestjs.io/)  
- **Language**: TypeScript

---

## Estrutura  
- **Backend** 
```bash
src/
├── application/                            # Casos de uso / serviços
│   ├── entities/                           # Entidades e agregados
│   ├── repositories/                       # Contratos de repositorios, interfaces
│   ├── use-cases/                          # Casos de uso antigo strategies
│   ├── |── errors/                         # Exceção de erros relacionado aos use cases
│   ├── |── categories/                     # Casos de uso de categorias e testes 
│   ├── |── managers/                       # Casos de uso de gerenciadores e testes 
│   ├── |── products/                       # Casos de uso de produtos e testes 
├── infra/                                  # Camadda de infra
│   ├── database/
│   |   └── prisma/                         
│   |   |   └── mappers/
│   |   |   └── repositories/               
│   └── http/                               # Camad http
│   ├───└── controllers/                    # Controllers
│   ├───└── dtos/                           # DTOs, modelo padrão de dados para requisições
│   ├───└── view-models/                    # Modelos de visualização de dados padrões
├── helpers/                                # Helpers, utils, constantes
├── prisma/                                 # Configurações e schemas do prisma
└── tests/                                  # Configurações gerais de testes
```  
- **Frontend**  
```bash  
├── assets/         #Estilos, imagens e etc
├── components/     #Componentes
├── ├── ui/         #Componentes genéricos de UI
├── composables/    #Orquestração de casos de uso
├── layouts/        #Configurações de layout
├── services/       #Serviços de comunicação com a API
├── view-models/    #Tipos, interfaces. models compartilhados
├── pages/          #Páginas da aplicação
├── server/         #Servidor nuxt
├── stores/         #Gerenciamento de estados globais
├── helpers/        #Funções utilitárias
├── public/         #Arquivos estáticos
└── nuxt.config.ts
```
---  

## Instalação e configuração   
- Clone o repositortio:  
  `git clone https://github.com/patpolts/products-widget`  
- Rodar a base postgres com o docker  
  - Copie o `env_example` para `.env` e insira as informações desejadas para a base de dados a ser gerada no container do doker  
  - Rode o container do docker:  
  `docker compose up -d`
- Acesse e instale as dependências backend:  
  `cd api/`  
  `npm install`  
- Copie o `env_example` para `.env` e insira os dados da base de dados postgres ou dos dados gerados no .env raíz na `DATABASE_URL`  
- Gere as migrações prisma:  
  `npx prisma migrate dev`  
  `npx prisma generate`   
- (Opicional)Rode o prisma studio para cadastros / visualizações da base em  `http://localhost:5555/:  
  `npx prisma studio`  
- Rode o servidor dentro da pasta `api`:  
  `npm run start:dev`   
- Acesse e instale as dependências frontend:  
  `cd app/`  
  `npm install`  
- Copie o `env_example` para `.env` e insira os dados da api em `NUXT_PUBLIC_API_BASE_URL`  
- Rode o app:  
  `npm run dev` 

 Também é possivel rodar o backend e frontend simultaneamente executando o comando abaixo na raiz do projeto:  
 `npm run dev`  
 ---

 ### Documentação api  
 Para acessar e visualizar as rotas existentes na api acesse `htpp://localhost/api` com o servidor da api rodando.  

---  

### Sobre aPI e Funcionalidades  
- **CRUD produtos e categorias**  
  Gerenciamento de produtos, categorias e imagens de produtos, imagens de SKUs não está funcional  
  - **Lógica de cadastro**  
    - Cadastre a categoria ou categorias, o parametro `categoryId` é obrigatório para o cadastro do produto exemplo de request:  
      ```bash  
      {
        "name": "Categoria teste 1",
        "description": "This is a test ub category 1",
        "slug": "category-test-1",
        "parentId": null, 
        "isActive": true
      }
      ```  
    > ⚠️ **Observação:** No frontend a página de detalhe do produto exibe apenas a categoria principal do produto com o link para a pagina da categoria contendo os produtos existentes nela.
    - Cadastre o produto, exemplo de request:
      ```bash  
      {
        "name": "Test Product ",
        "description": "This is the test product, lorem ipsum lorem at num lorem,  lorem ipsum lorem at num lorem  lorem. ",
        "slug": "product-test-o",
        "categoryId": "f16f1734-11ff-4a85-a555-a33779ba568b", 
        "isActive": true
      }
      ```  
    - Cadastre o sku, exemplo de request:  
    ```bash
    {
      "productId": "42e7f65d-73e8-45bb-ade3-defba3ed5e07",
      "code": "SKU-TEST-E-001",
      "price": 2999,
      "color": "azul",
      "dimensions": "10x10",
      "size": "M"
      "stock": 100,
      "deletedAt": null
  }
  ```
    - Cadastre o a imagem do produto, exemplo de request:  
    ```bash
    {
      "productId": "7eda9cf9-f9a0-4152-a61c-8f39e544110b",
      "url": "https://img1.sellvia.com/uploads/2024/03/07/65218d7f718038763e3479b4f9fb523f.jpg",
      "altText": "Test Image D 2",
      "featured": false,
      "position": 1
    }
  ```  
  - **Request de produtos**  
  > O request de `/product`  retorna a paginação e possui 2 parametros query extras opicionais: `categoryId` do tipo UUID e `order` do tipo asc ou desc

 ## TODO:  
 - API de cadastro e logica de negocios de managers, atualmente funciona via prisma studio porém sem lógica de negocio  
 - Completar testes unitários