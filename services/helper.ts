import { AxiosError } from "axios";

export function handleApiResponse<T>(promise: Promise<any>): Promise<{
    success: boolean;
    data: T;
    message: string;
}> {
    return promise
        .then(({data: {data, message}}) => ({
            success: true,
            data: data,
            message: message,
        }))
        .catch((error: AxiosError<{ message: string }>) => ({
            success: false,
            data: {} as T,
            message:
                error.response?.data?.message || error.message || 'Unexpected error',
        }));
}
