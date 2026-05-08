const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // ─── Configurações Gerais ─────────────────────────────────────────────────
  projectId: "colmeia-qa", // Usado pelo Cypress Cloud (opcional)

  // ─── E2E ──────────────────────────────────────────────────────────────────
  e2e: {
    baseUrl: "https://teste-colmeia-qa.colmeia-corp.com",
    specPattern: "cypress/e2e/**/*.spec.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",

    // Timeouts
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,

    // Retries: tenta novamente testes flaky antes de marcar como falha
    retries: {
      runMode: 2,   // Em CI (cypress run)
      openMode: 0,  // Em desenvolvimento (cypress open)
    },

    // Vídeo e screenshots apenas em CI para economizar espaço local
    video: true,
    screenshotOnRunFailure: true,

    // Viewport padrão (Desktop Full HD)
    viewportWidth: 1280,
    viewportHeight: 720,

    setupNodeEvents(on, config) {
      // Plugins e node event listeners podem ser adicionados aqui
      return config
    },
  },
});
