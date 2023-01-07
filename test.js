import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto("https://www.pinterest.com/")
    await page.waitForSelector('button.RCK');
    await page.click('button.RCK');
    await page.waitForSelector('#email');
    await page.type('#email', 'mahmudulhasansagarxs@gmail.com')
    await page.type('#password', 'mahmud')
    await page.click('.SignupButton')
    await page.waitForSelector('#searchBoxContainer');
    await page.type('#searchBoxContainer input', 'women in burqa');
    await page.waitForSelector('#SuggestionsMenu');
    await page.keyboard.press('Enter')
})()