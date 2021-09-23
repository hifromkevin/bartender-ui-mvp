import "babel-polyfill";
import React, { useState } from "react";

import Channel from './Channel';

const App = () => {
  const [
    bartenderState,
    setBartenderState
  ] = useState({
    channels: [
      {
        id: 0,
        shortName: 'channel1',
        longName: 'Channel 1',
        gpioPinNumber: 4,
        selectedMixer: null
      },
      {
        id: 1,
        shortName: 'channel2',
        longName: 'Channel 2',
        gpioPinNumber: 17,
        selectedMixer: null
      },
      {
        id: 2,
        shortName: 'channel3',
        longName: 'Channel 3',
        gpioPinNumber: 27,
        selectedMixer: null
      },
      {
        id: 3,
        shortName: 'channel4',
        longName: 'Channel 4',
        gpioPinNumber: 22,
        selectedMixer: null
      },
      {
        id: 4,
        shortName: 'channel5',
        longName: 'Channel 5',
        gpioPinNumber: 10,
        selectedMixer: null
      },
      {
        id: 5,
        shortName: 'channel6',
        longName: 'Channel 6',
        gpioPinNumber: 9,
        selectedMixer: null
      },
      {
        id: 6,
        shortName: 'channel7',
        longName: 'Channel 7',
        gpioPinNumber: 11,
        selectedMixer: null
      },
      {
        id: 7,
        shortName: 'channel8',
        longName: 'Channel 8',
        gpioPinNumber: 5,
        selectedMixer: null
      }
    ]
  });

  const {
    channels
  } = bartenderState;

  return (
    <div className='app'>
      <h1>Channels</h1>
      <div className='channel'>
        {
          channels.map(channel => (
            <Channel
              key={channel.id}
              channel={channel}
            />
          ))
        }
      </div>
    </div>
  );
};

export default App;