import { LoginForm, RegisterForm, User } from '@/types/user';
import axiosClient from './Api';
import { handleApiResponse } from './helper';

export function userLogin(data: LoginForm) {
  return handleApiResponse<User>(
    axiosClient.post('/auth/user', { ...data, action: 'login', })
  );
}
export function userSignup(data: RegisterForm) {
  return handleApiResponse<{}>(
    axiosClient.post('/auth/user', { ...data, action: 'signup' })
  );
}

export function userLogout() {
  return handleApiResponse<{}>(axiosClient.delete('/auth/user'));
}

export function userDetails() {
  return handleApiResponse<User>(
    axiosClient.get('/auth/user')
  );
}