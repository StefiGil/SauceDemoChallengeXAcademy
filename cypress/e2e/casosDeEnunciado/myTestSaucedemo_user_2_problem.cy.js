describe('Compra en SauceDemo con user 2', () => {
    beforeEach(() => {
        // Navegar a la URL antes de cada prueba
        cy.visit('https://www.saucedemo.com/');
    });

    it('Compra con el usuario "problem_user"', () => {
        cy.get('#user-name').type('problem_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();

        // Validar redirección a inventory.html
        cy.url().should('include', 'inventory.html');

        // Mapear productos con sus imágenes esperadas
        const productosEsperados = [
            {id: 'sauce-labs-backpack', src: '/static/media/sauce-backpack-1200x1500.34e7aa42.jpg'},
            {id: 'sauce-labs-bike-light', src: '/static/media/bike-light-1200x1500.a0c9caae.jpg'},
            {id: 'sauce-labs-bolt-t-shirt', src: '/static/media/bolt-shirt-1200x1500.c0dae290.jpg'},
            {id: 'sauce-labs-fleece-jacket', src: '/static/media/sauce-pullover-1200x1500.439fc934.jpg'},
            {id: 'sauce-labs-onesie', src: '/static/media/red-onesie-1200x1500.2ec615b2.jpg'},
            {id: 'test.allthethings()-t-shirt-(red)', src: '/static/media/red-tatt-1200x1500.30dae693.jpg'},
        ];

        // Iterar y verificar cada imagen
        productosEsperados.forEach(producto => {
            cy.get(`[data-test="add-to-cart-${producto.id}"]`)
                .parents('.inventory_item')
                .find('.inventory_item_img img') // Selector de imagen dentro del producto
                .should('have.attr', 'src', producto.src); // Validar que la imagen tenga el src esperado
        });

        //Validar el funcionamiento del filtro de productos
        // Intentar aplicar el filtro "Price (low to high)"
        cy.get('.product_sort_container').select('lohi');
        cy.wait(1000); // Breve espera para que la interfaz actualice el orden

        // Extraer los precios y validar que NO están ordenados
        let precios = [];
        cy.get('.inventory_item_price')
            .each(($el) => {
                precios.push(parseFloat($el.text().replace('$', '')));
            })
            .then(() => {
                const ordenado = [...precios].sort((a, b) => a - b); // Ordenar los precios manualmente
                expect(precios).to.not.deep.equal(ordenado); // Validar que no coincidan
            });

         // Agregar productos al carrito
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
        // Validar contador del carrito
        cy.get('.shopping_cart_badge').should('have.text', '2');

        // Eliminar productos al carrito
        cy.get('#remove-to-cart-sauce-labs-backpack').click();

        // Validar contador del carrito que deberia ser 0
        cy.get('.shopping_cart_badge').should('have.text', '1');


    });

});
