import 'babel-polyfill';
import React from 'react';

import CommonUtils from '../../utils/CommonUtils';

const MixerName = (props) => {
  const {
    mixerName,
    selectedChannel,
    selectedMixers,
    updateChannel
  } = props;

  // If the mixer has already been used, we do not want it to appear
  for (let i = 0; i < selectedMixers.length; i++) {
    if (selectedMixers[i].mixerName === CommonUtils.camelizeWords(mixerName)) return null;
  }


  // If the mixer is not already
  return (
    <div>
      <div onClick={() => updateChannel(selectedChannel, mixerName)}>{mixerName}</div>
    </div>
  );
};

export default MixerName;