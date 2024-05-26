import { Box, Button, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HouseContext } from '../context/house-context';
import { getUserData } from './home-get-house';
import LoginForm from '../profile/login-form';
import { HouseList } from '../houses/houses-list';

const HomePage = () => {
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const context = useContext(HouseContext);
    if (!context) {
        throw new Error("MyComponent must be used within a UserProvider");
    }
    const { userHouse, setUserHouse } = context;

    const [isLogged, setIsLogged] = useState<boolean>(userHouse === "" ? false : true);

    useEffect(() => {
        if(token){
            getUserData()
                .then((houseData) => {
                    setUserHouse(houseData ? houseData : "None");
                })
                .catch((error) => {
                    console.error(error);
            });      
        }     
    }, [])

    return <Box>
        <VStack>
            <HouseList/>
            { isLogged 
                ? <></>
                : <LoginForm/>}
        </VStack>
    </Box>  
};

export default HomePage;
