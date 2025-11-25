
import { ResultsPage } from '../pages/ResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';

import {test,expect} from '../fixtures/basefixtures';

let search = [
    {
        searchkey: 'macbook',
        productname: 'MacBook Pro',
        imagecount: 4,
        headerText: 'MacBook Pro',
        Brand:'Apple',
        ProductCode:'Product 18',
        RewardPoints:'800',
        Availability:'Out Of Stock',
        priceText : '$2,000.00',
        extaxpriceText:'$2,000.00',

    },
    {
        searchkey: 'macbook', 
        productname: 'MacBook Air',
        imagecount: 4,
        headerText:'MacBook Air' ,
        Brand:'Apple',
        ProductCode:'Product 17',
        RewardPoints:'700',
        Availability:'Out Of Stock',
        priceText : '$1,202.00',
        extaxpriceText:'$1,000.00',
    },
    {
        searchkey: 'samsung', 
        productname: 'Samsung Galaxy Tab 10.1', 
        imagecount: 7,
        headerText:'Samsung Galaxy Tab 10.1' ,
        Brand:null,
        ProductCode:'SAM1',
        RewardPoints:'1000',
        Availability:'Pre-Order',
        priceText : '$241.99',
        extaxpriceText:'$199.99'
    },
];

for (let product of search) {

    test(`verify product Header ${product.productname}`, async ({ homePage }) => {

        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
        
        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
            
        expect(await productInfoPage.getProductHeader()).toBe(product.productname);

    });
    
};


for (let product of search) {
    test(`verify product Images ${product.productname} : ${product.imagecount}`, async ({ homePage }) => {

        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
        
        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
            
        expect(await productInfoPage.getProductImagesCount()).toBe(product.imagecount);

    });
    
};


for(let product of search){
    // if(product.productname !== 'MacBook Pro')continue;
    test(`verify product MetaData ${product.productname} : ${product.imagecount}`, async ({ homePage }) => {


        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
        
        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
        
        let actualProductFullDetails = await productInfoPage.getProductDetails();

             
        expect.soft(actualProductFullDetails.get('header')).toBe(product.headerText);
        expect.soft(actualProductFullDetails.get('Brand')?? '').toBe(product.Brand ??'');
        expect.soft(actualProductFullDetails.get('Product Code')).toBe(product.ProductCode);
        expect.soft(actualProductFullDetails.get('Reward Points')).toBe(product.RewardPoints);
        expect.soft(actualProductFullDetails.get('Availability')).toBe(product.Availability);
    });


}
 

for(let product of search){
   // if(product.productname !== 'MacBook Pro') continue;
     test(`verify product Pricing ${product.productname} : ${product.imagecount}`, async ({ homePage }) => {


        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
        
        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
        
        let actualProductFullDetails = await productInfoPage.getProductDetails();
     
        expect.soft(actualProductFullDetails.get('header')).toBe(product.headerText);
        expect.soft(actualProductFullDetails.get('price')).toBe(product.priceText);
        expect.soft(actualProductFullDetails.get('extaxprice')).toBe(product.extaxpriceText);

    });
    
}
   