import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";


const UserList = ({ favorites, isLoading, fetchUsersFavorites }) => {
  const [hoveredUserId, setHoveredUserId] = useState();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handeRemoveUserFavorit = (user) => {
    const favoritesData = JSON.parse(localStorage.getItem('favorites')) === null ? {} : JSON.parse(localStorage.getItem('favorites'));
    if(favoritesData.hasOwnProperty(user?.email)) { var items = {...favoritesData}; delete items[user.email];}
    localStorage.setItem("favorites", JSON.stringify(items));
    fetchUsersFavorites();
  }

  return (
    <S.FavoritiesList>
      
      <S.List>
        {Object.keys(favorites).map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={favorites[user]?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {favorites[user]?.name.title} {favorites[user]?.name.first} {favorites[user]?.name.last}
                </Text>
                <Text size="14px">{favorites[user]?.email}</Text>
                <Text size="14px">
                  {favorites[user]?.location.street.number} {favorites[user]?.location.street.name}
                </Text>
                <Text size="14px">
                  {favorites[user]?.location.city} {favorites[user]?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                onClick={() => handeRemoveUserFavorit(favorites[user])}
                isVisible={index === hoveredUserId}
               >
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.FavoritiesList>
  );
};

export default UserList;
