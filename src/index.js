import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];

// plantList reducer - listens for specific action types and has an initial state that it updates
const plantList = (state = [], action) => {
  switch (action.type) {
    case 'GET_PLANT_DATA':
      return action.payload;
    case 'ADD_PLANT':
      return [...state, action.payload]
    default:
      return state;
  }
};

function* addPlant(action) {
  // console.log("payload for POST:", action.payload)
  yield axios.post('/api/plant', action.payload)
}

function* getPlants(action) {
  // addPlantsData works like response, addPlantsData.data is like response.data
  const addPlantsData = yield axios.get('/api/plant')
  console.log("getting plants:", addPlantsData.data);
  // after get, this works like .then, and dispatches (put) action which is heard in the plantList reducer  
  yield put({ type: 'GET_PLANT_DATA', payload: addPlantsData.data })
}

function* rootSaga() {
  yield takeLatest('GET_PLANTS', getPlants)
  yield takeLatest('NEW_PLANT', addPlant)
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    plantList
  }),
  applyMiddleware(
    logger,
    sagaMiddleware
  )
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);