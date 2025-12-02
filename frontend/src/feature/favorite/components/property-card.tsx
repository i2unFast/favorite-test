import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { Property } from "../hook/use-property-store";

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
  onClickFavorite: (propertyId: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite = false,
  onClickFavorite,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="property">
            {property.title.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={property.title}
        subheader={property.location}
      />
      <CardMedia
        component="img"
        height="194"
        image={property.imageUrl}
        alt={property.title}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary" gutterBottom>
          {formatPrice(property.price)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label={isFavorite ? "remove from favorites" : "add to favorites"}
          onClick={() => onClickFavorite(property.id)}
        >
          <FavoriteIcon color={isFavorite ? "error" : "action"} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* <ExpandMore expand={expanded} onClick={handleExpandClick} /> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }} variant="h6">
            Favorites:
          </Typography>
          {property.favorites.length > 0 ? (
            <Box>
              {property.favorites.map((favorite) => (
                <Typography key={favorite.id} sx={{ marginBottom: 1 }}>
                  • {favorite.user.username}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography sx={{ color: "text.secondary" }}>
              No favorites yet
            </Typography>
          )}
        </CardContent>
      </Collapse> */}
    </Card>
  );
};

export default PropertyCard;
