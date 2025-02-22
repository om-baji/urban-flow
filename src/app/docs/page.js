"use client";
import { useSwagger } from "@/lib/swagger";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const ApiDocs = () => {
  const { spec, isLoading } = useSwagger();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading API documentation...
      </div>
    );
  }

  if (!spec) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Failed to load API documentation
      </div>
    );
  }

  return (
    <div className="bg-white">
      <SwaggerUI spec={spec} />
    </div>
  );
};

export default ApiDocs;
