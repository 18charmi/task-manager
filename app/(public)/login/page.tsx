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
import { LoginForm } from "@/types/user"
import Link from "next/link"
import { useUserStore } from "@/store/user"

export default function Login() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: yupResolver(schema)
    })
    const login = useUserStore(s => s.login);
    const fetching = useUserStore(s => s.fetching);

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        const success = await login(data);
        if (success) {
            router.push(`/${PAGES.DASHBOARD}`)
        }
    }

    return (
        <Container maxWidth="sm" className="flex flex-col items-center justify-center min-h-screen gap-4">
            <CustomTypography text="Welcome Back" variant="h2" component="h2" letterSpacing={-1} className="text-gray-600" />
            <form onSubmit={handleSubmit(onSubmit)} >


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
                <CustomButton className="!mt-4" label="Login" type="submit" fullWidth loading={fetching} />


            </form>
            <div>
                <label>Don`t have account ? </label>
                <Link href={`/${PAGES.REGISTER}`} className="text-blue-600 font-bold">Register here</Link>
            </div>
        </Container>
    )
}