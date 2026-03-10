import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import * as AuthModel from "../domain/model/auth-model"
export type AuthState = {
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
    userId: string | null;
    isAuthenticated: boolean;
    user: AuthModel.User
}

const initialState: AuthState = {
    status: "idle",
    userId: null,
    error: null,
    isAuthenticated: false,
    user: {
        userId: "",
        email: "",
        role: "user"
    }

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