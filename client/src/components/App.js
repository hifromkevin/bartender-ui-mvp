import 'babel-polyfill';
import React, { useState, useEffect } from 'react';

import Channel from './Channel';
import CocktailName from './CocktailName';
import MixerListModal from './MixerListModal';

import CommonUtils from '../../utils/CommonUtils';

import cocktails from '../../utils/cocktails';

const App = () => {
  const [
    bartenderState,
    setBartenderState
  ] = useState({
    availableCocktails: [],
    channels: [
      {
        id: 0,
        channelName: 'Channel 1',
        gpioPinNumber: 4,
        selectedMixer: null
      },
      {
        id: 1,
        channelName: 'Channel 2',
        gpioPinNumber: 17,
        selectedMixer: null
      },
      {
        id: 2,
        channelName: 'Channel 3',
        gpioPinNumber: 27,
        selectedMixer: null
      },
      {
        id: 3,
        channelName: 'Channel 4',
        gpioPinNumber: 22,
        selectedMixer: null
      },
      {
        id: 4,
        channelName: 'Channel 5',
        gpioPinNumber: 10,
        selectedMixer: null
      },
      {
        id: 5,
        channelName: 'Channel 6',
        gpioPinNumber: 9,
        selectedMixer: null
      },
      {
        id: 6,
        channelName: 'Channel 7',
        gpioPinNumber: 11,
        selectedMixer: null
      },
      {
        id: 7,
        channelName: 'Channel 8',
        gpioPinNumber: 5,
        selectedMixer: null
      }
    ],
    selectedChannel: null,
    selectedMixers: [],
    shouldDisplayModal: false
  });

  const apiCall = async (pins) => {
    // turns array of pins (EX: ['vodka', 'cranberry']), 
    // and places it within an object with a key of 'pins'
    const getPins = { pins }

    await fetch('/makeDrink', {
      method: 'POST',
      body: JSON.stringify(getPins),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data Response: ', data)
        setBartenderState(state => ({
          ...state,
          dataResponse: data.timeframe
        }))
      })
      .catch(err => console.log('uh oh', err))
  }

  const clickChannel = idNum => {
    let {
      channels,
      selectedMixers
    } = bartenderState;

    // if this channel already has a selected mixer, remove it from the 
    // list of selectedMixers, so it can be selected again.
    // EX: Vodka is in channel 1. I click channel 1. Vodka should still be available
    if (channels[idNum].selectedMixer) {
      for (var i = 0; i < selectedMixers.length; i++) {
        if (selectedMixers[i].mixerName === CommonUtils.camelizeWords(channels[idNum].selectedMixer)) {
          selectedMixers.splice(i, 1);
          break;
        }
      }
    };

    setBartenderState(
      state => ({
        ...state,
        selectedChannel: idNum,
        selectedMixers,
        shouldDisplayModal: true
      })
    );
  };

  // adding newestMixer to combat that this call doesn't work async
  // so this is to be able to show the newly selected item
  // Sorta hacky, but works for now
  const createListOfCocktails = (newestMixer) => {
    let { availableCocktails } = bartenderState;
    const { selectedMixers } = bartenderState;
    /* 
    Selected mixers: [
      {
        mixerName: 'a',
        gpioPin: 1,
        channelNum: 1
      }
    ]
    */
    const sendTrueIfMixerIsNotIncluded = (ingredient) => {
      for (let i = 0; i < selectedMixers.length; i++) {
        if (selectedMixers[i].mixerName === ingredient) return false;
      }
      return true;
    }

    // Cycle through all of the available cocktails
    cocktails.forEach(cocktail => {
      const { cocktailName, ingredients } = cocktail;
      let allIngredientsAvailable = true;

      // Loop ingredients
      for (let i = 0; i < ingredients.length; i++) {
        const { ingredientName } = ingredients[i];

        // If an ingredient is NOT on the list of mixers, end cycle and go to the next cocktail. 
        if (sendTrueIfMixerIsNotIncluded(ingredientName) && ingredientName !== newestMixer) {
          allIngredientsAvailable = false;
          break;
        }
      }

      if (allIngredientsAvailable) availableCocktails = [...availableCocktails, cocktail];

      //If all ingredients are cycled through, and they are all on the list of available mixers, 
      // add it to a list of available cocktails that can be chosen by the user. 
      setBartenderState(
        state => ({
          ...state,
          availableCocktails
        })
      );
    });
  };

  const hideModal = () => setBartenderState(
    state => ({
      ...state,
      selectedChannel: null,
      shouldDisplayModal: false
    })
  );


  const updateChannel = (channelIdNumber, mixerName) => {
    let {
      channels,
      selectedMixers
    } = bartenderState;


    // Update list of selected mixers
    // Now we know what the mixer is called, and where to find it by channel
    // Adding channel ID number for easy channel lookup
    selectedMixers = [...selectedMixers, {
      mixerName: CommonUtils.camelizeWords(mixerName),
      gpioPinNumber: channels[channelIdNumber].gpioPinNumber,
      channelIdNumber
    }];

    // save the mixer to the channel
    channels[channelIdNumber].selectedMixer = mixerName;

    // add the updated channels and list of selectedMixers to state
    setBartenderState(
      state => ({
        ...state,
        channels,
        selectedMixers
      })
    );

    // Modal closes
    hideModal();
    createListOfCocktails(CommonUtils.camelizeWords(mixerName));
  };

  const {
    availableCocktails,
    channels,
    dataResponse,
    selectedChannel,
    selectedMixers,
    shouldDisplayModal
  } = bartenderState;

  return (
    <div className='app'>
      <h1>Available Mixers</h1>
      <div className='channel'>
        {
          channels.map(channel => (
            <Channel
              key={channel.id}
              channel={channel}
              clickChannel={clickChannel}
            />
          ))
        }
      </div>
      <h1>Select a Drink</h1>
      {availableCocktails && availableCocktails
        .map((cocktail, index) => (
          <CocktailName
            key={index}
            cocktailName={cocktail.cocktailName}
            listOfIngredients={cocktail.ingredients}
            makeDrinkAPI={apiCall}
          />
        )
        )}

      {shouldDisplayModal && (
        <MixerListModal
          hideModal={hideModal}
          isDisplayed={shouldDisplayModal}
          selectedChannel={selectedChannel}
          selectedMixers={selectedMixers}
          updateChannel={updateChannel}
        />
      )}

      <p>{dataResponse > 0 && (
        <React.Fragment>
          <p>You have {dataResponse / 1000} seconds:</p>
          {/* <p>{setTimeout('TIME!', dataResponse)}</p> */}
        </React.Fragment>
      )}</p>
    </div>
  )
};

export default App;