"use client"
import CustomInput from "@/components/CustomInput"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import CustomButton from "@/components/CustomButton"
import { Container } from "@mui/material"
import { Task } from "@/types/project"
import { taskSchema } from "../helper"
import { useProjectStore } from "@/store/slice/project"

type TaskFormReq = Pick<Task, 'title'>
type TaskFormProps = { id: string, onClose: () => void }
export default function TaskForm({ id, onClose }: TaskFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskFormReq>({
        resolver: yupResolver(taskSchema),
        defaultValues: {
            title: ''
        }
    })

    const createTask = useProjectStore(s => s.createTask);

    const onSubmit: SubmitHandler<TaskFormReq> = async (data) => {
        await createTask(id, data)
        onClose();
    }


    return (
        <Container maxWidth="sm" className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} >

                <CustomInput label="Title"
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
                <CustomButton className="!mt-4"
                    label={`Add Task`}
                    type="submit" fullWidth />
            </form>
        </Container>
    )
}