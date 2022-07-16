import React from 'react';

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : '#ffffff',
  };
  return (
    <div>
      <div className='value' style={styles} onClick={props.holdDice}>
        {props.value}
      </div>
    </div>
  );
}
