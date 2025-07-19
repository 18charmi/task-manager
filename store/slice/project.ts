import { create } from "zustand";
import { Project, Task } from "@/types/project";
import {
    listProjects,
    createProject,
    updateProject,
    listProjectTasks,
    addTask,
    updateTask,
} from "@/services/ApiHandler";

interface ProjectStore {
    projects: Project[];
    loading: boolean;
    fetchProjects: () => Promise<void>;
    addProject: (data: Pick<Project, "title" | "description">) => Promise<Project | undefined>;
    editProject: (id: string, data: Partial<Pick<Project, "title" | "description">>) => Promise<Project | undefined>;
    fetchProjectTasks: (projectId: string) => Promise<Task[]>;
    createTask: (projectId: string, task: Pick<Task, "title">) => Promise<Task | undefined>;
    editTask: (projectId: string, taskId: string, data: Partial<Pick<Task, "title" | "status">>) => Promise<Task | undefined>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
    projects: [],
    loading: false,

    fetchProjects: async () => {
        set({ loading: true });
        const res = await listProjects();
        set({ projects: res?.data ?? [], loading: false });
    },

    addProject: async (data) => {
        set({ loading: true });
        const res = await createProject(data);
        if (res?.data) {
            set((state) => ({
                projects: [...state.projects, res.data],
                loading: false,
            }));
            return res.data;
        }
        set({ loading: false });
    },

    editProject: async (id, data) => {
        set({ loading: true });
        const res = await updateProject(id, data);
        if (res?.data) {
            set((state) => ({
                projects: state.projects.map((p) =>
                    p.id === id ? { ...p, ...data } : p
                ),
                loading: false,
            }));
            return res.data;
        }
        set({ loading: false });
    },

    fetchProjectTasks: async (projectId) => {
        const res = await listProjectTasks(projectId);
        return res?.data ?? [];
    },

    createTask: async (projectId, task) => {
        set({ loading: true });
        const res = await addTask(projectId, task);
        if (res?.data) {
            set((state) => ({
                projects: state.projects.map((proj) =>
                    proj.id === projectId
                        ? (res.data) as unknown as Project
                        : proj
                ),
                loading: false,
            }));
            return res.data;
        }
        set({ loading: false });
    },

    editTask: async (projectId, taskId, data) => {
        set({ loading: true });
        const res = await updateTask(projectId, taskId, data);
        if (res?.data) {
            set((state) => ({
                projects: state.projects.map((proj) =>
                    proj.id === projectId
                        ? {
                            ...proj,
                            tasks: proj.tasks.map((t) =>
                                t.id === taskId ? { ...t, ...data } : t
                            ),
                        }
                        : proj
                ),
                loading: false,
            }));
            return res.data;
        }
        set({ loading: false });
    },
}));
