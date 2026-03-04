# Troubleshooting

## Problema: Frontend rodando em modo desenvolvimento quando deveria estar em produção

### Sintomas
- Ao executar `./docker.sh up` (produção), o frontend roda na porta 5173 (Vite dev server) ao invés da porta 3000 (nginx)
- Logs mostram `vite --host 0.0.0.0` ao invés de `nginx`

### Causa
A imagem Docker foi construída com o `Dockerfile.dev` (desenvolvimento) ao invés do `Dockerfile` (produção).

### Solução

1. **Parar os containers:**
   ```bash
   ./docker.sh down
   ```

2. **Remover a imagem antiga:**
   ```bash
   docker rmi mise-frontend
   ```

3. **Reconstruir a imagem de produção:**
   ```bash
   ./docker.sh build
   ```

4. **Iniciar os serviços:**
   ```bash
   ./docker.sh up
   ```

### Prevenção

- Use `./docker.sh build` para produção (usa `Dockerfile`)
- Use `./docker.sh build-dev` para desenvolvimento (usa `Dockerfile.dev`)
- Use `./docker.sh up` para produção
- Use `./docker.sh dev` para desenvolvimento

### Verificação

Após o build, verifique qual Dockerfile foi usado:
```bash
docker history mise-frontend | head -5
```

Se você ver `nginx:alpine` na base, está correto (produção).
Se você ver `node:20-alpine` sem nginx, está errado (desenvolvimento).
