import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../components/ui/Loader";

const ProtectedRoute = ({ children, myBoolean, path, isLoading = false }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!myBoolean) router.push(path);
    }
  },[isLoading]);

  if (!myBoolean)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader />
      </div>
    );

  return <>{children}</>;
};

export default ProtectedRoute;
