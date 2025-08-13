import { fa, faker } from '@faker-js/faker';

export function generateFakeSignupData() {
    const titles = ['Mr.', 'Mrs.'];
    const countries = ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return {
        Title: faker.helpers.arrayElement(titles),
        Name: faker.internet.userName(),
        Email: faker.internet.email(),
        Password: faker.internet.password({ length: 10 }),
        DateOfBirth: {
            Day: faker.number.int({ min: 1, max: 31 }).toString(),
            Month: faker.helpers.arrayElement(months),
            Year: faker.number.int({ min: 1900, max: 2021 }).toString()
        },
        Newsletter: faker.datatype.boolean(),
        Offers: faker.datatype.boolean(),
        AddressInfo: {
            FirstName: faker.person.firstName(),
            LastName: faker.person.lastName(),
            Company: faker.company.name(),
            Address1: faker.location.streetAddress(),
            Address2: `Apt ${faker.number.int({ min: 100, max: 999 })}`,
            Country: faker.helpers.arrayElement(countries),
            State: faker.location.state(),
            City: faker.location.city(),
            Zipcode: faker.location.zipCode(),
            MobileNumber: faker.phone.number('+63##########')
        },
        CardNumber : faker.finance.creditCardNumber(),
        CVC : faker.finance.creditCardCVV(),
        ExpiryMonth : faker.date.future().getMonth() + 1,
        ExpiryYear : faker.date.future().getFullYear()

    };
}
