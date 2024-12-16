describe('Compra en SauceDemo con user 1', () => {
  beforeEach(() => {
      // Navegar a la URL antes de cada prueba
      cy.visit('https://www.saucedemo.com/');
  });

  it('Compra con el usuario "standard_user"', () => {
      // Login
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();

      // Validar redirección a inventory.html
      cy.url().should('include', 'inventory.html');

      // Agregar productos al carrito
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
 /*
      // Validar contador del carrito
      cy.get('.shopping_cart_badge').should('have.text', '2');

      // Ir al carrito
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', 'cart.html');

      // Checkout
      cy.get('[data-test="checkout"]').click();
      cy.url().should('include', 'checkout-step-one.html');

      // Completar datos del formulario
      cy.get('[data-test="firstName"]').type('Tester');
      cy.get('[data-test="lastName"]').type('QA');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();

      // Validar redirección a checkout-step-two.html
      cy.url().should('include', 'checkout-step-two.html');

      // Completar la compra
      cy.get('[data-test="finish"]').click();

      // Validar mensaje de confirmación
      cy.url().should('include', 'checkout-complete.html');
      cy.get('.complete-header').should('have.text', 'Thank you for your order!');
      cy.get('.complete-text').should('include.text', 'Your order has been dispatched');

      // Volver a la página principal
      cy.get('[data-test="back-to-products"]').click();
      cy.url().should('include', 'inventory.html');

      // Logout
      cy.get('[data-test="react-burger-menu-btn"]').click();
      cy.get('[data-test="logout_sidebar_link"]').click();
      cy.url().should('include', 'saucedemo.com');
*/
      });
});
