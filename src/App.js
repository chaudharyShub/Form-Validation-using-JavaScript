import './App.css';
import React, { createContext, useReducer } from 'react';
import { initialState, reducer } from './Components/Context/reducer';
import { headingReducer, initialHeadingState } from './Components/Context/HeadingReducer';
import Navbar from './Components/Navbar/Navbar';
import Element from './Components/Element';

export const StateContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [headingState, headingDispatch] = useReducer(headingReducer, initialHeadingState);

  const handleSubmit = (type, payload) => {
    dispatch({ type: type, payload: payload });
  }

  const onChangeHeading = (type, payload) => {
    headingDispatch({ type: type, payload: payload });
  }

  const value = {
    handleSubmit,
    state,
    onChangeHeading,
    headingState,
  }

  return (
    <div className='app_main'>
      <StateContext.Provider value={value}>
        <Navbar />
        <React.Suspense fallback="Loading... Please Wait">
          <Element />
        </React.Suspense>
      </StateContext.Provider>
    </div>
  );
}

export default App;
