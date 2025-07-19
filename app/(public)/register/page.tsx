"use client"
import CustomInput from "@/components/CustomInput"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import CustomButton from "@/components/CustomButton"
import { Container } from "@mui/material"
import CustomTypography from "@/components/CustomTypography"
import { PAGES } from "@/utils/constant"
import { schema } from "./helper"
import { RegisterForm } from "@/types/user"
import Link from "next/link"
import { useUserStore } from "@/store/user"

export default function Register() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: yupResolver(schema)
    })
    const signup = useUserStore(s => s.signup);
    const fetching = useUserStore(s => s.fetching);

    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        const success = await signup(data);
        if (success) {
            router.push(`/${PAGES.LOGIN}`)
        }
    }

    return (
        <Container maxWidth="sm" className="flex flex-col items-center justify-center min-h-screen gap-4">
            <CustomTypography text="Register" variant="h3" component="h3" letterSpacing={-1} className="text-gray-600" />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <CustomInput label="Username"
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <CustomInput label="Password"
                    {...register("password")}
                    error={!!errors.password}
                    type="password"
                    helperText={errors.password?.message}
                />

                <CustomButton className="!mt-4" label="Register" type="submit" fullWidth loading={fetching} />
            </form>
            <div>
                <label>Already have account ? </label>
                <Link href={`/${PAGES.LOGIN}`} className="text-blue-600 font-bold">Login </Link>
            </div>
        </Container>
    )
}