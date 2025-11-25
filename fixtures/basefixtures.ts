import {test as base ,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

 

type MyFixtures = {

    homePage : HomePage;

};

export const test = base.extend<MyFixtures>({

homePage : async({page,baseURL},use,testInfo)=>{

    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage(baseURL);

    let uesrname=testInfo.project.metadata.appUsername;
    let password= testInfo.project.metadata.appPassword;


    const  homePage = await loginPage.doLogin(uesrname,password);

    expect(await homePage.isUserLoggedIn()).toBeTruthy();


    await use(homePage);
}

});

export { expect };