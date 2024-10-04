"use client"

import { useSelector } from 'react-redux';
import { Button } from '@/components/Button';
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { logout } from "@/app/api";

const UserProfile = () => {
    const router = useRouter();
    const userData = useSelector((state) => state.user);
    const mutation = useMutation(logout, {
        onSuccess: () => {
            router.push("/login");
        },
        onError: (error) => {
            console.error('Error!', error.message);
        },
    }
    );
    return (
    <div className="m-8">
    {(userData.email) ? (
        <h2 className="text-xl font-bold mb-4"> User Email: {userData.email} </h2>
    ) :
    (
        <h2 className="text-red-600 font-semibold"> Unauthorized user </h2>
    )}
    <Button onClick={mutation.mutate}> Logout</Button>
    </div>
    );
};

export default UserProfile;
