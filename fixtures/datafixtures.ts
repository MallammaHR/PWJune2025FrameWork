import { test as base , expect } from '@playwright/test';
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




type csvFixtures = {
    regData : RegData[];
}

export const dataTest = base.extend<csvFixtures>({

   regData : async({}, use,testInfo)=>{

        let fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
        let registerationData:RegData[]  = parse(fileContent, 
        {
        columns: true,
        skip_empty_lines: true

        });
        await use(registerationData);
   }    

})

export{ expect} ;