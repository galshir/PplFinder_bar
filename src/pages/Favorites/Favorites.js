import React from "react";
import Text from "components/Text";
import FavoritiesList from "components/FavoritiesList";
import { useFavoritesFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {
  const { favorites, isLoading, fetchUsersFavorites } = useFavoritesFetch();

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder - Favorites
          </Text>
        </S.Header>
        <FavoritiesList favorites={favorites} isLoading={isLoading} fetchUsersFavorites={fetchUsersFavorites} />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
