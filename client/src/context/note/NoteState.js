import React, { useReducer } from 'react';
import axios from 'axios';
import NoteContext from './noteContext';
import NoteReducer from './noteReducer';
import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_NOTE,
  FILTER_NOTES,
  CLEAR_NOTES,
  CLEAR_FILTER,
  NOTE_ERROR
} from '../types';

const NoteState = props => {
  const initialState = {
    notes: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(NoteReducer, initialState);

  // Get Contacts
  const getNotes = async () => {
    try {
      const res = await axios.get('/api/notes');

      dispatch({
        type: GET_NOTES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NOTE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Note
  const addNote = async note => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/notes', note, config);

      dispatch({
        type: ADD_NOTE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NOTE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Note
  const deleteNote = async id => {
    try {
      await axios.delete(`/api/notes/${id}`);

      dispatch({
        type: DELETE_NOTE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: NOTE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Note
  const updateNote = async note => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/notes/${note._id}`, note, config);

      dispatch({
        type: UPDATE_NOTE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NOTE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Contacts
  const clearNotes = () => {
    dispatch({
      type: CLEAR_NOTES
    });
  };

  // Set Current Note
  const setCurrent = note => {
    dispatch({
      type: SET_CURRENT,
      payload: note
    });
  };

  // Clear Current Note
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  // Filter Notes
  const filterNotes = text => {
    dispatch({
      type: FILTER_NOTES,
      payload: text
    });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addNote,
        deleteNote,
        setCurrent,
        clearCurrent,
        updateNote,
        filterNotes,
        clearFilter,
        getNotes,
        clearNotes
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
