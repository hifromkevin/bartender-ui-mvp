import 'babel-polyfill';
import React from 'react';
import Modal from 'react-modal';

import MixerName from './MixerName';
import mixers from '../../utils/mixers';

const MixerListModal = (props) => {
  const {
    hideModal,
    isDisplayed,
    selectedChannel,
    selectedMixers,
    updateChannel
  } = props;

  return (
    <Modal
      className='mixerListModal'
      isOpen={isDisplayed}
      ariaHideApp={false}
      overlayClassName='mixerListModal__overlay'
    >
      <h1>Select a Mixer</h1>
      {mixers.map((mixer, index) => (
        <MixerName
          key={index}
          mixerName={mixer.mixerName}
          selectedChannel={selectedChannel}
          selectedMixers={selectedMixers}
          updateChannel={updateChannel}
        />
      ))}
      <br />
      <hr />
      <p onClick={hideModal}>Close</p>
    </Modal>
  )
};

export default MixerListModal;