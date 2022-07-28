const mongoose = require('mongoose');
const path = require('path');
const Cabin = require('../models/cabin');

const { places, descriptors } = require("./seedHelpers");
const images = require("./seedImages");
const cities = require("./canadacities");

mongoose.connect('mongodb://localhost:27017/cabin-searcher');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Cabin.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const randNum = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 20 + 10)
        const newCabin = new Cabin({
            location: `${cities[randNum].city}, ${cities[randNum].province_name}`,
            title: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
            image: await images.seedImg(),
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!",
            price: price
        })
        await newCabin.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})