const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express-mongo', {
    serverSelectionTimeoutMS: 5000,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);


const newUser = new User({
    name: 'John Doe',
    email: 'johndo@example.com',
    age: 30
})

const saveUser = async () => {
    try {
        await newUser.save();
        console.log('User saved');
    } catch (error) {
        console.error(error);
    }
}

saveUser()