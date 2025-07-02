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

## Estrutura Backend 
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
- (Opicional)Rode o prisma studio para cadastros / visualizações da base em  `localhost:5555/:  
  `npx prisma studio`  
- Rode o servidor dentro da pasta `api`:  
  `npm run start:dev`   
- Acesse e instale as dependências frontend:  
  `cd app/`  
  `npm install`  
- Copie o `env_example` para `.env` e insira os dados da api em `NUXT_PUBLIC_API_BASE_URL`  
- Rode o app:  
  `npm run dev` 

 Também é possivel rodar o backend e frontend simultaneamente executandoo comando abaixo na raiz do projeto:  
 `npm run dev`  
 ---

 ### Documentação api  
 Para acessar e visualizar as rotas existentes na api acesse `htpp:localhost/api` com o servidor da api rodando.  

---  

 ## TODO:  
 - API de Cadastro e lógica de negocios de categorias, atualmente funciona via prisma studio  porém sem logica de negocio
 - API de cadastro e logica de negocios de managers, atualmente funciona via prisma studio porém sem lógica de negocio  
 - Paginação  lista de produtos  
 - Layout e funcionalidades frontend  
 - Completar testes unitários