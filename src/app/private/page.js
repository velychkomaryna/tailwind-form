'use client'

import React from 'react';
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { privatePage } from "@/app/api.js";

const PrivatePage = () => {
    const router = useRouter();
    const { data: privateData, isLoading, isError } = useQuery("privateText", privatePage);

    if (isLoading) return <p className="text-center text-lg">Loading...</p>;
    if (isError) return <p className="text-red-500">Error fetching data</p>;

    return (
      <div className="container mx-auto mt-10">
        <div className="my-5">
          <h1 className="text-3xl font-bold">Private page for checking authorization</h1>
          <p>{privateData.message} - {privateData.user}</p>
        </div>
      </div>
    );
};

export default PrivatePage;
