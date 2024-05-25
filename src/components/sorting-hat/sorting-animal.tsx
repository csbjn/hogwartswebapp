import { Button, Flex, Select, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";

export interface SortingAnimalProps {
    pushAnimal: ( value: string ) => void;
    pushElement: ( valule : string ) => void;
    pushSorting: ( value: string ) => void;
}

export const SortingAnimal : FC<SortingAnimalProps> = ({ pushAnimal, pushElement, pushSorting}) => {
    const [ selectedAnimal, setSelectedAnimal] = useState<string>("Badger");
    const [ selectedElement, setSelectedElement ] = useState<string>("Earth");

    const handleSelectChangeAnimal = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAnimal(event.target.value);
    }

    const handleSelectChangeElement = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedElement(event.target.value);
    }

    const buttonClick = () => {
        pushAnimal(selectedAnimal);
        pushElement(selectedElement);
        pushSorting("traits");
    }

    return(
        <Flex direction="column" alignItems="center">
            <Text sx = {{
                fontSize: "2xl",
                fontFamily: "George",
            }} mb="12px" mt="24px">
                Válasz állatot:
            </Text>
            <Select width="80%" onChange={handleSelectChangeAnimal}>
                <option value="Badger">Borz</option>
                <option value="Serpent">Kígyó</option>
                <option value="Lion">Oroszlán</option>
                <option value="Eagle">Sas</option>
            </Select>
            <Text sx = {{
                fontSize: "2xl",
                fontFamily: "George",
            }} mb="12px" mt="24px">
                Válasz elemet:
            </Text>
            <Select width="80%" onChange={handleSelectChangeElement}>
                <option value="Earth">Föld</option>
                <option value="Air">Levegő</option>
                <option value="Fire">Tűz</option>
                <option value="Water">Víz</option>
            </Select>
            <Button sx={{
                color: "black",
                backgroundColor: "#ff5050",
                '&:hover': {
                    color: 'white',  
                    backgroundColor: "#ff5050"
                  },
            }} mb="24px" mt="18px" onClick={buttonClick}>Tovább</Button>
        </Flex>
    );
}