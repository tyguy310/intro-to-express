var groceries = require('./groceries')

var express = require('express');
var app = express();
var veggieArray = groceries.vegetables;

app.listen(3000, () => {console.log('Starting a server on http://localhost:3000')});

app.get('/vegetables/:id', (req, res, next) => {
  veggieArray = groceries.vegetables;
  const index = req.params.id;
  const veggie = groceries.vegetables[req.params.id] || 'No veggie found'
  res.send(veggie)
    res.status(418).send(veggieArray[index])
});

app.get('/vegetables', (req, res, next) => {
  const search = req.query.search;
  const foundVeggie = groceries.vegetables.filter(filterer);

  if (search === undefined) {
    res.send(veggieArray)
  }

  function filterer (element) {
    if (element.toLowerCase().indexOf(search.toLowerCase()) > -1){
      return element;
    }
  }

  if (foundVeggie.length === 0) {
    res.send('No veggies found');
  }
  else {
    res.send(foundVeggie)
  }
})

app.post('/vegetables', (req, res, next) => {
  const body = [];

  req.on('data', function (chunk) {
    body.push(chunk.toString());
  }).on('end', function () {
    const data = JSON.parse(body.join(''));
    if (veggieArray.indexOf(data.name) > -1) {
      res.send('Veggie alread home')
    }
    else {
      veggieArray.push(data.name)
      res.status(201).send(veggieArray);
    }
  });
})
