import './App.css';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { headingReducer, initialHeadingState } from './HeadingReducer';
import Creator from './Components/Creator/Creator';
import User from './Components/User/User';

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
    <StateContext.Provider value={value}>
      <div className='app_main'>
        <div className="creator">
          <Creator />
        </div>
        <div className="user">
          <User />
        </div>
      </div>
    </StateContext.Provider>
  );
}

export default App;
