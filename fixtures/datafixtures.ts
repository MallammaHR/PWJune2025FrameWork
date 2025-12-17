import { expect, test as base } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

export type RegData = {
    firstName: string;
    lastName: string;
    telephone: string;
    password: string;
    subscribeNewsletter: string;
};

type csvFixture = {
    regData: RegData[];
};

export const test = base.extend<csvFixture>({
    regData: async ({}, use) => {
        const fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
        const registrationData: RegData[] = parse(fileContent, {
            columns: true,
            skip_empty_lines: true
        });
        await use(registrationData);
    }
});

export { expect };
