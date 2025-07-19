import {  Skeleton } from "@mui/material";

export default function LoaderSkeleton() {
    return <div className="flex justify-center items-center min-h-screen min-w-screen">
        <Skeleton variant="circular" width={100} height={100} animation="wave" />
        
    </div>
}