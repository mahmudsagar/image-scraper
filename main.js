import googleScrape from "./googleScraper.js"

let terms = ['women in burqa']

terms.forEach(async item => {
    await googleScrape(item)
})