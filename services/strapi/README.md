# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

## Integração com o portfólio (MISE)

Este Strapi alimenta **todas as seções** do frontend. Os dados são editáveis pelo **Content Manager** e usam **componentes** para estruturas repetíveis (parágrafos, botões, serviços, etc.).

### Content types

| API | Tipo | Uso no front |
|-----|------|--------------|
| **header** | Single | Hero (nome, textos rotativos, títulos, tagline, botões) |
| **about** | Single | Sobre mim (título, parágrafos, card de perfil com avatar) |
| **project** | Collection | Projetos (nome, descrição, imagem, ícone, tecnologias) |
| **experience** | Collection | Experiências profissionais |
| **how-can-i-help** | Single | Como posso ajudar (título, descrição, tech logos, serviços) |
| **footer** | Single | Rodapé (links sociais, CTA, copyright) |

### Componentes (editáveis no GUI)

- **home.rotating-text** – Texto que alterna no header
- **home.header-button** – Botão do hero (label + URL)
- **about.paragraph** – Parágrafo (conteúdo + destaque)
- **about.profile** – Perfil (nome, título, handle, status, avatar, ícone, grain)
- **services.service-item** – Serviço (título, descrição, ícone)
- **services.tech-logo** – Tech logo (ícone, título, href)
- **footer.social-link** – Link social (id, label, url)
- **shared.link** – Link genérico (label, url)

Imagens (avatar, ícone, grain, imagens dos projetos) são gerenciadas pela **Media Library** do Strapi.

### Permissões para a API pública

1. Acesse o admin: `http://localhost:1337/admin`
2. Crie um usuário admin na primeira execução (se pedido).
3. Vá em **Settings → Users & Permissions → Roles → Public**.
4. Em **Permissions**, marque para cada content type:
   - **Header**: `find`
   - **About**: `find`
   - **Project**: `find`, `findOne`
   - **Experience**: `find`, `findOne`
   - **How-can-i-help**: `find`
   - **Footer**: `find`
5. Salve.

Assim o frontend consegue ler os dados sem token. Para produção, considere usar um **API Token** (Settings → API Tokens) e enviar no header `Authorization: Bearer <token>`.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
