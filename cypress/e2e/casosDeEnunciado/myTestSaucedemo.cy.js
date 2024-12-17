describe('Compra en SauceDemo con user 1', () => {
    beforeEach(() => {
        // Navegar a la URL antes de cada prueba
        cy.visit('https://www.saucedemo.com/');
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('401') && err.message.includes('backtrace.io')) {
                // Retornar false evita que el error detenga las pruebas
                return false;
            }
        });
    });

    it('Compra con el usuario "standard_user"', () => {
        // Login
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();

        // Validar redirección a inventory.html
        cy.url().should('include', 'inventory.html');

        // Agregar productos al carrito
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
        // Validar contador del carrito
        cy.get('.shopping_cart_badge').should('have.text', '2');

        // Ir al carrito
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', 'cart.html');

        // Checkout
        cy.get('#checkout').click();
        cy.url().should('include', 'checkout-step-one.html');

        // Completar datos del formulario
        cy.get('.firstName').type('Tester');
        cy.get('.lastName').type('QA');
        cy.get('.postalCode').type('12345');
        cy.get('.continue').click();

        // Validar redirección a checkout-step-two.html
        cy.url().should('include', 'checkout-step-two.html');

        // Completar la compra
        cy.get('#finish').click();

        // Validar mensaje de confirmación
        cy.url().should('include', 'checkout-complete.html');
        cy.get('.complete-header').should('have.text', 'Thank you for your order!');
        cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');

        // Volver a la página principal
        cy.get('#back-to-products').click();
        cy.url().should('include', 'inventory.html');

        // Logout
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
        cy.url().should('include', 'saucedemo.com');
    });
});
