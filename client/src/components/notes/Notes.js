import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NoteItem from './NoteItem';
import Spinner from '../layout/Spinner';
import NoteContext from '../../context/note/noteContext';

const Notes = () => {
  const noteContext = useContext(NoteContext);

  const { notes, filtered, getNotes, loading } = noteContext;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  if (notes !== null && notes.length === 0 && !loading) {
    return <h4>Please add a note</h4>;
  }

  return (
    <Fragment>
      {notes !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(note => (
                <CSSTransition key={note._id} timeout={500} classNames='item'>
                  <NoteItem note={note} />
                </CSSTransition>
              ))
            : notes.map(note => (
                <CSSTransition key={note._id} timeout={500} classNames='item'>
                  <NoteItem note={note} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Notes;
