// @ts-check
/// <reference types="cypress" />

export const LoginPage = {
  getUsername() {
    return cy.get('[data-test="username"]')
  },
  getPassword() {
    return cy.get('[data-test="password"]')
  },
  getError() {
    return cy.get('[data-test=error]')
  },
  getLoginButton(){
    return cy.get('[data-test="login-button"]')
  },
  noErrors() {
    cy.log('**there are no errors**')
    LoginPage.getError().should('not.exist')
    LoginPage.getUsername().should('not.have.class', 'error')
    LoginPage.getPassword().should('not.have.class', 'error')
  },
  showsErrorMessage(msg){
    LoginPage.getError()
      .should('be.visible')
      .and('include.text', msg)
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')      
  },
}
