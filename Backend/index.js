const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const usersRouter=require('./api/users');
const mechanicRouter=require('./api/mechanics');
const servicesRouter=require('./api/services');
const usersCarsRouter=require('./api/userscars');
const messagesRouter=require('./api/messages');
const faqRouter=require('./api/faq');
const appointmentsRouter=require('./api/appointments');
const adminRouter=require('./api/admin');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/users',usersRouter);
app.use('/mechanics',mechanicRouter);
app.use('/services',servicesRouter);
app.use('/userscars',usersCarsRouter);
app.use('/messages',messagesRouter);
app.use('/faq',faqRouter);
app.use('/appointments',appointmentsRouter);
app.use('/admin',adminRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})





app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})