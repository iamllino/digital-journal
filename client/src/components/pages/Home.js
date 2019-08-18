import React, { useContext, useEffect } from 'react';
import Notes from '../notes/Notes';
import NoteForm from '../notes/NoteForm';
import NoteFilter from '../notes/NoteFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <NoteForm />
      </div>
      <div>
        <NoteFilter />
        <Notes />
      </div>
    </div>
  );
};

export default Home;
