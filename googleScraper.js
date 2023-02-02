import puppeteer from "puppeteer";
import fetch from "node-fetch";

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

const googleScrape = async (term) => {
    const browser = await puppeteer.launch({ headless: false, timeout: 0, defaultViewport: null })
    const page = await browser.newPage()
    // const device_width = 1920;
    // const device_height = 1080;
    // await page.setViewport({ width: device_width, height: device_height })
    await page.goto("https://images.google.com/", { timeout: 0, })
    await page.waitForSelector('input', { timeout: 0 });
    await page.type('input', term)
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
    // await page.waitForSelector('.MSM1fd');
    await page.waitForSelector('.bRMDJf img');
    await autoScroll(page);

    const options = await page.$$eval('.bRMDJf img', as => as.map(a => a.src));

    // const element = await page.$$eval('.MSM1fd', as => as.map(a => a.src));
    console.log('main',options.length);
    // fetch('http://localhost:8000/images/get-image-list', {
    //     method: "POST",
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ images: options })
    // })
    // for (const el of await page.$$('a.islib')) {
    //     // console.log(el);
    //     await el.click()
    //     await page.waitForSelector('.pZqGvd img');
    //     const oneLevel = await page.$$eval('.pZqGvd .rg_i.Q4LuWd', as => as.map(a => a.src));
    //     // fetch('http://localhost:8000/images/get-image-list', {
    //     //     method: "POST",
    //     //     headers: {
    //     //         'Accept': 'application/json',
    //     //         'Content-Type': 'application/json'
    //     //     },
    //     //     body: JSON.stringify({ images: onelevel })
    //     // })
    //     console.log('one level',oneLevel.length)
    // }
    // await page.close()
    // await browser.close()
}

export default googleScrape