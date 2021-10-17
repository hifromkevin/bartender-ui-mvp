import 'babel-polyfill';
import React from 'react';

import CommonUtils from '../../utils/CommonUtils';

const CocktailName = (props) => {
  const {
    channels,
    cocktailName,
    listOfIngredients,
    makeDrinkAPI
  } = props;

  const addGpioToApiCall = (ingredients, channels) => {
    let listWithGpio = [];

    ingredients.forEach(ingredient => {
      for (let i = 0; i < channels.length; i++) {
        if (ingredient.ingredientName === CommonUtils.camelizeWords(channels[i].selectedMixer)) {
          listWithGpio.push({ ...ingredient, gpioPin: channels[i].gpioPinNumber });
          break;
        };
      };
    });

    return listWithGpio;
  };

  return (
    <p onClick={() => makeDrinkAPI(
      addGpioToApiCall(listOfIngredients, channels)
    )}> {cocktailName} </p>
  );
};

export default CocktailName;