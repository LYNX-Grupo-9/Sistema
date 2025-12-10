````markdown
# Temis Hub

Uma solução completa desenvolvida para modernizar a rotina jurídica. Este sistema centraliza as operações diárias de um advogado, oferecendo controle total sobre prazos e dados processuais em uma interface intuitiva e responsiva.

````

-----

## 🚀 Instalação e Execução

Siga os passos abaixo para configurar o projeto localmente.

### 1\. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2\. Instale as dependências

```bash
npm install
```

### 3\. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis:

```env
VITE_API_URL=[https://sua-api.com](https://sua-api.com)
```

### 4\. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: http://localhost:5173

-----

## 📦 Build para Produção

Para gerar os arquivos otimizados:

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist/`.

-----

## ☁️ Deploy

### Opção 1: Vercel ou Netlify

1.  Gere o build (`npm run build`).
2.  Envie todo o conteúdo da pasta `dist/` para a plataforma desejada.
      * *Dica: Ao conectar o repositório do GitHub na Vercel/Netlify, o build é feito automaticamente.*

### Opção 2: Deploy Manual (Apache / Nginx / cPanel)

1.  Gere o build.
2.  Envie os arquivos da pasta `dist/` para o diretório público do servidor (ex: `public_html`).

### Opção 3: GitHub Pages

1.  Instale o pacote `gh-pages`:

    ```bash
    npm install gh-pages --save-dev
    ```

2.  Adicione os scripts no `package.json`:

    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

3.  Execute o deploy:

    ```bash
    npm run deploy
    ```

4.  O projeto estará disponível em:
    `https://<SEU_USUARIO>.github.io/<NOME_DO_REPOSITORIO>`

<!-- end list -->

```

Gostaria de adicionar uma seção de **"Como contribuir"** ou uma **licença** específica a este arquivo?
```
