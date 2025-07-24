require('dotenv').config();
require('./config/mongoose')

const PORT = process.env.PORT;

const express = require('express')
const app = express();
const path = require('path');
const Contact = require('./models/contacts');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './assets')))

// var contactList = [
//     {
//         name: 'arpan',
//         phone: '2080231996'
//     },
//     {
//         name: 'viraj',
//         phone: '2082331231'
//     },
//     {
//         name: 'deven',
//         phone: '2080212431'
//     },
//     {
//         name: 'roy',
//         phone: '1231231996'
//     },
//     {
//         name: 'ananya',
//         phone: '5423764322'
//     }
// ];

app.get('/', async (_req, res) => {
    const contactList = await Contact.find({});
    return res.render('index', { title: 'index', contact_list: contactList })
})

app.get('/delete-contact', async (req, res) => {
    const phone = req.query.id;
    // const contactIndex = contactList.findIndex(contact => contact.phone == phone)
    // contactList.splice(contactIndex, 1)
    await Contact.findOneAndDelete({ phone });
    return res.redirect(req.get('referer'));
})

app.post('/create-contact', async (req, res) => {
    const { name, phone } = req.body;
    // contactList.push({ name, phone });
    await Contact.create({ name, phone });
    return res.redirect(req.get('referer'))
})

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server started listing on PORT :: ${PORT}`)
})