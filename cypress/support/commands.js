Cypress.Commands.add('login', (email, password) => {

  cy.get('[name="email"]').type(email)

  cy.get('[name="password"]').type(password)

  cy.contains('Entrar').click()

})