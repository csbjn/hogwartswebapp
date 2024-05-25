import { Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

export interface SortingStartProps {
    pushSorting: ( value : string ) => void;
}

export const SortingStart: FC<SortingStartProps> = ({ pushSorting }) => {

    return(<Flex justifyContent="center">
        <VStack>
            <Text sx = {{
                fontSize: "3xl",
                fontFamily: "George",
            }} mb="32px" mt="24px">
                Teszlek süveg kérdőív
            </Text>
            <Button sx={{
                color: "black",
                backgroundColor: "#ff5050",
                '&:hover': {
                    color: 'white',  
                    backgroundColor: "#ff5050"
                  },
            }} mb="24px" onClick={() => { pushSorting("color")}}>Kezdés</Button>
        </VStack>
    </Flex>);
}