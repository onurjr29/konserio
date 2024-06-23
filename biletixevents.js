const { name } = require('ejs');
const { MongoOIDCError, deserialize } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const puppeteer = require('puppeteer');


try{
    const db = mongoose.connect('mongodb://127.0.0.1:27017/mydb');
    console.log('MongoDB bağlantısı başarılı');
}catch(error){
    console.error('Error connecting to MongoDB:', error);
}

const partiSchema = new Schema({
    region: String,
    vote: Number,
    citycount: String,
    status: String,
    link_url: String,
    image_url: String,
    liveevent: Boolean,
    venue: String,
    svenue: String,
    a_spell: [String],
    type: String,
    city: String,
    id: String,
    pdfinfo: String,
    venuecount: String,
    category: String,
    start: Date,
    description: String,
    subcategory: String,
    detail: [String],
    event: [String],
    EventSuggestion: String,
    name: String,
    sname: String,
    name_ws: String,
    venuecode: String,
    national: Boolean,
    end: Date,
    promoter: [String],
    _version_: Number,
    eventcount: Number,
    city_id: String,
    timestamp: Date,
    artist: [String],
    parent: String,
    group: String
});

const api = async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        const url = 'https://www.biletix.com/solr/tr/select/?start=0&rows=4000&q=*:*&fq=start%3A%5B2024-05-26T00:00:00Z%20TO%202026-05-27T00%3A00%3A00Z%2B1DAY%5D&sort=score%20desc,start%20asc&&wt=json&indent=true&facet=true&facet.field=category&facet.field=venuecode&facet.field=region&facet.field=subcategory&facet.mincount=1&json.wrf=jQuery111309886616012972471_1716737102852&_=1716737102853';

        await page.goto(url, { waitUntil: 'networkidle2' });

        const content = await page.content();

        // JSONP callback formatındaki veriyi yakalamak için regex kullan
        const jsonpCallbackRegex = /jQuery\d+_\d+\(([\s\S]+)\)/;
        const match = content.match(jsonpCallbackRegex);

        if (match && match[1]) {
            const jsonData = JSON.parse(match[1]); // 
            const events = jsonData.response.docs; // Etkinliklerin olduğu kısmı al
            await browser.close();
            
            const Event = mongoose.model('Event', partiSchema);
            
            events.forEach(event => {
                const eventInstance = new Event(event);
                eventInstance.save()
                .then(() => {
                    console.log('Etkinlik kaydedildi');
                }).catch((error) => {
                    console.error('Etkinlik kaydedilirken bir hata oluştu:', error);
                });
            });

            // JSON verisini kontrol etmek için konsola yaz
            console.log("tum etkinlikleri kaydedildi");

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

api()