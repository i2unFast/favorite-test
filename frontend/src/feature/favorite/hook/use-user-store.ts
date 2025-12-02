import { useState, useCallback } from "react";
import { getUsers } from "../../../api/user";

// Favorite type for user
export interface UserFavorite {
  id: number;
  userId: number;
  propertyId: number;
  property: {
    id: number;
    title: string;
    imageUrl: string;
    location: string;
    price: number;
  };
}

// User type definition
export interface User {
  id: number;
  username: string;
  favorites?: UserFavorite[];
}

export const useUserStore = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getUsers();
      // API returns array directly
      const usersData = Array.isArray(response.data)
        ? response.data
        : response.data || [];
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchData,
  };
};
