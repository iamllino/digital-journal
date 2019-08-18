import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NoteContext from '../../context/note/noteContext';

const NoteItem = ({ note }) => {
  const noteContext = useContext(NoteContext);
  const { deleteNote, setCurrent, clearCurrent } = noteContext;

  const { _id, title, body } = note;

  const onDelete = () => {
    deleteNote(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>{title}</h3>
      <p className='my-1'>{body}</p>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(note)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteItem;
