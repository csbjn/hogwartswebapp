import { Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import Gryffindor from "../../images/Gryffindor.png";
import Hufflepuff from "../../images/Hufflepuff.png";
import Ravenclaw from "../../images/Ravenclaw.png";
import Slytherin from "../../images/Slytherin.png";
import { useNavigate } from "react-router-dom";

export interface SortingEndProps  {
    house: string;
}

export const SortingEnd : FC<SortingEndProps>= ({ house }) => {

    const navigate = useNavigate();
    let message=`Gratulálok a ${house} házba lett beosztva`;

    
    const imageSelector = (): string => {
        if (house === "gryffindor") {
            return Gryffindor;
        } else if (house === "hufflepuff") {
            return Hufflepuff;
        } else if (house === "ravenclaw") {
            return Ravenclaw;
        }
        return Slytherin;
    }

    return(<Flex alignItems="center">
        <VStack sx={{marginX:"18%"}}>
            <Text mt="24px">{message}</Text>
            <Image src={imageSelector()} width="50%" height="50%"/>
            <Button sx={{
                color: "black",
                backgroundColor: "#ff5050",
                '&:hover': {
                    color: 'white',  
                    backgroundColor: "#ff5050"
                },
            }} mb="24px" mt="18px" onClick={() => {navigate("/")}}>Kilépés</Button>
        </VStack>
    </Flex>
    
    );
}
