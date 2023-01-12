import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ headless: false, timeout:0 })
    const page = await browser.newPage()
    await page.goto("https://www.pinterest.com/")
    await page.waitForSelector('button.RCK');
    await page.click('button.RCK');
    await page.waitForSelector('#email');
    await page.type('#email', 'mahmudulhasansagarxs@gmail.com')
    await page.type('#password', 'mahmud')
    await page.click('.SignupButton')
    const context = browser.defaultBrowserContext();
    //        URL                  An array of permissions
    context.overridePermissions("https://www.pinterest.com/", ["geolocation", "notifications"]);
    page.on("load", async()=>{
        await page.waitForSelector('#HeaderContent #searchBoxContainer');
        // await page.waitForNavigation();
        await page.type('#searchBoxContainer input', 'women in burqa');
        await page.waitForSelector('#SuggestionsMenu');
        await page.keyboard.press('Enter')
    })
    await page.waitForSelector('.mainContainer .gridCentered')
    const options = await page.$$eval('.mainContainer .gridCentered a', as => as.map(a => a.href));
    for (let item of options) {
        // console.log(item);
        const page2 = await browser.newPage()
        await page2.goto(item)
        await page2.waitForSelector('#gradient [data-test-id="visual-content-container"] img')
        // const example = await page2.$('[data-test-id="visual-content-container"]');
        // await page.click('[data-test-id="visual-content-container"] img', {button: 'right'})

        // console.log(example);
        // page2.close()
    }
})()