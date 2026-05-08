<div align="center">

# 🐝 Colmeia QA — Automação de Testes E2E

**Desafio técnico para a vaga de Analista de Testes na Colmeia.**  
Suíte de testes automatizados com Cypress, cobrindo fluxos críticos de autenticação com foco em qualidade, segurança e boas práticas de engenharia.

<br/>

[![Cypress](https://img.shields.io/badge/Cypress-15.x-04C38E?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2015+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Sobre o Projeto

Este repositório contém a automação de testes E2E desenvolvida como parte do desafio técnico para a vaga de **Analista de Testes** na **Colmeia**. O projeto foi estruturado seguindo o padrão **Page Object Model (POM)** para garantir manutenibilidade, legibilidade e escalabilidade.

Durante a execução dos testes, foi identificado e documentado um **bug crítico** no fluxo de autenticação: o sistema exibe a mensagem *"Seu login está incorreto, quer continuar?"* mesmo ao utilizar credenciais válidas, e o acesso só é possível ao clicar em "Continuar" — um fluxo UX inconsistente que pode impactar negativamente a confiança do usuário no sistema.

---

## 🏗️ Arquitetura

O projeto adota o padrão **Page Object Model (POM)**, que separa a lógica de interação com a UI dos cenários de teste. Isso garante que qualquer mudança na interface da aplicação exija alteração em apenas um lugar: o Page Object.

```bash
cypress/
├── e2e/
│   └── login.spec.cy.js       # Cenários de teste (Happy Path, Sad Paths, Segurança)
│
├── fixtures/
│   └── users.json             # Dados de teste externalizados (Data-Driven)
│
├── pages/
│   └── LoginPage.js           # Page Object — seletores e ações da tela de login
│
└── support/
    ├── commands.js            # Custom Commands reutilizáveis (cy.login, cy.loginViaUI)
    └── e2e.js                 # Arquivo de suporte global

cypress.config.js              # Configuração centralizada (baseUrl, retries, timeouts)
.github/
└── workflows/
    └── ci.yml                 # Pipeline de CI/CD com GitHub Actions
```

### Princípios técnicos aplicados

| Prática | Implementação |
|---|---|
| **Seletores estáveis** | Uso de `id` e `name` em vez de classes CSS dinâmicas |
| **Sem waits hardcoded** | `cy.intercept` + `cy.wait('@alias')` para aguardar respostas de API |
| **Dados externalizados** | Fixture `users.json` com perfis de usuário pré-definidos |
| **Cache de sessão** | `cy.session()` em `cy.login` para reutilizar autenticação entre specs |
| **Senhas protegidas** | `{ log: false }` oculta credenciais nos logs do Cypress |
| **Retries automáticos** | Configurados via `cypress.config.js` para mitigar testes flaky em CI |
| **Contextos separados** | `context()` divide Happy Path, Sad Paths e Security Tests |

---

## 🧪 Cenários Cobertos

| ID | Cenário | Tipo | Status |
|---|---|---|---|
| CT-001 | Login com credenciais válidas (Bug documentado) | Funcional / Bug | ✅ |
| CT-002 | Acesso ao Dashboard via botão "Continuar" | Funcional | ✅ |
| CT-003 | Login com senha incorreta | Negativo | ✅ |
| CT-004 | Login com campos em branco | Negativo / Limite | ✅ |
| CT-005 | SQL Injection nos campos de login | Segurança | ✅ |
| CT-006 | XSS no campo de e-mail | Segurança | ✅ |
| CT-007 | E-mail com tamanho excessivo (>300 chars) | Boundary | ✅ |

---

## 🐛 Bug Identificado

> **BUG-001 — Fluxo de autenticação inconsistente com credenciais válidas**
>
> **Credenciais:** `qa@test.com` / `123456`  
> **Resultado esperado:** Redirecionamento direto para o Dashboard.  
> **Resultado obtido:** Mensagem *"Seu login está incorreto, quer continuar?"* + botão "Continuar".  
> **Impacto:** Alto — gera desconfiança no usuário e caracteriza falha de UX e possivelmente de segurança.

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) **v20 ou superior**
- [npm](https://www.npmjs.com/) (incluso com o Node.js)
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/teste-colmeia-qa.git
cd teste-colmeia-qa/Cypress
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute os testes

#### Interface gráfica (Modo Interativo)
Ideal para desenvolvimento e depuração local.

```bash
npm run cy:open
```

#### Headless — Chrome (Modo CI)
Executa os testes sem abrir o navegador, como em um ambiente de CI.

```bash
npm run cy:run:chrome
```

#### Headless — padrão Electron

```bash
npm run cy:run
```

#### Com visualização do navegador

```bash
npm run cy:run:headed
```

---

## ⚙️ CI/CD com GitHub Actions

O projeto conta com uma **pipeline de Integração Contínua** configurada via GitHub Actions que executa toda a suíte de testes automaticamente a cada `push` ou `pull request` na branch `main`.

**Arquivo de configuração:** [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

### Fluxo da pipeline

```
Push/PR para main
      │
      ▼
┌─────────────────────────┐
│  1. Checkout do código  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  2. Setup Node.js 20    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  3. npm install         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  4. cypress run         │  ← Chrome | Paralelo (2 containers)
│     (GitHub Action v5)  │
└────────────┬────────────┘
             │
             ▼
      ✅ Sucesso / ❌ Falha notificada no PR
```

### Características da pipeline

- **Execução em `ubuntu-latest`** para consistência com ambientes de produção
- **Matriz de browsers** configurada (Chrome)
- **Execução paralela** em 2 containers para reduzir o tempo total
- **`fail-fast: false`** para garantir que todos os cenários sejam reportados mesmo em caso de falha parcial
- **`paths-ignore`** no README para evitar execuções desnecessárias

---

## 📄 Documentação

| Documento | Descrição |
|---|---|
| [📋 Plano de Testes](#) | Objetivo, escopo, estratégia, cenários BDD, matriz de risco |

> (https://docs.google.com/document/d/1aaBBvw89NX3PLmeHQXiQPLR3E_Bguzscg8T9uj2ArMQ/edit?usp=sharing)

---

## 👤 Autor

**Brunno Araújo**  
Analista de QA

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/SEU-PERFIL)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/SEU-USUARIO)
