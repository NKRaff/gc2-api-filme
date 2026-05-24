# NKRaff-gc2-api-filme

[![Node Badge](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&label=20.x&logo=nodedotjs&logoColor=white&labelColor=black)](https://nodejs.org/)
[![Docker Badge](https://img.shields.io/badge/docker_hub-2496ED?style=for-the-badge&logo=docker&logoColor=white&labelColor=black)](https://hub.docker.com/r/nkraff/gc2-api-filme)
[![Vagrant Badge](https://img.shields.io/badge/Vagrant-1868F2?style=for-the-badge&logo=vagrant&logoColor=white&labelColor=black)](https://www.vagrantup.com/)
[![Jest Badge](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white&labelColor=black)](https://jestjs.io/)
[![Biome Badge](https://img.shields.io/badge/BiomeJS-60A5FA?style=for-the-badge&logo=biome&logoColor=white&labelColor=black)](https://biomejs.dev/)

---

## 📌 Sobre o Projeto

Esta API foi desenvolvida como parte prática da disciplina de **Gestão de Configuração II**. O principal objetivo deste repositório não é apenas a aplicação em si, mas a implementação de uma série de atividades e esteiras voltadas para a **melhoria contínua da qualidade do código e do repositório**.

Ao longo do desenvolvimento, o projeto evoluiu passando pelas seguintes etapas:
*   **Fluxo de Trabalho:** Estruturação de ramificação e entregas.
*   **Integração Contínua (CI):** Automação com GitHub Actions.
*   **Qualidade de Código:** Implementação de testes automatizados, linters e regras de proteção da branch principal (`main`).
*   **Conteinerização:** Criação e publicação de imagens Docker.
*   **Infraestrutura como Código (IaC):** Provisionamento de ambiente virtual com Vagrant.

---

## 🔄 Workflow Adotado

O modelo de desenvolvimento escolhido foi o **GitHub Flow**. 

Por se tratar de um modelo simples, ágil e focado em deploy contínuo, ele se encaixa perfeitamente no escopo desta API. O fluxo consiste em:
1. Criar uma branch a partir da `main` para cada nova funcionalidade ou correção.
2. Realizar os commits localmente.
3. Abrir um *Pull Request* (PR) para discutir as alterações.
4. Passar pelas validações automatizadas (CI).
5. Realizar o merge para a branch `main` após a aprovação.

---

## 🛠️ Pré-requisitos & Configuração Inicial

Independentemente da forma que você escolher para rodar o projeto, **é obrigatório configurar as variáveis de ambiente antes da execução**.

1. Duplique o arquivo de exemplo:
```bash
    cp .env.example .env
```

2. Abra o arquivo .env e configure as variáveis necessárias.

## 🚀 Como Executar o Projeto

Este projeto foi preparado para ser executado de três formas diferentes, dependendo do seu foco de estudo ou ambiente. Escolha uma das opções abaixo:

### Opção 1: Execução Local (Node.js)

Ideal para desenvolvimento rápido e depuração do código.

1. Instale as dependências:
```bash
    npm install
```

2. Inicie o servidor:
```bash
    npm run start
```

### Opção 2: Execução via Docker 🐋

Você pode rodar o projeto isolado em um container de duas maneiras:

#### A. Construindo a imagem localmente (via Dockerfile)

1. Certifique-se de ter o arquivo .env configurado.

2. Construa a imagem:
```bash
    docker build -t gc2-api-filme .
```

3. Rode o container passando o arquivo de ambiente:
```bash
    docker run -d -p 3000:3000 --env-file .env gc2-api-filme
```

#### B. Baixando a imagem pronta do Docker Hub

Se preferir não buildar o código, você pode baixar a imagem oficial.

1. Baixe a imagem:

```bash
    docker pull nkraff/gc2-api-filme 
```

2. Rode o container passando as variáveis manualmente no comando

```bash
    docker run -d -p 3000:3000 -e SERVER_PORTA=3000 nkraff/gc2-api-filme
```

### Opção 3: Execução via Máquina Virtual (Vagrant) 🦺

Ideal para simular o ambiente de produção completo e isolado em uma máquina virtual baseada no Vagrantfile disponível na raiz.

1. Certifique-se de ter o Vagrant e o Provider (VirtualBox) estão instalados.

2. Certifique-se de ter o arquivo .env configurado

3. Na raiz do projeto, inicie a máquina virtual:

```bash
    vagrant up
```

4. A máquina será provisionada e a API subirá automaticamente configurada dentro do ambiente virtualizado.

## 🛣️ Endpoints da API

| Método | Endpoint | Descrição | Corpo da Requisição (JSON) |
| ------ | -------- | --------- | -------------------------- |
| GET | /api/filmes | Retorna a lista de todos os filmes cadastrados. | Nenhum |
| POST | /api/filmes | Cadastra um novo filme | {"titulo": "String", "ano": Number, "generos": ["Array"]} |
| DELETE | /api/filmes/:id | Remove um filme cadastrado pelo ID. | Nenhum |

## 🛡️ Qualidade de Código & Scripts Disponíveis

Para garantir a consistência, estilo e o bom funcionamento da aplicação, os seguintes comandos podem ser utilizados:

### 🔬 Testes (Jest)
* Executar a suite de testes:
```bash
  npm run test
```
* Executar os testes com relatório de cobertura de código (Coverage):
```bash
    npm run test:cov
```

### 🧹 Análise Estática e Formatação (Biome)
* Verificar erros de linter e formatação:
```bash
    npm run check
```
* Corrigir e formatar automaticamente os arquivos em `src/` e `test/`:
```bash
    npm run format
```

### 🛡️ Automação e Integração Contínua (CI/CD)

O projeto possui uma esteira de automação robusta configurada via **GitHub Actions**, dividida em três workflows principais que garantem a estabilidade, estilo de código e integridade dos deploys.

#### 🔄 1. Pipeline de CI (Integração Contínua)
Disparado a cada `push` ou `pull_request` em qualquer branch. Ele roda 4 jobs em paralelo para validar o código rapidamente:
*   **`build`:** Instala as dependências de forma limpa (`npm ci`) e testa a inicialização da API em segundo plano (`npm start`).
*   **`test`:** Executa a suite de testes unitários com o Jest para garantir que nenhuma alteração quebrou a lógica existente.
*   **`lint`:** Valida as regras de estilo e boas práticas de código utilizando o **Biome** (`npm run check`).
*   **`docker-build`:** Valida se a aplicação continua gerando o build do container localmente com sucesso via `Dockerfile`.

#### 📊 2. Pipeline de Coverage (Cobertura de Código)
Disparado em `push` ou `pull_request` direcionados exclusivamente à branch `main`.
*   **`coverage`:** Roda o comando `npm run test:cov` e valida se o código possui uma cobertura mínima de 90%. Esse passo garante que as novas regras de negócio estejam devidamente protegidas por testes automatizados antes de irem para produção.

#### 🐳 3. Pipeline do DockerHub (CD - Entrega Contínua)
Disparado em eventos na branch `main`.
*   **`push-docker-image`:** Realiza a automação completa de build e publicação da imagem. Ele efetua o login seguro no Docker Hub (usando as credenciais do repositório) e envia a versão atualizada da aplicação diretamente para a tag `nkraff/gc2-api-filme:latest`.

> 💡 **Proteção de Branch:** A branch `main` está configurada com regras de proteção. Isso significa que um Pull Request só receberá permissão para merge se todos os status das validações acima (CI e Coverage) retornarem com sucesso ("verde").