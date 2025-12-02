import { useState, useCallback } from "react";
import { createFavorite as createFavoriteAPI } from "../../../api/favorites";
import type { AxiosRequestHeaders } from "axios";

interface CreateFavoriteParams {
  userId: number;
  propertyId: number;
}

export const useFavoriteCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createFavorite = useCallback(
    async (
      userId: number,
      propertyId: number,
      headers?: AxiosRequestHeaders
    ) => {
      setLoading(true);
      setError(null);

      try {
        const data: CreateFavoriteParams = {
          userId,
          propertyId,
        };
        const response = await createFavoriteAPI(headers, data);
        return response.data;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "เกิดข้อผิดพลาดในการเพิ่ม favorite";
        setError(errorMessage);
        console.error("Error creating favorite:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createFavorite, loading, error };
};
