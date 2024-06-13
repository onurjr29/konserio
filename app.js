const express = require('express');
const axios = require('axios');
const path = require('path');
const https = require('https')
const fs = require('fs');
const puppeteer = require('puppeteer');


const app = express();
const port = 3456;

// EJS'yi view engine olarak ayarlayın
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ana route
app.get('/bubilet', async (req, res) => {
    try {
        const response = await axios.get('https://apiv2.bubilet.com.tr/api/etkinlik/');
        const etkinlikler = response.data;
        res.render('index', { etkinlikler });
    } catch (error) {
        console.error(error);
        res.status(500).send('Bir hata oluştu.');
    }
});

// Ana route
app.get('/biletix', async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
    
        const url = 'https://www.biletix.com/solr/tr/select/?start=0&rows=5&q=*:*&fq=start%3A%5B2024-05-26T00:00:00Z%20TO%202026-05-27T00%3A00%3A00Z%2B1DAY%5D&sort=score%20desc,start%20asc&&wt=json&indent=true&facet=true&facet.field=category&facet.field=venuecode&facet.field=region&facet.field=subcategory&facet.mincount=1&json.wrf=jQuery111309886616012972471_1716737102852&_=1716737102853';
        
        // Sayfaya git
        await page.goto(url, { waitUntil: 'networkidle2' }); // Sayfa yüklenene kadar bekle
    
        // Sayfa içeriğini al
        const content = await page.content();
        // console.log(content); // Tüm jQuery nesnesini aldım
        
        // JSONP çağrısını bulmak için regex kullan
        const jsonpCallbackRegex = /"docs":\s*\[\s*({[\s\S]*?})\s*\]/
 
        const match = content.match(jsonpCallbackRegex); // JSONP yanıtını al
        // console.log(`13131313131313131313: ${match}`); 
        match[0] = match[0].slice(0, -1)
        if (match && match[0]) {
            const jsonData = JSON.parse(match[0]);
            console.log(jsonData);
            await browser.close()
            res.json(jsonData); // JSON yanıtını HTTP yanıtı olarak gönder
        } else {
            await browser.close()
            throw new Error('JSON verisi bulunamadı');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Bir hata oluştu');
    }
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
