import React, { useContext, useRef, useEffect } from 'react';
import NoteContext from '../../context/note/noteContext';

const NoteFilter = () => {
  const noteContext = useContext(NoteContext);
  const text = useRef('');

  const { filterNotes, clearFilter, filtered } = noteContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterNotes(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Notes...'
        onChange={onChange}
      />
    </form>
  );
};

export default NoteFilter;
