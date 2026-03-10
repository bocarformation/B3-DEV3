import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
    userId: string | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    status: "idle",
    userId: null,
    error: null,
    token: null,
    isAuthenticated: false
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
        },

        loginUserLoading: (state) => {
            state.status = "loading";
            state.error = null;
            state.token = null;
        },
        loginUserSuccess: (state, action: PayloadAction<{token: string}> ) => {
            state.status = "success";
            state.error = null;
            state.token = action.payload.token;
            state.isAuthenticated = true
        },
        loginUserError: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
            state.token = null
        }

    }
})