
# Temis Hub

Uma solução completa desenvolvida para modernizar a rotina jurídica. Este sistema centraliza as operações diárias de um advogado, oferecendo controle total sobre prazos e dados processuais em uma interface intuitiva e responsiva.


-----

## 🚀 Instalação e Execução

Siga os passos abaixo para configurar o projeto localmente.

### 1\. Clone o repositório

```bash
git clone https://github.com/LYNX-Grupo-9/Sistema.git
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

## ☁️ 🚀 Deploy (CI/CD Automatizado)
Este projeto utiliza um pipeline de Integração Contínua e Entrega Contínua (CI/CD) orquestrado pelo GitHub Actions, que automatiza a construção, o push da imagem Docker e a implantação na AWS.

Fluxo de Deploy

O deploy é acionado automaticamente em pushes para o branch main (ou o branch de produção configurado) e segue os passos abaixo:

1. Build do Projeto: O GitHub Actions executa os testes e, em seguida, gera o build otimizado da aplicação.

2. Dockerização: A aplicação é empacotada em uma imagem Docker.

3. Push para o Registry: A imagem Docker é enviada para um registro de contêineres da AWS, como o Amazon ECR (Elastic Container Registry).

4. Implantação na AWS: O pipeline se conecta ao serviço de contêineres da AWS (Amazon ECS - Elastic Container Service ou EKS - Elastic Kubernetes Service) e força uma nova implantação, garantindo que o serviço utilize a imagem mais recente do ECR.

Requisitos de Configuração

Para que o pipeline funcione corretamente, é necessário configurar as seguintes Secrets no seu repositório GitHub (em Settings > Secrets > Actions):

### Requisitos de Configuração

Para que o pipeline funcione corretamente, é necessário configurar as seguintes **Secrets** no seu repositório GitHub (em `Settings > Secrets > Actions`):

| Secret | Descrição |
| :--- | :--- |
| **AWS_ACCESS_KEY_ID** | Chave de acesso do usuário IAM com permissões de ECR/ECS. |
| **AWS_SECRET_ACCESS_KEY** | Chave secreta correspondente. |
| **AWS_REGION** | Região da AWS onde o serviço está hospedado (ex: `sa-east-1`). |
| **ECR_REGISTRY_URL** | URL completa do seu repositório ECR. |
| **ECS_CLUSTER_NAME** | Nome do cluster ECS onde o serviço será implantado. |
| **ECS_SERVICE_NAME** | Nome do serviço ECS a ser atualizado. |

Build Manual (Local)

Para fins de desenvolvimento ou debug local, você pode construir e rodar a imagem Docker manualmente:

Build da Imagem:

Bash
```
docker build -t nome-da-sua-aplicacao .
````

Execução Local:

Bash

````
docker run -p 8080:80 nome-da-sua-aplicacao
````
