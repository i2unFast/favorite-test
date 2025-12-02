import Box from "@mui/material/Box/Box";
import { FC } from "react";
import { Favorite as FavoriteComponent } from "../feature/favorite/components";

const FavoritePage: FC = () => {
  return (
    <>
      <Box sx={{ bgcolor: "#FFFDF8", p: 3 }}>
        <FavoriteComponent />
      </Box>
    </>
  );
};

export default FavoritePage;
