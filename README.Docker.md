# Docker Setup - MISE Project

Este projeto está dockerizado e pode ser executado facilmente usando Docker Compose.

## Pré-requisitos

- Docker (versão 20.10 ou superior)
- Docker Compose (versão 2.0 ou superior)

## Configuração Inicial

1. Copie o arquivo de exemplo de variáveis de ambiente:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e substitua os valores `toBeModified` por strings aleatórias seguras. Você pode gerar usando:
```bash
# Linux/Mac
openssl rand -base64 32

# Ou use um gerador online de strings aleatórias
```

## Executando o Projeto

### Iniciar todos os serviços
```bash
docker-compose up -d
```

### Ver os logs
```bash
docker-compose logs -f
```

### Parar os serviços
```bash
docker-compose down
```

### Parar e remover volumes (limpar dados)
```bash
docker-compose down -v
```

### Reconstruir as imagens
```bash
docker-compose build --no-cache
```

## Acessos

- **Frontend**: http://localhost:3000
- **Backend (Strapi)**: http://localhost:1337
- **Strapi Admin**: http://localhost:1337/admin

## Estrutura dos Serviços

### Frontend
- **Porta**: 3000
- **Tecnologia**: Vue.js 3 + Vite
- **Servidor**: Nginx (produção)

### Backend
- **Porta**: 1337
- **Tecnologia**: Strapi CMS
- **Banco de Dados**: SQLite (padrão) ou PostgreSQL/MySQL (configurável)

## Volumes Persistentes

Os seguintes volumes são criados para persistir dados:
- `strapi-data`: Dados do banco SQLite
- `strapi-uploads`: Arquivos enviados para o Strapi

## Desenvolvimento

Para desenvolvimento local sem Docker, você pode executar:

### Frontend
```bash
cd front/portifolio-mise
yarn install
yarn dev
```

### Backend
```bash
cd services/strapi
npm install
npm run develop
```

## Troubleshooting

### Porta já em uso
Se as portas 3000 ou 1337 estiverem em uso, você pode alterá-las no arquivo `docker-compose.yml`:
```yaml
ports:
  - "3001:80"  # Frontend na porta 3001
  - "1338:1337"  # Backend na porta 1338
```

### Reconstruir após mudanças
```bash
docker-compose up -d --build
```

### Limpar tudo e começar do zero
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```
