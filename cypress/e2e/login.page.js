// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

export const loginPage = {
    getUsername(){
        return cy.get('[data-test="username"]')
    },
    getPassword(){
        return cy.get('[data-test="password"]')
    },
    getError(){
        return cy.get('[data-test="error"]')
    },
    noErrors(){
        cy.log('**there are no errors**')
        loginPage.getError().should('not.exist')
        loginPage.getUsername().should('not.have.class', 'error')
        loginPage.getPassword().should('not.have.class', 'error')
    }
}