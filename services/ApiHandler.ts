import { LoginForm, RegisterForm, User } from '@/types/user';
import axiosClient from './Api';
import { handleApiResponse } from './helper';

export function userLogin(data: LoginForm) {
  return handleApiResponse<User>(
    axiosClient.post('/auth/login', data)
  );
}
export function userSignup(data: RegisterForm) {
  return handleApiResponse<{}>(
    axiosClient.post('/auth/signup', data)
  );
}

export function userLogout() {
  return handleApiResponse<{}>(axiosClient.post('/auth/logout'));
}

export function userDetails() {
  return handleApiResponse<User>(
    axiosClient.get('/auth/profile')
  );
}