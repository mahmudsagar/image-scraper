import puppeteer from "puppeteer";

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

(async () => {
    const browser = await puppeteer.launch({ headless: false, timeout: 0, defaultViewport: null })
    const page = await browser.newPage()
    // const device_width = 1920;
    // const device_height = 1080;
    // await page.setViewport({ width: device_width, height: device_height })
    await page.goto("https://images.google.com/", { timeout: 0,  })
    await page.waitForSelector('input', { timeout: 0 });
    await page.type('input', 'women in burqa')
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
    // await page.waitForSelector('.MSM1fd');
    await page.waitForSelector('.bRMDJf img');
    // await autoScroll(page);
    
    const options = await page.$$eval('.bRMDJf img', as => as.map(a => a.src));
    
    // const element = await page.$$eval('.MSM1fd', as => as.map(a => a.src));
    
    
    for (const el of await page.$$('a.islib')) {
        // console.log(el);
        await el.click()
        await page.waitForSelector('.bRMDJf img');
        const oneLevel = await page.$$eval('.islir img', as => as.map(a => a.src));
        console.log(oneLevel);
    }
    await page.close()
    await browser.close()
})()

