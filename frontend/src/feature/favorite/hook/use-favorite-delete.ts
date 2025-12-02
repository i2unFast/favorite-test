import { useState, useCallback } from "react";
import { deleteFavorite as deleteFavoriteAPI } from "../../../api/favorites";
import type { AxiosRequestHeaders } from "axios";

export const useFavoriteDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteFavorite = useCallback(
    async (favoriteId: number, headers?: AxiosRequestHeaders) => {
      setLoading(true);
      setError(null);

      try {
        const response = await deleteFavoriteAPI(String(favoriteId), headers);
        return response.data;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "เกิดข้อผิดพลาดในการลบ favorite";
        setError(errorMessage);
        console.error("Error deleting favorite:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { deleteFavorite, loading, error };
};
