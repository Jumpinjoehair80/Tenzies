import React from 'react';

export default function Die(props) {
  return (
    <div className='die-container'>
      <div className='value'>{props.value}</div>
    </div>
  );
}
