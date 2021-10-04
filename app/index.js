// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   const name = process.env.NAME || 'World';
//   res.send(`Hello ${name}!`);
// });

// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//   console.log(`helloworld: listening on port ${port}`);
// });

const express = require('express');
const reports = require('./routers/report-router')

const app = express();

app.use(express.json());

app.use('/api/reports', reports);

const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   const name = process.env.NAME || 'World';
//   res.status(200).json({ message: 'Welcome to send get request!'});
// });


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;

// const crypto = require('crypto');
// const app = require('express')();
// const { PORT = 4000, SALT = '#ha43-1', LOG_LEVEL, NODE_ENV } = process.env;
// const algorithm = 'aes-192-cbc';
// const keylen = 24;

// const encrypt = ({ message, secret }) => {
//   const key = crypto.scryptSync(secret, SALT, keylen);
//   const iv = Buffer.alloc(16, 0);
//   const cipher = crypto.createCipheriv(algorithm, key, iv);

//   let encrypted = cipher.update(message, 'utf8', 'hex');
//   encrypted += cipher.final('hex');

//   return encrypted;
// };

// const decrypt = ({ message, secret }) => {
//   const key = crypto.scryptSync(secret, SALT, keylen);
//   const iv = Buffer.alloc(16, 0);
//   const decipher = crypto.createDecipheriv(algorithm, key, iv);

//   let decrypted = decipher.update(message, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');

//   return decrypted;
// };

// app.use(({ query: { message, secret }, path }, res, next) => {
//   console.log(`${path}: ${message}`);
//   next();
// })

// app.get('/encrypt', ({ query }, res) => {
//   res.send(encrypt(query));
// });

// app.get('/decrypt', ({ query }, res) => {
//   res.send(decrypt(query));
// });

// app.listen(PORT, () => {
//   console.log(`Listening on ${PORT}, LOG_LEVEL: ${LOG_LEVEL}, NODE_ENV: ${NODE_ENV}`);
// });