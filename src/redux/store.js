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

const reducers = combineReducers({
  sendotp: AuthSlice,
  verifyotp: UserSlice,
  panchang: PanchangSlice,
  kundali: BasicKundaliSlice,
  dasha: DashaKundaliSlice,
  lalkitab: LalKitabKundaliSlice,
  marraige: MarraigeKundaliSlice,
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
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);
export {store, persistor};
