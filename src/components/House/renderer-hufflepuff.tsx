import React from 'react';
import { houses } from './houses';

const HouseListHufflepuff: React.FC = () => {
  const hufflepuffHouse = houses.find(house => house.houseId === 'hufflepuff');

  if (!hufflepuffHouse) {
    return <div style={{ textAlign: 'center', color: 'red', fontSize: '18px', fontWeight: 'bold' }}>No Hufflepuff house found.</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
      <div style={{ margin: '20px', padding: '20px', border: '10px solid #ecb939', borderRadius: '5px', textAlign: 'center' }}>
        <div key={hufflepuffHouse.houseId}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{hufflepuffHouse.name}</h2>
          <div style={{ margin: '0 auto', width: '150px', height: '150px', marginBottom: '10px' }}> {/* A kép középre igazítása */}
            <img 
              src={hufflepuffHouse.image} 
              style={{ maxWidth: '100%', maxHeight: '100%' }} 
              alt={hufflepuffHouse.name} 
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <p><strong>Common Room:</strong> {hufflepuffHouse.commonRoom}</p>
            <p><strong>Animal:</strong> {hufflepuffHouse.animal}</p>
            <p><strong>House Ghost:</strong> {hufflepuffHouse.ghost}</p>
            <p><strong>Founder:</strong> {hufflepuffHouse.founder}</p>
            <p><strong>Traits:</strong> {hufflepuffHouse.traits.join(', ')}</p>
            <p><strong>House Colors:</strong> {hufflepuffHouse.houseColors.join(', ')}</p>
            <p><strong>Current and Former Heads:</strong> {hufflepuffHouse.heads.join(', ')}</p>
            <p><strong>Points:</strong> {hufflepuffHouse.points}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseListHufflepuff;
