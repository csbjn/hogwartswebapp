import React, { FC, useContext } from "react";
import { House } from "../state/house";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { HouseContext } from "../context/house-context";
import { Link } from "react-router-dom";
import Gryffindor from "../../images/Gryffindor.png";
import Hufflepuff from "../../images/Hufflepuff.png";
import Ravenclaw from "../../images/Ravenclaw.png";
import Slytherin from "../../images/Slytherin.png";

export interface HouseItemProps {
  house: House;
}

export const HouseItem: FC<HouseItemProps> = ({ house }) => {

  const context = useContext(HouseContext);
  if (!context) {
    throw new Error("MyComponent must be used within a UserProvider");
  }
  const { userHouse, setUserHouse } = context;
  
  const logged = (): boolean => {
    if(userHouse === "" || userHouse === undefined){
      return false;
    };  
    return true;
  };
  
  const userLogged: boolean = logged();

  
  const imageSelector = (): string => {
    if (house.houseId === "gryffindor") {
      return Gryffindor;
    } else if (house.houseId === "hufflepuff") {
      return Hufflepuff;
    } else if (house.houseId === "ravenclaw") {
      return Ravenclaw;
    }
    return Slytherin;
  };

  const highlightStyles = {
    borderColor: "gold",
    borderWidth: "4px",
    boxShadow: "0 0 10px gold"
  };

  const notHighlightedStyles = {
    borderColor: "gray",
    borderWidth: "3px",
    boxShadow: "0 0 10px gray"
  };

  const colorMapping: { [key: string]: string } = {
    gryffindor: "red",
    hufflepuff: "yellow",
    ravenclaw: "blue",
    slytherin: "green"
  };

  const textColor = colorMapping[house.houseId] || "black";
  const isUserHouse = house.houseId === userHouse;

  return (
    
    <Box
      backgroundColor="#999966"
      border="2px"
      borderRadius="128px"
      width="20%"
      sx={isUserHouse ? highlightStyles : notHighlightedStyles}
      mt="32px"
    >
      <VStack>
        <Text color={textColor} >{house.name}</Text>
        <Link to={`/house/${house.houseId}`}>
          <Image src={imageSelector()} alt={house.name} width="50%" height="50%" marginX="auto" />
        </Link>
      
        {userLogged ? <Text color={textColor}>{house.points}</Text> : <Text paddingY="12px" />}
      </VStack>
    </Box>
    
  );
};