import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        activeContact: null,
    },
    reducers: {
        setActiveContact: (state, action) => {
            state.activeContact = action.payload;
        },
        removeActiveContact : (state) => {
            state.activeContact = null;
        }
    }
})

export const { setActiveContact,removeActiveContact } = contactSlice.actions;
export default contactSlice.reducer;