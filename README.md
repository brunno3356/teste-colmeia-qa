# Teste Colmeia QA - Automação com Cypress

Projeto de automação de testes desenvolvido como parte do desafio técnico QA Automation utilizando Cypress.

## Tecnologias utilizadas

- Cypress
- JavaScript
- Node.js
- GitHub Actions

---

# Estrutura do projeto

```bash
cypress/
 ├── e2e/
 │    └── login.cy.js
 │
 ├── pages/
 │    └── LoginPage.js
 │
 ├── support/
 │    ├── commands.js
 │    └── e2e.js
```

---

# Cenários automatizados

## Login com credenciais válidas

Valida o comportamento do sistema ao realizar login com credenciais válidas.

### Fluxo testado:
- Preenchimento de email
- Preenchimento de senha
- Clique no botão Entrar
- Validação da mensagem apresentada

---

## Login com credenciais inválidas

Valida o comportamento do sistema ao realizar tentativa de login inválida.

### Fluxo testado:
- Email válido
- Senha inválida
- Validação da mensagem de erro

---

# Possível bug identificado

Durante os testes foi identificado um comportamento inconsistente no fluxo de autenticação.

## Comportamento observado

Mesmo utilizando credenciais válidas:

```txt
qa@test.com
123456
```

o sistema apresenta a mensagem:

```txt
Seu login está incorreto, quer continuar?
```

Além disso, o sistema disponibiliza um botão "Continuar" após informar que o login está incorreto.

## Resultado esperado

O sistema deveria:
- autenticar o usuário com sucesso
ou
- retornar uma mensagem clara de erro sem permitir continuidade inconsistente no fluxo.

---

# Como executar o projeto

## Instalar dependências

```bash
npm install
```

---

## Executar Cypress em modo interface

```bash
npx cypress open
```

---

## Executar testes em modo headless

```bash
npx cypress run
```

---

# CI com GitHub Actions

O projeto possui integração contínua utilizando GitHub Actions para execução automatizada dos testes.

---

# Autor

Brunno Araújo
