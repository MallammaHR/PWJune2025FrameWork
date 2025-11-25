import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

//schema/type of reg data fields
type RegData = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsletter: string
}

//let registerationData: RegData[] = JSON.parse(fs.readFileSync('./data/register.json', 'utf-8'));


let fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
let registerationData:RegData[]  = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
});

for (let user of registerationData) {

    test(`verify user is able to register ${user.firstName}`, async ({ page , baseURL}) => {
        let loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        let registerPage: RegisterPage = await loginPage.navigateToRegisterPage();
        let isUserRegistered: boolean = await registerPage.registerUser(
         user.firstName,
         user.firstName,
         getRandomEmail(),
         user.password,
         user.telephone,
         user.subscribeNewsletter,
        );
        expect(isUserRegistered).toBeTruthy();
    })
}

function getRandomEmail():string{


    let randomeValue =Math.random().toString(36).substring(2,9);
    return `auto_${randomeValue}@gmail.com`;
}
