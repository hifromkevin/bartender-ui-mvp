import 'babel-polyfill';
import React from 'react';

const CocktailName = (props) => {
  const {
    cocktailName,
    listOfIngredients,
    makeDrinkAPI
  } = props;

  return (
    <p onClick={
      () => makeDrinkAPI(listOfIngredients)
    }>{cocktailName}{console.log('himom!', listOfIngredients)}</p>
  );
};

export default CocktailName;