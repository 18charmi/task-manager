import CustomButton from "@/components/CustomButton"
import CustomDialog from "@/components/CustomDialog"
import { Project } from "@/types/project"
import { useState } from "react";
import TaskForm from "./TaskForm";
import { TaskTable } from "./TaskTable";

export const ProjectList = ({ list = [], onEdit }: { list: Project[], onEdit: (d: Project) => void }) => {
    const [open, setOpen] = useState(false);
    const [projectId, setProjectId] = useState<string | undefined>();

    const handleDialogOpen = (id?: string) => {
        setProjectId(id)
        setOpen(true)
    };
    const handleDialogClose = () => {
        setOpen(false)
    };

    return <div className="flex flex-col gap-4">
        {list.length === 0 && (
            <div className="w-full text-center text-gray-500 italic">No projects found.</div>
        )}

        {list.map((project) => (
            <div
                key={project.id}
                className="bg-white shadow rounded-lg px-5 py-4 hover:shadow-lg transition-all border border-gray-100"
            >
                <div className=" flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
                    <div>
                        <div className="text-lg font-semibold text-gray-900">{project.title}</div>
                        <div className="text-gray-500 text-sm">{project.description}</div>
                    </div>

                    <div className="flex gap-2">
                        <CustomButton variant="outlined" onClick={() => onEdit(project)}>Edit</CustomButton>
                        <CustomButton variant="outlined" onClick={() => handleDialogOpen(project.id)}>New Task</CustomButton>
                    </div>
                </div>
                <div className="mt-4 border-t-4 border-gray-100">
                    <TaskTable list={project.tasks} />
                </div>

            </div>
        ))}

        <CustomDialog
            open={open}
            title={`Add Task`}
            onClose={handleDialogClose}
        >
            <TaskForm id={projectId!} onClose={() => handleDialogClose()} />
        </CustomDialog>
    </div>
}