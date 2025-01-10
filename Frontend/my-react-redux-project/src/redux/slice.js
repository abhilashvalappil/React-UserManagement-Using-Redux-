    import { createSlice } from '@reduxjs/toolkit';

    // Helper functions to interact with localStorage
    const loadState = () => {
        try {
            const serializedState = localStorage.getItem('state');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    };

    const saveState = (state) => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('state', serializedState);
        } catch (err) {
            // Ignore write errors
        }
    };

    // Initial state
    const initialState = loadState() || {
        user: {
            user: null, // or {} if you want a non-null structure
        },
        token: null,
    };
    

    const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
            setUser: (state, action) => {
                state.user = action.payload;
                saveState(state);
            },
            setToken: (state, action) => {
                state.token = action.payload;
                saveState(state);
            },
            clearUser: (state) => {
                state.user = null;
                state.token = null;
                saveState(state);
            },
        },
    });

    export const { setUser, setToken, clearUser } = userSlice.actions;

    export default userSlice.reducer;