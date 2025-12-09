📘 Documentação do Projeto
📦 Instalação
Clone o repositório:
git clone <URL_DO_REPOSITORIO>
Instale as dependências:
npm install
🚀 Rodando o Projeto Localmente
Inicie o servidor de desenvolvimento:
npm run dev
Acesse o projeto no navegador em:
http://localhost:5173
🏗️ Build para Produção
Gere os arquivos otimizados para produção:
npm run build
Os arquivos gerados estarão na pasta dist/.
🚢 Deploy
Para fazer o deploy do projeto, siga os passos abaixo:
🔹 Deploy em um Servidor Estático (ex.: Vercel, Netlify)
Certifique-se de que o build foi gerado (veja a seção anterior).
Faça o upload do conteúdo da pasta dist/ para o serviço de hospedagem de sua escolha.
🔹 Deploy Manual em um Servidor Web
Gere o build de produção.
Faça o upload do conteúdo da pasta dist/ para o diretório público do seu servidor (ex.: Apache, Nginx).
🔹 Deploy no GitHub Pages
Instale o pacote gh-pages:
npm install gh-pages --save-dev
Adicione os seguintes scripts ao arquivo package.json:
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
Execute o comando para fazer o deploy:
npm run deploy
O projeto estará disponível em:
https://<SEU_USUARIO>.github.io/<NOME_DO_REPOSITORIO>
🔧 Variáveis de Ambiente
Certifique-se de configurar suas variáveis de ambiente no arquivo .env ou no painel da sua hospedagem.
Exemplo:
VITE_API_URL=https://sua-api.com
🛠️ Tecnologias Utilizadas
React
Vite
React Router
React Toastify