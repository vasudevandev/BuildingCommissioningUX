// selectedItemSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera } from '../types/Camera';
import { Controller } from '../types/Controller';
import { FireSprinkler } from '../types/FireSprinkler';
import { Floor } from '../types/Floor';
import { Reader } from '../types/Reader';
import { Zone } from '../types/Zone';
import SelectedItemEnum from '../types/SelectedItemEnum';


type SelectedItem = Floor | Zone | Reader | null| FireSprinkler| Camera | Controller;

interface SelectedItemState {
    item: SelectedItem | null;
    itemType: SelectedItemEnum ;
}

const initialState: SelectedItemState = {
    item: null,
    itemType: SelectedItemEnum.NoItemSelected,
};

const selectedItemSlice = createSlice({
    name: 'selectedItem',
    initialState,
    reducers: {
        setSelectedItem: (state, action: PayloadAction<{ 
            item: SelectedItem, 
            itemType: SelectedItemEnum }>) => 
                {
                    state.item = action.payload.item;
                    state.itemType = action.payload.itemType;
                },
        clearSelectedItem: (state) => {
            state.item = null;
            state.itemType = SelectedItemEnum.NoItemSelected;
            console.log("Clearing Selected Item, item ->", state.item, "itemType ->", state.itemType);
        },
    },
});

export const { setSelectedItem, clearSelectedItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;