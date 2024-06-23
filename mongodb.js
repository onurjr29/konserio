const { name } = require('ejs');
const { MongoOIDCError, deserialize } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

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

const sampleData = {
    region: 'IZMIR',
    vote: 0,
    citycount: '1',
    status: 's01_onsale',
    link_url: '',
    image_url: '3BTAA914.png',
    liveevent: false,
    venue: 'DoubleTree by Hilton',
    svenue: 'DoubleTree by Hilton',
    a_spell: ['DoubleTree by Hilton', 'Bayram Festivali', 'CPBTS'],
    type: 'event',
    city: 'Muğla',
    id: '3BTAA',
    pdfinfo: '',
    venuecount: '1',
    category: 'FAMILY',
    start: new Date('2024-06-15T06:00:00Z'),
    description: "DoubleTree by Hilton Bodrum Işıl Club All Inclusive Resort'ta 15-23 Haziran tarihleri arasında gerçekleşecek Bayram Festivaline tüm çocukları ve ailelerini davet ediyoruz. Birbirinden renkli etkinliklerle dolu festivalimizde, saat 09.00'dan 19.00'a kadar otelimizi günlük olarak kullanabilir ve birçok aktiviteye katılabilirsiniz. Keyifli ve unutulmaz bir bayram geçirmek için sizi bekliyoruz! 09.00-11.00 Kahvaltı (Panorama Restoran) 12.30-14.00 Öğle Yemeği (Panorama Restoran) 13.00-17.00 Elixir Bites Yemek Servisi 12.00-18.00 Dondurma ve Pastane 10.00-19.00 Café 10.00-18.30 Elixir Bar",
    subcategory: 'attractioncenter$FAMILY',
    detail: ['Bayram Festivali'],
    event: ['Bayram Festivali'],
    EventSuggestion: 'Bayram Festivali',
    name: 'Bayram Festivali',
    sname: 'Bayram Festivali',
    name_ws: 'Bayram Festivali',
    venuecode: 'OE',
    national: false,
    end: new Date('2024-06-23T06:00:00Z'),
    promoter: ['CPBTS'],
    _version_: 1801913307802632200,
    eventcount: 0,
    city_id: '',
    timestamp: new Date('2024-06-15T08:00:42.042Z'),
    artist: [''],
    parent: '',
    group: ''
};

const EventSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
})

const Event = mongoose.model('Event', partiSchema);

const jsonData = {
    name: 'onur er',
    price: 100,
    description: 'deneme',
    category: 'music',
}

const eventInstance = new Event(sampleData);
eventInstance.save().then((result) => {
    console.log("Basariyla kaydedildi." + result);
}).catch((error) => {
    console.error("Hataa vaaaar kaciiin" + error);
})



