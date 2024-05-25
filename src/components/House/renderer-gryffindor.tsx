import React from 'react';
import { houses } from './houses';

const HouseListGryffindor: React.FC = () => {
  const gryffindorHouse = houses.find(house => house.houseId === 'gryffindor');

  if (!gryffindorHouse) {
    return <div style={{ textAlign: 'center', color: 'red', fontSize: '18px', fontWeight: 'bold' }}>No Gryffindor house found.</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
      <div style={{ margin: '20px', padding: '20px', border: '10px solid #ae0001', borderRadius: '5px', textAlign: 'center' }}>
        <div key={gryffindorHouse.houseId}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{gryffindorHouse.name}</h2>
          <div style={{ margin: '0 auto', width: '150px', height: '150px', marginBottom: '10px' }}> {/* A kép középre igazítása */}
            <img 
              src={gryffindorHouse.image} 
              style={{ maxWidth: '100%', maxHeight: '100%' }} 
              alt={gryffindorHouse.name} 
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <p><strong>Common Room:</strong> {gryffindorHouse.commonRoom}</p>
            <p><strong>Animal:</strong> {gryffindorHouse.animal}</p>
            <p><strong>House Ghost:</strong> {gryffindorHouse.ghost}</p>
            <p><strong>Founder:</strong> {gryffindorHouse.founder}</p>
            <p><strong>Traits:</strong> {gryffindorHouse.traits.join(', ')}</p>
            <p><strong>House Colors:</strong> {gryffindorHouse.houseColors.join(', ')}</p>
            <p><strong>Current and Former Heads:</strong> {gryffindorHouse.heads.join(', ')}</p>
            <p><strong>Points:</strong> {gryffindorHouse.points}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseListGryffindor;
