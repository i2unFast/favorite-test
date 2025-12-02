import { useState, useCallback } from "react";
import { getProperties } from "../../../api/properties";

// User type for favorite
export interface FavoriteUser {
  id: number;
  username: string;
}

// Favorite type
export interface Favorite {
  id: number;
  userId: number;
  propertyId: number;
  user: FavoriteUser;
}

// Property type definition
export interface Property {
  id: number;
  title: string;
  imageUrl: string;
  location: string;
  price: number;
  favorites: Favorite[];
}

export const usePropertyStore = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getProperties();
      // API returns array directly
      const propertiesData = Array.isArray(response.data)
        ? response.data
        : response.data || [];
      setProperties(propertiesData);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError(
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาดในการโหลดข้อมูลคุณสมบัติ"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    properties,
    loading,
    error,
    fetchData,
  };
};
