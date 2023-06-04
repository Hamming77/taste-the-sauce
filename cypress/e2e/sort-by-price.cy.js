// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

/**
 * Sorts items by price
 * @param {'lohi'|'hilo'} sortCriteria 
 */
function sortByPrice(sortCriteria){
  expect(sortCriteria, 'sort order to be a valid value').to.be.oneOf(['lohi', 'hilo'])
  cy.log(`**sort by price order ${sortCriteria}**`)
  cy.get('[data-test="product_sort_container"]').select(sortCriteria)  
}

function getPrices(){
  return cy
    .get('.inventory_item_price')
    .map('innerText')
    .mapInvoke('slice', 1)
    .map(Number)
    .print('sorted prices %o')
}

beforeEach(() => {
  cy.log('**log in**')
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
})

describe('sorting', () => {
  it('by price lowest to highest', () => {
    // sort the items from low to high
    sortByPrice('lohi')
    // confirm the item prices are sorted in ascending order
    getPrices().should('be.ascending')
    
  })

  it('by price highest to lowest', () => {
    // sort the items from high to low price
    sortByPrice('hilo')
    // confirm the item prices are sorted in ascending order
    getPrices().should('be.descending')
  })
})
