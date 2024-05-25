import React, { FC, useContext, useEffect, useState } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { House } from "../state/house";
import { HouseItem } from "./houses-item";
import { HouseContext } from "../context/house-context";

export const HouseList = () => {

    const [houses, setHouses] = useState<House[]>([]);

    useEffect(() => {
        const getHouses = async () => {
            const response = await fetch("http://localhost:5000/houses");
            setHouses(await response.json());
        }
        getHouses();
    }, [])

    return <HStack marginLeft={200}>
        {houses.map(( houseItem : House ) => {  
            return <HouseItem house={houseItem}/>
        })}
    </HStack>
}