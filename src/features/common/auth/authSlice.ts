import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../app/store";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import axios from "axios";

export interface User {
  resourceName: string;
  etag: string;
  names: UserName[];
  photos: UserPhoto[];
}

interface UserName {
  displayName: string;
  givenName: string;
  familyName: string;
  displayNameLastFirst: string;
  unstructuredName: string;
}

interface UserPhoto {
  url: string;
}

export interface AuthState {
  isConnected: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isConnected: false,
  user: null,
  token: localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInSuccess: (state, action: PayloadAction<string>) => {
      state.isConnected = true;
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const authWithGoogle = (): AppThunk => (dispatch, getState) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      dispatch(loggedInSuccess(token || ""));
      dispatch(getUser());
      localStorage.setItem("token", token || "yolo");
    })
    .catch((error) => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const getUser = (): AppThunk => (dispatch, getState) => {
  axios
    .get(
      `https://people.googleapis.com/v1/people/me?personFields=names,photos&key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      {
        headers: {
          authorization: "Bearer " + getState().auth.token || "",
        },
      }
    )
    .then((res) => {
      dispatch(setUser(res.data));
    });
};

export const { loggedInSuccess, setUser } = authSlice.actions;

export const selectConnectionState = (state: RootState) =>
  state.auth.isConnected;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
