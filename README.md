# products-widget  
Aplicação de produtos com um monorepo incluindo `/api`, backend feito com Nest.js usando express, prisma com postgres e swagger, e `/app`, frontend feito com Nuxt com tailwind e daisy UI.

## Estrutura  
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
│   |   └── prisma/                         #base nova à implementar
│   |   |   └── mappers/
│   |   |   └── repositories/               #base nova à implementar
│   └── http/                               # Camad http
│   ├───└── controllers/                    # Controllers
│   ├───└── dtos/                           # DTOs, modelo padrão de dados para requisições
│   ├───└── view-models/                    # Modelos de visualização de dados padrões
├── helpers/                                # Helpers, utils, constantes
├── prisma/                                 # Configurações e schemas do prisma
└── tests/                                  # Configurações gerais de testes
```
