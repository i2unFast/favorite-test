import React, { useEffect, useState } from "react";
import { Grid, Box, Alert, Snackbar } from "@mui/material";
import UserOption from "./user-option";
import { usePropertyStore } from "../hook/use-property-store";
import PropertyCard from "./property-card";
import { User, useUserStore } from "../hook/use-user-store";
import { useFavoriteCreate } from "../hook/use-favorite-create";
import { useFavoriteDelete } from "../hook/use-favorite-delete";
import { useSnackbar } from "../hook/use-snackbar";

const Favorite: React.FC = () => {
  const { users, fetchData } = useUserStore();
  const { properties, fetchData: fetchProperties } = usePropertyStore();
  const { createFavorite, error: createError } = useFavoriteCreate();
  const { deleteFavorite, error: deleteError } = useFavoriteDelete();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const [favoritePropertyIds, setFavoritePropertyIds] = useState<number[]>([]);
  const [favoriteIdMap, setFavoriteIdMap] = useState<Map<number, number>>(
    new Map()
  ); // propertyId -> favoriteId
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleSelectUser = (userId: number) => {
    const user: User | undefined = users.find((user) => user.id === userId);
    if (user && user.favorites) {
      // ดึงเฉพาะ propertyId จาก favorites array
      const propertyIds = user.favorites.map((favorite) => favorite.propertyId);
      setFavoritePropertyIds(propertyIds);

      // สร้าง map ของ propertyId -> favoriteId
      const newMap = new Map<number, number>();
      user.favorites.forEach((favorite) => {
        newMap.set(favorite.propertyId, favorite.id);
      });
      setFavoriteIdMap(newMap);

      setSelectedUserId(userId);
    } else {
      setFavoritePropertyIds([]);
      setFavoriteIdMap(new Map());
      setSelectedUserId(userId);
    }
  };

  const handleClickFavorite = async (propertyId: number) => {
    if (!selectedUserId) {
      showSnackbar("กรุณาเลือก user ก่อน", "warning");
      return;
    }

    const isFavorite = favoritePropertyIds.includes(propertyId);

    try {
      if (isFavorite) {
        // ลบ favorite
        const favoriteId = favoriteIdMap.get(propertyId);
        if (!favoriteId) {
          showSnackbar("ไม่พบ favorite ID", "error");
          return;
        }

        await deleteFavorite(favoriteId);
        showSnackbar("ลบ favorite สำเร็จ", "error");

        // อัพเดท favoritePropertyIds และ favoriteIdMap
        setFavoritePropertyIds(
          favoritePropertyIds.filter((id) => id !== propertyId)
        );
        const newMap = new Map(favoriteIdMap);
        newMap.delete(propertyId);
        setFavoriteIdMap(newMap);
      } else {
        // เพิ่ม favorite
        const response = await createFavorite(selectedUserId, propertyId);
        if (response?.id) {
          showSnackbar("เพิ่ม favorite สำเร็จ", "success");
        } else {
          showSnackbar("เพิ่ม favorite ไม่สำเร็จ", "error");
        }

        // อัพเดท favoritePropertyIds และ favoriteIdMap
        setFavoritePropertyIds([...favoritePropertyIds, propertyId]);
        if (response?.id) {
          const newMap = new Map(favoriteIdMap);
          newMap.set(propertyId, response.id);
          setFavoriteIdMap(newMap);
        }
      }
    } catch (err: unknown) {
      const error = err as {
        response?: { status?: number; data?: { error?: string } };
        message?: string;
      };
      // จัดการ error cases ตาม backend response
      if (error?.response?.status === 400) {
        showSnackbar("userId and propertyId are required", "error");
      } else if (error?.response?.status === 404) {
        showSnackbar(
          error?.response?.data?.error || "User or Property not found",
          "error"
        );
      } else if (error?.response?.status === 409) {
        showSnackbar("This property is already in favorites", "error");
      } else {
        showSnackbar(
          error?.message ||
            `เกิดข้อผิดพลาดในการ${isFavorite ? "ลบ" : "เพิ่ม"} favorite`,
          "error"
        );
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchProperties();
  }, [fetchData, fetchProperties]);

  return (
    <Box>
      <UserOption users={users} onSelectUser={handleSelectUser} />
      {createError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {createError}
        </Alert>
      )}
      {deleteError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {deleteError}
        </Alert>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {properties.map((property) => {
          const isFavorite = favoritePropertyIds.includes(property.id);
          return (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <PropertyCard
                property={property}
                isFavorite={isFavorite}
                onClickFavorite={handleClickFavorite}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Favorite;
