import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";


const UserList = ({ users, isLoading, fetchUsers }) => {
  const [hoveredUserId, setHoveredUserId]         = useState();
  const [selectFavoritUser, setSelectFavoritUser] = useState({});
  const [filterCheckObjct, setfilterCheckObjct]   = useState({});
  
  const [filterCheckBox, setFilterCheckBox]     = useState({
    "BR": {value: "BR", label: "Brazil", isChecked: false   },
    "AU": {value: "AU", label: "Australia", isChecked: false},
    "CA": {value: "CA", label: "Canada", isChecked: false   },
    "DE": {value: "DE", label: "Germany", isChecked: false  },
  });

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handeCheckBoxFilter = (e) => {
    const index = e;
    let items   = {...filterCheckBox};
    items[index].isChecked = items[index].isChecked === true ? false : true;
    setFilterCheckBox(items);

    //Send object if selected checkbox filter
    const filterObjectnat = Object.keys(items).filter((checkBox) => { return items[checkBox].isChecked === true });
    if(filterObjectnat.length !== 0) { fetchUsers({nat: filterObjectnat, results: 25, page: 1});setfilterCheckObjct({nat: filterObjectnat, results: 25, page: 1});} 
    else {fetchUsers();}
  };

  const handeSelectUserFavorit = (user) => {

    const favoritesData = JSON.parse(localStorage.getItem('favorites')) === null ? {} : JSON.parse(localStorage.getItem('favorites'));
    if(!selectFavoritUser.hasOwnProperty(user?.email) && !favoritesData.hasOwnProperty(user?.email)) {
      var items  = {...selectFavoritUser, ...favoritesData};
      items[user.email] = user;
    } else {
      var items = {...selectFavoritUser, ...favoritesData};
      delete items[user.email];
    }
    setSelectFavoritUser(items); 
    localStorage.setItem("favorites", JSON.stringify(items));

  }

  const handleScroll = (event) => { 
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;

    if(bottom){
        console.log('load more');
    }
}

  useEffect(() => {
  }, [selectFavoritUser, filterCheckObjct])

  return (
    <S.UserList>
      <S.Filters>
        {Object.keys(filterCheckBox).map((checkBox, index) => {
          return (
            <CheckBox 
              key={index}
              onChange={(event) => handeCheckBoxFilter(event)} 
              isChecked={filterCheckBox[checkBox].isChecked} 
              value={filterCheckBox[checkBox].value} 
              label={filterCheckBox[checkBox].label}
             />
          );
        })}
      </S.Filters>
      <S.List onScroll={handleScroll}>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                onClick={() => handeSelectUserFavorit(user)}
                isVisible={index === hoveredUserId || selectFavoritUser.hasOwnProperty(user?.email)}
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
    </S.UserList>
  );
};

export default UserList;
