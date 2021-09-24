const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3005;

app.use(bodyParser.json());

app.post('/makeDrink', (req, res) => {
  // Request is sent in as an object with one key of pins.
  // An array of ingredients needed for the selected cocktail
  // are listed within 'pins'
  const foundPins = req.body.pins;

  // set timeframe to zero
  // eventually to be replaced with 
  // longest time to pour mixer
  // the longest amount = max amount of time 
  // to pour drink and make cocktail
  let timeframe = 0;

  const pourTime = (mL) => (mL / 50) * 1000;

  // This will eventually stop the GPIO pin from running
  // For now, this is simulated in the console
  const turnOffChannel = (pin) => {
    // new Gpio(pin, 'out').unexport();
    console.log('Turning Off: ', pin);
  }

  for (let i = 0; i < foundPins.length; i++) {
    // new Gpio(foundPins[i].ingredientName, 'out');
    timeframe = Math.max(timeframe, pourTime(foundPins[i].amountInmL));
    console.log('Fire: ', foundPins[i].ingredientName, pourTime(foundPins[i].amountInmL));
    setTimeout(() => turnOffChannel(foundPins[i].ingredientName), pourTime(foundPins[i].amountInmL));
  }
  // Possibly have this send timeframe immediately,
  // so front-end can do something while waiting
  // setTimeout(() => res.send('Your drink is ready!'), timeframe + 100);
  // res.status(200).send('Your drink is ready!');
  res.status(200).send({ timeframe });

}, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    res.send(response.statusCode);
  } else {
    console.error('That ain\'t right...', error);
  }
});

app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => console.log(`Listening on port ${port}!`));