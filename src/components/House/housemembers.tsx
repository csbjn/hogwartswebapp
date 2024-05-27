import React, { useEffect, useState } from 'react';
import { Spinner, Alert, AlertIcon, Button, Stack, Input } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import Gryffindor from "../../images/Gryffindor.png";
import Hufflepuff from "../../images/Hufflepuff.png";
import Ravenclaw from "../../images/Ravenclaw.png";
import Slytherin from "../../images/Slytherin.png";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface House {
  houseId: string;
  name: string;
  points: number;
  image: string;
}

const HouseMembers: React.FC = () => {
  const { houseId } = useParams<{ houseId: string }>();
  const navigate = useNavigate();
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [house, setHouse] = useState<House | null>(null);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate(`/houses/${houseId}`);
          return;
        }

        const houseResponse = await fetch(`http://localhost:5000/houses/${houseId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!houseResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const houseData: House = await houseResponse.json();
        setHouse(houseData);

        const membersResponse = await fetch(`http://localhost:5000/houses/${houseId}/members`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!membersResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const membersData: User[] = await membersResponse.json();
        setMembers(membersData.sort((a, b) => a.firstName.localeCompare(b.firstName)));
      } catch (error) {
        setError("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    fetchHouseData();
  }, [houseId, navigate]);

  const handleSearch = () => {
    setSearch(searchText);
    setCurrentPage(1); 
  };

  const filteredMembers = members.filter(member =>
    member.firstName.toLowerCase().includes(search.toLowerCase()) ||
    member.lastName.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  if (loading) {
    return <Spinner size="xl" />;
  }

  const imageSelector = (): string => {
    if (house?.houseId === "gryffindor") {
      return Gryffindor;
    } else if (house?.houseId === "hufflepuff") {
      return Hufflepuff;
    } else if (house?.houseId === "ravenclaw") {
      return Ravenclaw;
    }
    return Slytherin;
  };

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse', maxWidth: '500px', borderStyle: "double" }}>
        <tbody>
          <tr>
            <td style={{ padding: '10px' }} colSpan={2}>
              <img src={imageSelector()} alt={house?.name} style={{ maxWidth: '30%', height: 'auto', marginLeft: '120px', marginTop: '20px' }} />
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>Name:</strong></td>
            <td style={{ padding: '10px' }}>{house?.name}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>Points:</strong></td>
            <td style={{ padding: '10px' }}>{house?.points}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'left', padding: '10px' }}>
              <Stack spacing={4} direction="row" justifyContent="center" alignItems="center">
                <Input
                  placeholder="Search by Name or Email"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  width="220px"
                />
                <Button colorScheme="yellow" textColor="black" onClick={handleSearch}>
                  Keresés
                </Button>
              </Stack>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>Tagok</strong></td>
          </tr>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2', minWidth: '140px' }}>Keresztnév</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Vezetéknév</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Email</th>
          </tr>
          {paginatedMembers.map(member => (
            <tr key={member.userId}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{member.firstName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{member.lastName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              padding: '10px',
              margin: '5px',
              backgroundColor: currentPage === index + 1 ? '#007bff' : '#ffffff',
              color: currentPage === index + 1 ? '#ffffff' : '#000000',
              border: '1px solid #007bff',
              borderRadius: '5px',
              cursor: 'pointer'

            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => navigate(`/houses/${houseId}`)}>Ház részletei</button>
      </div>
    </div>
  );
};

export default HouseMembers;
