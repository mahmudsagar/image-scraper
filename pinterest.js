import puppeteer from "puppeteer";

let penterest = async (term) => {
    const browser = await puppeteer.launch({ headless: false, timeout: 0 })
    const page = await browser.newPage()
    await page.goto("https://www.pinterest.com/", { timeout: 0 })
    await page.waitForSelector('button.RCK');
    await page.click('button.RCK');
    await page.waitForSelector('#email');
    await page.type('#email', 'mahmudulhasansagarxs@gmail.com')
    await page.type('#password', 'X.!JVkeMim5X2sR')
    await page.click('.SignupButton')
    await page.waitForNavigation()
    const context = browser.defaultBrowserContext();
    //URL An array of permissions
    context.overridePermissions("https://www.pinterest.com/", ["geolocation", "notifications"]);
    await page.waitForSelector('#HeaderContent #searchBoxContainer');
    await page.type('#searchBoxContainer input', term);
    await page.waitForSelector('#SuggestionsMenu');
    await page.keyboard.press('Enter')
    // await page.waitForNavigation();
    await page.waitForSelector('.mainContainer .gridCentered')
    await page.evaluate(() => {
        window.scrollBy(0, 700);
    });
    const options = await page.$$eval('.mainContainer .gridCentered a', as => as.map(a => a.href));
    const images = await page.$$eval('img', as => as.map(a => a.src));
    console.log(images.length, images);
    for (let item of options) {
        // console.log(item);
        const page2 = await browser.newPage()
        await page2.goto(item)
        await page2.evaluate(() => {
            window.scrollBy(0, 700);
        });
        const images = await page.$$eval('img', as => as.map(a => a.src));
        console.log(images.length, images);
        const secondLevel = await page.$$eval('.vbI a', as => as.map(a => a.href));
        for (let item of secondLevel) {
            const page3 = await browser.newPage()
            await page3.goto(item)
            await page3.evaluate(() => {
                window.scrollBy(0, 700);
            });
            const images = await page.$$eval('img', as => as.map(a => a.src));
            console.log(images.length, images);
            await page3.close()
        }
        await page2.close
    }
    page.close()
    browser.close()
}


let terms = ['women in burqa']

terms.forEach(item=>{
    penterest(item)
})