# Desenvolvimento com Hot Reload

Este projeto suporta desenvolvimento com hot reload usando Docker.

## 🚀 Iniciando o ambiente de desenvolvimento

### Opção 1: Usando o script helper

```bash
./docker.sh dev
```

### Opção 2: Usando docker-compose diretamente

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

## 📝 Comandos disponíveis

- `./docker.sh dev` - Inicia serviços em modo desenvolvimento com hot reload
- `./docker.sh up` - Inicia serviços em modo produção
- `./docker.sh down` - Para todos os serviços
- `./docker.sh logs` - Mostra logs dos serviços
- `./docker.sh build-dev` - Constrói imagens de desenvolvimento
- `./docker.sh status` - Mostra status dos serviços

## 🔥 Hot Reload

Quando você usar `./docker.sh dev`, o frontend será executado com hot reload ativado:

- **Porta**: http://localhost:5173
- **Backend Strapi**: http://localhost:1337
- **Strapi Admin**: http://localhost:1337/admin

Qualquer alteração nos arquivos do frontend (`front/portifolio-mise/src/`) será automaticamente refletida no navegador sem precisar reconstruir a imagem.

## 📁 Estrutura

- `docker-compose.yml` - Configuração de produção
- `docker-compose.dev.yml` - Configuração de desenvolvimento (hot reload)
- `front/portifolio-mise/Dockerfile.dev` - Dockerfile para desenvolvimento

## ⚠️ Notas importantes

1. O código fonte é montado como volume, então as mudanças são refletidas imediatamente
2. O `node_modules` não é montado como volume, usando as dependências do container
3. Se você adicionar novas dependências, precisará reconstruir a imagem:
   ```bash
   ./docker.sh build-dev
   ./docker.sh dev
   ```

## 🛑 Parando os serviços

```bash
./docker.sh down
```
