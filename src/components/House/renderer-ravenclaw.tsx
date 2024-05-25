import React from 'react';
import { houses } from './houses';

const HouseListRavenclaw: React.FC = () => {
  const ravenclawHouse = houses.find(house => house.houseId === 'ravenclaw');

  if (!ravenclawHouse) {
    return <div style={{ textAlign: 'center', color: 'red', fontSize: '18px', fontWeight: 'bold' }}>No Ravenclaw house found.</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
      <div style={{ margin: '20px', padding: '20px', border: '10px solid #1E90FF', borderRadius: '5px', textAlign: 'center' }}>
        <div key={ravenclawHouse.houseId}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{ravenclawHouse.name}</h2>
          <div style={{ margin: '0 auto', width: '150px', height: '150px', marginBottom: '10px' }}> {/* A kép középre igazítása */}
            <img 
              src={ravenclawHouse.image} 
              style={{ maxWidth: '100%', maxHeight: '100%' }} 
              alt={ravenclawHouse.name} 
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <p><strong>Common Room:</strong> {ravenclawHouse.commonRoom}</p>
            <p><strong>Animal:</strong> {ravenclawHouse.animal}</p>
            <p><strong>House Ghost:</strong> {ravenclawHouse.ghost}</p>
            <p><strong>Founder:</strong> {ravenclawHouse.founder}</p>
            <p><strong>Traits:</strong> {ravenclawHouse.traits.join(', ')}</p>
            <p><strong>House Colors:</strong> {ravenclawHouse.houseColors.join(', ')}</p>
            <p><strong>Current and Former Heads:</strong> {ravenclawHouse.heads.join(', ')}</p>
            <p><strong>Points:</strong> {ravenclawHouse.points}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseListRavenclaw;
