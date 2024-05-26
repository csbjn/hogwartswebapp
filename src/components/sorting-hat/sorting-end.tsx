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
    let message;
    if(house === ""){
        message="Már egy meglévő házba be lett osztva!"
    } else{
        message=`Gratulálok a ${house} házba lett beosztva`;
    }
    
    const imageSelector = (): string => {
        if (house === "gryffindor") {
            return Gryffindor;
        } else if (house === "hufflepuff") {
            return Hufflepuff;
        } else if (house === "ravenclaw") {
            return Ravenclaw;
        } else if (house === "slytherin") {
            return Slytherin;
        } else {
            return "None"
        }
    }

    return(<Flex alignItems="center">
        <VStack sx={{marginX:"18%"}}>
            <Text mt="24px">{message}</Text>
            { imageSelector() === "None" ? <></> : 
                <Image src={imageSelector()} width="50%" height="50%"/>}
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
