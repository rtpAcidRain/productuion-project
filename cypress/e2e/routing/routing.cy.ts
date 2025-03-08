import { getItemByTestId } from '../../helpers/getItemByTestId';

describe('Routing', () => {
    describe('User unauthorised', () => {
        it('Visit main page', () => {
            cy.visit('/');
            cy.get(getItemByTestId('MainPage')).should('exist');
        });
        it('Visit progile page', () => {
            cy.visit('/profile/1');
            cy.get(getItemByTestId('MainPage')).should('exist');
        });
        it('Route not exist', () => {
            cy.visit('/asdasd');
            cy.get(getItemByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('User authorised', () => {
        beforeEach(() => {
            cy.login('admin', '123');
        });
        it('Visit progile page', () => {
            cy.visit('/profile/1');
            cy.get(getItemByTestId('ProfilePage')).should('exist');
        });

        it('Visit articles page', () => {
            cy.visit('/articles');
            cy.get(getItemByTestId('ArticlesPage')).should('exist');
        });
    });
});
