import React, { useContext, useEffect, useState } from "react";
import { SortingColor } from "./sorting-color";
import { SortingAnimal } from "./sorting-animal";
import { SortingTraits } from "./sorting-traits";
import { SortingStart } from "./sorintg-start";
import { Box } from "@chakra-ui/react";
import { SortingEnd } from "./sorting-end";
import { HouseContext } from "../context/house-context";

export const  SortingHatPage = () => {

    const context = useContext(HouseContext);
    if (!context) {
        throw new Error("MyComponent must be used within a UserProvider");
    }
    const { userHouse, setUserHouse } = context;

    const [ sorting, setSorting ] = useState<string>("start");
    const [ color, setColor ] = useState<string[]>();
    const [ animal, setAnimal ] = useState<string>();
    const [ element, setElement ] = useState<string>();
    const [ traits, setTraits ] = useState<string[]>();

    useEffect(() => {
        if(sorting === "end"){
            const authToken = localStorage.getItem('token');
            const putSortingData = async () => {
                const response = await fetch("http://localhost:5000/sorting-hat", {
                    method: 'PUT',
                    headers: {  'accpet': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({ color, animal, element, traits})
                })
                if(response.ok){
                    const result = await response.json();
                    setUserHouse(result.house);
                    setSorting("done");
                } else {
                    console.log("Error");
                }
            }
            putSortingData();   
        }
    }, [sorting, setSorting])

    return <Box sx={{
        maxWidth: "500",   
            maxHeight: "600",  
            marginX: "auto",
            marginTop: "200px",
            border: "5px solid",
            borderColor: "#ff5050",
            borderRadius: "24px"
            }} >
                { userHouse ? <>
                { sorting === "start" ? <SortingStart pushSorting={setSorting}/> : <></>}
                { sorting === "color" ? <SortingColor pushColor={setColor} pushSorting={setSorting}/> : <></>}
                { sorting === "element" ? <SortingAnimal pushAnimal={setAnimal} pushElement={setElement} pushSorting={setSorting}/> : <></>}
                { sorting === "traits" ? <SortingTraits pushTraits={setTraits} pushSorting={setSorting}/> : <></>}
                { sorting === "done" ? <SortingEnd house={userHouse}/> : <></>} : </>
                : 
                <SortingEnd house={userHouse}/>
                }
         </Box>
}