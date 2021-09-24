import "babel-polyfill";
import React from "react";

const CocktailName = (props) => {
  const {
    cocktailName
  } = props;

  return (<p>{cocktailName}</p>);
};

export default CocktailName;