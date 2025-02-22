"use client"
import { useState, useEffect, useCallback } from "react";

export const useSwagger = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [spec, setSpec] = useState(null);

    const getApiDocs = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/docs');
            
            if (!response.ok) {
                throw new Error('Failed to fetch API documentation');
            }

            const apiSpec = await response.json();
            setSpec(apiSpec);
        } catch (error) {
            console.error('Error loading API documentation:', error);
            setSpec(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getApiDocs();
    }, [getApiDocs]);

    return {
        isLoading,
        spec,
    };
};