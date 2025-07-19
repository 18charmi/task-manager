import { LoginForm, RegisterForm, User } from '@/types/user';
import { Project, Task } from "@/types/project";
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

export function listProjects() {
  return handleApiResponse<Project[]>(
    axiosClient.get('/project')
  );
}

export function createProject(data: Pick<Project, 'title' | 'description'>) {
  return handleApiResponse<Project>(
    axiosClient.post('/project', data)
  );
}

export function updateProject(id: string, data: Partial<Pick<Project, 'title' | 'description'>>) {
  return handleApiResponse<Project>(
    axiosClient.put('/project', { type: "project", id, ...data })
  );
}

export function listProjectTasks(projectId: string) {
  return handleApiResponse<Task[]>(
    axiosClient.get(`/project`, { params: { projectId, type: "list-tasks" } })
  );
}

export function addTask(projectId: string, task: Pick<Task, 'title'>) {
  return handleApiResponse<Task>(
    axiosClient.put('/project', { type: "task", projectId, ...task })
  );
}

export function updateTask(projectId: string, taskId: string, data: Partial<Pick<Task, 'title' | 'status'>>) {
  return handleApiResponse<Task>(
    axiosClient.put('/project', { type: "update-task", projectId, taskId, ...data })
  );
}