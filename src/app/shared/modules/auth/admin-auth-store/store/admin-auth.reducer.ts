import { createReducer, on } from "@ngrx/store";
import { login, loginFailed, loginSuccess,logoutSuccess } from "./admin-auth.actions";
import { roleAuthData } from "./config";

export const ADMIN_AUTH_FEATURE_NAME = 'admin-auth';

export interface AuthData {
  accessToken: string;
  id: number;
  role: roleAuthData;
  iat: number;
  exp: number;
}
  
export interface AdminAuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  authData: AuthData | null;
}
  
const initialState: AdminAuthState = {
  loaded: true,
  loading: false,
  serverError: '',
  authData: null
};

export const adminAuthReducer = createReducer(
  initialState,
  on(login, state => ({
    ...state,
    loading: true
  })),
  on(loginSuccess, (state, { authData }) => ({
    ...state,
    loaded: true,
    loading: false,
    serverError: '',
    authData,
  })),
  on(loginFailed, (state, {serverError}) => ({
    ...state,
    authData: null,
    loaded: false,
    loading: false,
    serverError,
  })),
  on(logoutSuccess, () => ({
    ...initialState,
    authData: null,
  })),
);
