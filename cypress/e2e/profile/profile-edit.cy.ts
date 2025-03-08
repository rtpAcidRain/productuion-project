let profileId: string;
describe('User visit profile page', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('Profile card success loading', () => {
        cy.getByTestId('ProfileCard.Firstname').should('have.value', 'ulbi tv 3');
    });
    it('User edit profile card', () => {
        const fname = 'new fname';
        const lname = 'new lname';
        cy.updateProfile(fname, lname);
        cy.getByTestId('ProfileCard.Firstname').should('have.value', fname);
        cy.getByTestId('ProfileCard.Lastname').should('have.value', lname);
    });
});
