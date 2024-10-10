"use client"

import { Button } from '@/components/Button';
import { useRouter } from "next/navigation";
import { useGetUserQuery, useLogoutUserMutation } from  '@/lib/features/api/apiSlice';
import { Error } from "@/components/FormikFields";


const UserProfile = () => {
    const router = useRouter();
    const [logoutUser, {  isLoading: isLogoutLoading, error: logoutError }] = useLogoutUserMutation();
    const {data: userData, error: userError, isLoading: isUserLoading} = useGetUserQuery();

    return (
    <div className="m-8">
    {isUserLoading ? (
            <h2 className="text-gray-500">Loading user data...</h2>
        ) : userError ? (
            <h2 className="text-red-600 font-semibold"> Unauthorized user </h2>
        ) : (
            <h2 className="text-xl font-bold mb-4"> User Email: {userData.user} </h2>
        )
    }
    <Error>{logoutError}</Error> 
    <Button disabled={isLogoutLoading} onClick={logoutUser}> {logoutError ? "Logout..." : "Logout"} </Button>
    </div>
    );
};

export default UserProfile;
