import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
    userId: string | null;
    token: string | null;
}

const initialState: AuthState = {
    status: "idle",
    userId: null,
    error: null,
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        registerUserLoading: (state) =>  {
            state.status = "loading";
            state.error = null;
        }, 

        registerUserSuccess: (state, action: PayloadAction<{userId: string}>) => {
            state.status = "success";
            state.error = null;
            state.userId = action.payload.userId
        },

        registerUserError: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload
        }
    }
})