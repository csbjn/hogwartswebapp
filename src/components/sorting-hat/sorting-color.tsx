import React, { useState, FC } from 'react';
import { Box, Button, Checkbox, CheckboxGroup, Flex, HStack, Text, VStack } from '@chakra-ui/react';

export interface SortingColorProps {
    pushColor: ( value: string []) => void;
    pushSorting: (value: string) => void;
} 

export const SortingColor: FC<SortingColorProps> = ({ pushColor, pushSorting }) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [ isFilled, setIsFilled] = useState<boolean>(false);

  const handleCheckboxChange = (values: string[]) => {
    if (values.length <= 3) {
      setCheckedValues(values);
    } 
    if (values.length >= 1){
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };

  const buttonClick = () => {
      pushColor(checkedValues);
      pushSorting("element");
  }

  return (
    <Box >
      <Text sx = {{
        fontSize: "2xl",
        fontFamily: "George",
        
      }} mb="12px" mt="24px" ml="180" mr="auto">
        Válassz színt
      </Text>
      <CheckboxGroup value={checkedValues} onChange={handleCheckboxChange}>
        <HStack>
        <Box sx={{
            float: "left",
            width: "50%"
          }}>
          <VStack>
            <Checkbox value="Black" colorScheme="blackAlpha" ml="100px" mr= "auto">Fekete</Checkbox>
            <Checkbox value="Blue" colorScheme="blue" ml="100px" mr= "auto">Kék</Checkbox>
            <Checkbox value="Bronze" colorScheme="teal" ml="100px" mr= "auto">Bronz</Checkbox>
            <Checkbox value="Gold" colorScheme="orange" ml="100px" mr= "auto">Arany</Checkbox>
          </VStack>
          </Box>
          <Box sx={{
            float: "left",
            width: "50%"
          }}>
          <VStack>
            <Checkbox value="Green" colorScheme="green" ml="50px" mr= "auto">Zöld</Checkbox>
            <Checkbox value="Scarlet" colorScheme="red" ml="50px" mr= "auto">Skarlátvörös</Checkbox>
            <Checkbox value="Silver" colorScheme="gray" ml="50px" mr= "auto">Ezüst</Checkbox>
            <Checkbox value="Yellow" colorScheme="yellow" ml="50px" mr= "auto">Sárga</Checkbox>
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
  );
};


