export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileHeader.EditButton').click();
    cy.getByTestId('ProfileCard.Firstname').clear().type(firstname);
    cy.getByTestId('ProfileCard.Lastname').clear().type(lastname);
    cy.getByTestId('EditableProfileHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
    cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: 'asdasd' },
        body: {
            id: '4',
            first: 'ulbi tv 3',
            lastname: 'asf',
            age: 465,
            currency: 'EUR',
            country: 'Ukraine',
            city: 'Moscow',
            username: 'ulbi tv',
            avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>
        }
    }
}
