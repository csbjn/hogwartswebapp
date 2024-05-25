import { User } from "../state/user";

export const getUserData = async () =>{
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/user', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    if(response.ok){
        const data: User = await response.json();
        return data.house;
    } else {
        throw new Error("There is no token");
    }
}