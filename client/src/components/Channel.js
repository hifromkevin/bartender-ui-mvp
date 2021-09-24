import 'babel-polyfill';
import React from 'react';

const Channel = (props) => {
  const {
    channel: {
      id,
      selectedMixer
    },
    clickChannel
  } = props;

  const mixerName = selectedMixer
    ? selectedMixer
    : 'Select a Mixer';

  return (
    <div className='channel__outer-box'>
      <p>Channel {id + 1}</p>
      <div
        className='channel__inner-box'
        onClick={() => clickChannel(id)}
      >
        {mixerName}
      </div>
    </div>
  )
};

export default Channel;