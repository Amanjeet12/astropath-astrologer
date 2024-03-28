import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthSlice from './features/AuthSlice';
import UserSlice from './features/UserSlice';
import PanchangSlice from './features/PanchangSlice';
import BasicKundaliSlice from './features/BasicKundaliSlice';
import DashaKundaliSlice from './features/DashaKundaliSlice';
import LalKitabKundaliSlice from './features/LalKitabKundaliSlice';
import MarraigeKundaliSlice from './features/MarraigeKundaliSlice';
import QueueSlice from './features/QueueSlice';
import RatingSlice from './features/RatingSlice';

const reducers = combineReducers({
  sendotp: AuthSlice,
  verifyotp: UserSlice,
  panchang: PanchangSlice,
  kundali: BasicKundaliSlice,
  dasha: DashaKundaliSlice,
  lalkitab: LalKitabKundaliSlice,
  marraige: MarraigeKundaliSlice,
  queue: QueueSlice,
  rating: RatingSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['verifyotp'],
  blacklist: [
    'sendotp',
    'kundali',
    'dasha',
    'lalkitab',
    'panchang',
    'marraige',
    'queue',
    'rating',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const resetAllExceptVerifyOtpMiddleware = store => next => action => {
  if (action.type === 'RESET_ALL_EXCEPT_VERIFYOTP') {
    AsyncStorage.multiRemove([
      'persist:root',
      'persist:sendotp',
      'persist:kundali',
      'persist:dasha',
      'persist:lalkitab',
      'persist:panchang',
      'persist:marraige',
      'persist:queue',
      'persist:rating',
    ]);
  }
  return next(action);
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      resetAllExceptVerifyOtpMiddleware,
    ),
});

const persistor = persistStore(store);
export {store, persistor};
