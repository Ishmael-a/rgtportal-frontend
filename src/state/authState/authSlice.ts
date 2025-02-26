import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    currentUser: User | null | undefined;
}

const initialState: AuthState = {
    currentUser: undefined,
}

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        SETCURRENTUSER: (state, action: PayloadAction<AuthState>) => {
            // Direct state mutation instead of reassignment
            state.currentUser = action.payload.currentUser;
        },
        LOGIN: (state, action: PayloadAction<AuthState>) => {
            // Direct state mutation instead of reassignment
            state.currentUser = action.payload.currentUser;
        },
        LOGOUT: (state) => {
            // Direct state mutation instead of reassignment
            state.currentUser = null;
        }
    }

})


export const { LOGIN, LOGOUT, SETCURRENTUSER } = userSlice.actions;

export default userSlice.reducer;