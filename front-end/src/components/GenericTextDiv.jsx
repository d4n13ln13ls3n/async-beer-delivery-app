import React from 'react';

function GenericTextDiv(text, datatestid) {
  return (
    <div data-testid={ datatestid }><p>{ text }</p></div>
  );
}

export default GenericTextDiv;
