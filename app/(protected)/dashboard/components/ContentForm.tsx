"use client"
import CustomInput from "@/components/CustomInput"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import CustomButton from "@/components/CustomButton"
import { Container } from "@mui/material"
import { Project } from "@/types/project"
import { schema } from "../helper"
import { useProjectStore } from "@/store/slice/project"

type ContentFormReq = Pick<Project, 'title' | 'description'>
type ContentFormProps = { detail: Project | undefined; onClose: () => void }
export default function ContentForm({ detail, onClose }: ContentFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContentFormReq>({
        resolver: yupResolver(schema),
        defaultValues: detail ? {
            title: detail.title,
            description: detail.description,
        } : {}
    })

    console.log("detail...", detail)
    const addProject = useProjectStore(s => s.addProject);
    const editProject = useProjectStore(s => s.editProject);

    const onSubmit: SubmitHandler<ContentFormReq> = async (data) => {
        console.log("detail...", detail)

        if (detail) {
            await editProject(detail.id, data)
        } else {
            await addProject(data);
        }
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
                <CustomInput label="Description"
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
                <CustomButton className="!mt-4"
                    label={`${detail ? "Update" : "Add"} Details`}
                    type="submit" fullWidth />
            </form>
        </Container>
    )
}