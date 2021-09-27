import 'babel-polyfill';
import React, { useState, useEffect } from 'react';

const DoneButton = (props) => {
  const [
    DoneButtonState,
    setDoneButtonState
  ] = useState({ cocktailIsReady: false });


  const { doneButton, time } = props;
  const { cocktailIsReady } = DoneButtonState;

  setTimeout(() => {
    setDoneButtonState({
      cocktailIsReady: true
    })
  }, time);

  return (cocktailIsReady && (<button onClick={doneButton}>Yay!</button>));
}

export default DoneButton;


