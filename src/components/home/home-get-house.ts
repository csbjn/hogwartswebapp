import { User } from "../state/user";

export const getUserData = async () =>{
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/user', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    if(response.ok){
        console.log(response);
        const data: User = await response.json();
        console.log(data)
        return data.house;
    } else {
        throw new Error("There is no token");
    }
}