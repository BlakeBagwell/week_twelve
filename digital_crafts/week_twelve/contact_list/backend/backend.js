const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const express = require('express');
const cors = require('cors');
const db = pgp({
  database: 'contacts'
});
const app = express();
app.use(bodyParser.json());

app.use(cors());

app.get('/api/contacts', (req, res, next) => {
  db.any('select * from contact')
    .then(contacts => res.json(contacts))
    .catch(next);
});

app.post('/api/contacts', (req, res, next) => {
  let returnedObject = req.body
  db.one('insert into contact (name, phone, email, type, favorite) values ($1, $2, $3, $4, $5) returning *', [returnedObject.name, returnedObject.phone, returnedObject.email, returnedObject.type, returnedObject.favorite])
  .then(row => res.json(row));
});

app.delete('/api/contacts/:id', (req, res, next) => {
  let chosen = req.params.id;
  db.none('delete from contact where id = ($1) returning id',[chosen])
  .then(result => {
    res.json(result);
  });
});

app.put('/api/contacts/:id', (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  data.id = id;
  db.one(`
    update contact set
      name = $[name],
      phone = $[phone],
      email = $[email],
      type = $[type],
      favorite = $[favorite]
    where
      id = $[id]
    returning *
    `, data)
    .then(row => resp.json(row))
    .catch(next);
});

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    error: err.message,
    stack: err.stack
  });
});

app.listen(3000, () => console.log('Listening on port 3000.'));
