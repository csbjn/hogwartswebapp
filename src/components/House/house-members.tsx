import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { members } from './members'; // Import the members array
import { Member } from './types';

const HouseMembers: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const { houseId } = useParams<{ houseId: string }>();
  const navigate = useNavigate();
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    // Filter members based on the selected houseId
    const filtered = members.filter(member => member.studentHouse === houseId);
    setFilteredMembers(filtered);
  }, [houseId]); // Re-run effect when houseId changes

  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Calculate start index for pagination
  const startIndex = (page - 1) * itemsPerPage;

  // Paginate filtered members
  const paginatedMembers = filteredMembers
    .filter(member =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startIndex, startIndex + itemsPerPage);

  // Define the house names and URLs
  const houses = [
    { name: 'Gryffindor', url: '/houses/gryffindor/members' },
    { name: 'Slytherin', url: '/houses/slytherin/members' },
    { name: 'Hufflepuff', url: '/houses/hufflepuff/members' },
    { name: 'Ravenclaw', url: '/houses/ravenclaw/members' },
  ];

  // Filter out the current house
  const otherHouses = houses.filter(house => house.name.toLowerCase() !== houseId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Members of {houseId}</h1>
      <input
        type="text"
        placeholder="Search by Name or Email"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <div>
        {paginatedMembers.map(member => (
          <div key={member.userId} style={{ marginBottom: '10px' }}>
            <p>{member.firstName} {member.lastName}</p>
            <p>{member.email}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {otherHouses.map(house => (
          <button
            key={house.name}
            onClick={() => navigate(house.url)}
            style={{ marginRight: '10px' }}
          >
            {house.name} Members
          </button>
        ))}
      </div>
    </div>
  );
};

export default HouseMembers;
