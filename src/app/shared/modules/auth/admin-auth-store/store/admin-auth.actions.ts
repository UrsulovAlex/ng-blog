import {createAction, props} from '@ngrx/store';
import { AuthData } from '@shared/modules/auth/admin-auth-store/store/admin-auth.reducer';
import { AdminAuthActionType } from './config';


export const login = createAction(
  AdminAuthActionType.login,
  props<{login: string, password: string}>()
);

export const loginSuccess = createAction(
  AdminAuthActionType.loginSuccess,
  props<{ authData: AuthData }>()
);

export const loginFailed = createAction(
  AdminAuthActionType.loginFailed,
  props<{serverError: string}>()
);

export const initAdminAuth = createAction(
  AdminAuthActionType.initAdminAuth
);

export const logout = createAction(
  AdminAuthActionType.logout
);

export const logoutSuccess = createAction(
  AdminAuthActionType.logoutSuccess
);

export const extractLoginData = createAction(
  AdminAuthActionType.extractLoginData
);