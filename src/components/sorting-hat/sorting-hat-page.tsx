import React, { useEffect, useState } from "react";
import { SortingColor } from "./sorting-color";
import { SortingAnimal } from "./sorting-animal";
import { SortingTraits } from "./sorting-traits";
import { SortingStart } from "./sorintg-start";
import { Box } from "@chakra-ui/react";
import { SortingEnd } from "./sorting-end";

export const  SortingHatPage = () => {

    const [ sorting, setSorting ] = useState<string>("start");
    const [ color, setColor ] = useState<string[]>();
    const [ animal, setAnimal ] = useState<string>();
    const [ element, setElement ] = useState<string>();
    const [ traits, setTraits ] = useState<string[]>();
    const [ house, setHouse ] = useState<string>("");

    useEffect(() => {
        if(sorting === "end"){
            console.log({ color, animal, element, traits});
            const authToken = localStorage.getItem('token');
            console.log(authToken);
            const putSortingData = async () => {
                const response = await fetch("http://localhost:5000/sorting-hat", {
                    method: 'PUT',
                    headers: {  'accpet': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({ color, animal, element, traits})
                })
                if(!response.ok){
                    throw new Error (response.status === 401 ? 'Unauthorized' : 'Tanuló már be van osztva');
                }
                const result = await response.json();
                console.log(result);
                setHouse(result.house);
                setSorting("done");

            }
            putSortingData();   

            /*
            setHouse("gryffindor");
            setSorting("done");*/
            //Adatok modósítása
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
                { sorting === "start" ? <SortingStart pushSorting={setSorting}/> : <></>}
                { sorting === "color" ? <SortingColor pushColor={setColor} pushSorting={setSorting}/> : <></>}
                { sorting === "element" ? <SortingAnimal pushAnimal={setAnimal} pushElement={setElement} pushSorting={setSorting}/> : <></>}
                { sorting === "traits" ? <SortingTraits pushTraits={setTraits} pushSorting={setSorting}/> : <></>}
                { sorting === "done" ? <SortingEnd house={house}/> : <></>}
         </Box>
}