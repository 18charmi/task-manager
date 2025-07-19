import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        id: "Setup Project",
        title: "Task Manager",
        description: "In Nextjs",
        tasks: [
            {
                id: "task#1",
                projectId: "Setup Project",
                title: "Setup Next Repo",
                status: "pending"
            }, {
                id: "task#2",
                projectId: "Setup Project",
                title: "Setup Frontend Logic",
                status: "completed"
            }, {
                id: "task#3",
                projectId: "Setup Project",
                title: "Setup Backend Logic",
                status: "completed"
            }, {
                id: "task#4",
                projectId: "Setup Project",
                title: "Submission",
                status: "completed"
            }
        ]
    }
];
