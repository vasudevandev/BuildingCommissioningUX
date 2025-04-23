import { configureStore } from '@reduxjs/toolkit';
import floorsReducer from './slices/floorsSlice';
import currentFloorReducer from './slices/currentFloorSlice';
import selectedItemReducer from './slices/selectedItemSlice';


const store = configureStore({
    reducer: {
        floors: floorsReducer,
        currentFloor: currentFloorReducer,
        selectedItem: selectedItemReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;