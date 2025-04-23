import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Floor } from '../types/Floor';

type CurrentFloorType = Floor | null;

const initialState: CurrentFloorType = null as CurrentFloorType;

const currentFloorSlice = createSlice({
    name: 'currentFloor',
    initialState,
    reducers: {
        setCurrentFloor(_state, action: PayloadAction<Floor | null>) {
            return action.payload;
            console.log("Current floor in slice set to:", action.payload);
        },
        setScale(state, action: PayloadAction<number>) {
            if (state) {
                state.zoomState = action.payload;
            }
        }
    },
});

export const { setCurrentFloor, setScale } = currentFloorSlice.actions;
export default currentFloorSlice.reducer;