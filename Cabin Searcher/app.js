const mongoose = require('mongoose');
const express = require('express');
const engine = require('ejs-mate');
const methodOverride = require('method-override');

const app = express();
const path = require('path');
const Cabin = require('./models/cabin');

mongoose.connect('mongodb://localhost:27017/cabin-searcher');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/cabins', async (req, res) => {
    const cabins = await Cabin.find({});
    res.render('cabins/index', { cabins });
})

app.get('/cabins/new', async (req, res) => {
    res.render('cabins/new');
})

app.post('/cabins', async (req, res) => {
    const cabin = new Cabin(req.body.cabin);
    await cabin.save();
    res.redirect(`/cabins/${cabin._id}`);
})

app.get('/cabins/:id', async (req, res) => {
    const cabin = await Cabin.findById(req.params.id);
    res.render('cabins/show', { cabin });
})

app.get('/cabins/:id/edit', async (req, res) => {
    const cabin = await Cabin.findById(req.params.id);
    res.render('cabins/edit', { cabin });
})

app.put('/cabins/:id/', async (req, res) => {
    const { id } = req.params;
    const cabin = await Cabin.findByIdAndUpdate(id, { ...req.body.cabin });
    res.redirect(`/cabins/${cabin._id}`);
})

app.delete('/cabins/:id', async (req, res) => {
    const { id } = req.params;
    await Cabin.findByIdAndDelete(id);
    res.redirect(`/cabins`);
})

app.listen(3000, () => {
    console.log("Serving on port 3000");
})