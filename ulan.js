const puppeteer = require('puppeteer');

// let text = 'Hello world\nhello universe'

let patternG = /hello/g
// console.log(text.match(patternG));

let patternI = /hello/i
// console.log(text.match(patternI));

let patternM = /^hello/m;
// console.log(text.match(patternM));

// let pattern = /hello/

// let match = pattern.exec(text)

// if(match){
//     console.log('eslesme var');
//     console.log(match);
// }else{
//     console.log('eslesme yok');
// }

// let text = "Name: John Doe";
// let pattern = /Name: (\w+) (\w+)/;

// let match = pattern.exec(text);

// if (match) {
//     console.log(`Ad: ${match[1]}`);
//     console.log(`Soyad: ${match[2]}`);
// }

const api = async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        const url = 'https://www.biletix.com/solr/tr/select/?start=0&rows=5&q=*:*&fq=start%3A%5B2024-05-26T00:00:00Z%20TO%202026-05-27T00%3A00%3A00Z%2B1DAY%5D&sort=score%20desc,start%20asc&&wt=json&indent=true&facet=true&facet.field=category&facet.field=venuecode&facet.field=region&facet.field=subcategory&facet.mincount=1&json.wrf=jQuery111309886616012972471_1716737102852&_=1716737102853';

        await page.goto(url, { waitUntil: 'networkidle2' });

        const content = await page.content();

        // JSONP callback formatındaki veriyi yakalamak için regex kullan
        const jsonpCallbackRegex = /jQuery\d+_\d+\(([\s\S]+)\)/;
        const match = content.match(jsonpCallbackRegex);

        if (match && match[1]) {
            const jsonData = JSON.parse(match[1]);
            const events = jsonData.response.docs; // Etkinliklerin olduğu kısmı al
            await browser.close();
            
            // JSON verisini kontrol etmek için konsola yaz
            console.log(events);

            // res.json(events[0]); // Etkinlik verilerini JSON formatında döndür
        } else {
            await browser.close();
            throw new Error('JSON verisi bulunamadı');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        if (res) {
            res.status(500).send('Bir hata oluştu');
        }
    }
}

api();