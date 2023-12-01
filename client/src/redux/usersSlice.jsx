import { createSlice } from '@reduxjs/toolkit';
export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
        },
    }
});
export const { SetUser, user } = usersSlice.actions;
