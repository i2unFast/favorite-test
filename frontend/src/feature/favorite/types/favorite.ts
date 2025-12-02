// Property type for favorite
export interface FavoriteProperty {
  id: number;
  title: string;
  imageUrl: string;
  location: string;
  price: number;
}

// Favorite type with property
export interface FavoriteWithProperty {
  id: number;
  userId: number;
  propertyId: number;
  property: FavoriteProperty;
}
