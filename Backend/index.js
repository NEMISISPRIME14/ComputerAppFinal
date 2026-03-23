const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const usersRouter = require('./api/users');
const mechanicRouter = require('./api/mechanics');
const servicesRouter = require('./api/services');
const usersCarsRouter = require('./api/userscars');
const messagesRouter = require('./api/messages');
const faqRouter = require('./api/faq');
const appointmentsRouter = require('./api/appointments');
const adminRouter = require('./api/admin');
const propertyRouter = require('./api/property');

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', usersRouter);
app.use('/mechanics', mechanicRouter);
app.use('/services', servicesRouter);
app.use('/userscars', usersCarsRouter);
app.use('/messages', messagesRouter);
app.use('/faq', faqRouter);
app.use('/appointments', appointmentsRouter);
app.use('/admin', adminRouter);
app.use('/property', propertyRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});