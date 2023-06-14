export const InventoryPage = {
    getCartBadge() {
        return cy.get('.shopping_cart_link').find('.shopping_cart_badge')
    },

    /**
     * Adds an item to the shopping cart
     * @param {string} name 
     */
    addItemToCart(name) {
        cy.contains('.inventory_item', name)
            .contains('button', 'Add to cart')
            .click()
    }
}