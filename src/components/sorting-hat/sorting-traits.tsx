import { Box, Button, Checkbox, CheckboxGroup, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React, { FC, useState } from "react";

export interface SortingTraitsProps {
    pushTraits: ( value: string[]) => void;
    pushSorting: ( value: string) => void;
}

export const SortingTraits :FC<SortingTraitsProps> = ({ pushTraits, pushSorting}) => {

    const [ checkedValue, setCheckedValue ] = useState<string []>([]);
    const [ isFilled, setIsFilled ] = useState<boolean>(false);
    
    const handleCheckboxChange = ( values: string[]) => {
        setCheckedValue(values);
        if( values.length >= 1) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }

    const buttonClick = () => {
        pushTraits(checkedValue);
        pushSorting("end");
    }

    return <Box>
        <Text sx = {{
        fontSize: "2xl",
        fontFamily: "George",
        }} mb="12px" mt="24px" ml="180" mr="auto">
            Válasz erényt:
        </Text>
        <CheckboxGroup value={checkedValue} onChange={handleCheckboxChange}>
            <HStack>
                <Box sx={{
                    float: "left",
                    width: "33%"
                    }}>
                    <VStack>
                        <Checkbox value="Ambition" ml="50px" mr= "auto">Ambíció</Checkbox>
                        <Checkbox value="Courage" ml="50px" mr= "auto">Bátorság</Checkbox>
                        <Checkbox value="Wisdom" ml="50px" mr= "auto">Bölcsesség</Checkbox>
                        <Checkbox value="Pride" ml="50px" mr= "auto">Büszkeség</Checkbox>
                        <Checkbox value="Hardworking" ml="50px" mr= "auto">Dolgosság</Checkbox>
                        <Checkbox value="Acceptance" ml="50px" mr= "auto">Elfogadás</Checkbox>
                        <Checkbox value="Determination" ml="50px" mr= "auto">Eltökéltség</Checkbox>
                        <Checkbox value="Wit" ml="50px" mr= "auto">Ész</Checkbox>
                    </VStack>
                </Box>
                <Box sx={{
                    float: "left",
                    width: "33%"
                    }}>
                    <VStack>           
                        <Checkbox value="Loyalty" ml="15px" mr= "auto">Hűség</Checkbox>
                        <Checkbox value="Just" ml="15px" mr= "auto">Igazság</Checkbox>
                        <Checkbox value="Inteligence" ml="15px" mr= "auto">Intelligencia</Checkbox>
                        <Checkbox value="Chivalary" ml="15px" mr= "auto">Lovagiasság</Checkbox>
                        <Checkbox value="Creativity" ml="15px" mr= "auto">Kreativitás</Checkbox>
                        <Checkbox value="Fairness" ml="15px" mr= "auto">Méltányosság</Checkbox>
                        <Checkbox value="Bravery" ml="15px" mr= "auto">Merészség</Checkbox>
                    </VStack>                   
                </Box>
                <Box sx={{
                    float: "left",
                    width: "33%"
                    }}>                  
                    <VStack>
                        <Checkbox value="Nerve" ml="0px" mr= "auto">Mersz</Checkbox>
                        <Checkbox value="Selfpreservation" ml="0px" mr= "auto">Önvédelem</Checkbox>
                        <Checkbox value="Cunning" ml="0px" mr= "auto">Ravaszság</Checkbox>
                        <Checkbox value="Modesty" ml="0px" mr= "auto">Szerénység</Checkbox>
                        <Checkbox value="Resourcefulness" ml="0px" mr= "auto">Találékonyság</Checkbox>
                        <Checkbox value="Learning" ml="0px" mr= "auto">Tanulás</Checkbox>
                        <Checkbox value="Daring" ml="0px" mr= "auto">Törödés</Checkbox>
                        <Checkbox value="Paitence" ml="0px" mr= "auto">Türelem</Checkbox>
                    </VStack>
                </Box>
            </HStack>
    </CheckboxGroup>
    <Button sx={{
        color: "black",
        backgroundColor: "#ff5050",
        '&:hover': {
          color: 'white',  
          backgroundColor: "#ff5050"
          },
        }} mb="24px" mt="18px" ml="200" mr="auto"onClick={buttonClick} isDisabled={!isFilled}>Tovább</Button>
    </Box>
}