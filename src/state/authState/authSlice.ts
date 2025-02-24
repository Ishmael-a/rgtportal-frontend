import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    currentUser: User | null | undefined;
    token: string | null | undefined;
}

const initialState: AuthState = {
    currentUser: undefined,
    token: undefined,
}

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        LOGIN: (state, action: PayloadAction<AuthState>) => {
            // Direct state mutation instead of reassignment
            state.currentUser = action.payload.currentUser;
            state.token = action.payload.token;
        },
        LOGOUT: (state) => {
            // Direct state mutation instead of reassignment
            state.currentUser = null;
            state.token = null;
        }
    }

})


export const { LOGIN, LOGOUT } = userSlice.actions;

export default userSlice.reducer;