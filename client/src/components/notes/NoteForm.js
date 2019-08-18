import React, { useState, useContext, useEffect } from 'react';
import NoteContext from '../../context/note/noteContext';

const NoteForm = () => {
  const noteContext = useContext(NoteContext);

  const { addNote, updateNote, clearCurrent, current } = noteContext;

  useEffect(() => {
    if (current !== null) {
      setNote(current);
    } else {
      setNote({
        title: '',
        body: ''
      });
    }
  }, [noteContext, current]);

  const [note, setNote] = useState({
    title: '',
    body: ''
  });

  const { title, body } = note;

  const onChange = e => setNote({ ...note, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addNote(note);
    } else {
      updateNote(note);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Note' : 'Add Note'}</h2>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={title}
        onChange={onChange}
      />
      <textarea
        name='body'
        placeholder='Body'
        value={body}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Note' : 'Add Note'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default NoteForm;
