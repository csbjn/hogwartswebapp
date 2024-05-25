import React from 'react';
import { houses } from './houses';

const HouseListSlytherin: React.FC = () => {
  const slytherinHouse = houses.find(house => house.houseId === 'slytherin');

  if (!slytherinHouse) {
    return <div style={{ textAlign: 'center', color: 'red', fontSize: '18px', fontWeight: 'bold' }}>No Slytherin house found.</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
      <div style={{ margin: '20px', padding: '20px', border: '10px solid #008000', borderRadius: '5px', textAlign: 'center' }}>
        <div key={slytherinHouse.houseId}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{slytherinHouse.name}</h2>
          <div style={{ margin: '0 auto', width: '150px', height: '150px', marginBottom: '10px' }}> {/* A kép középre igazítása */}
            <img 
              src={slytherinHouse.image} 
              style={{ maxWidth: '100%', maxHeight: '100%' }} 
              alt={slytherinHouse.name} 
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <p><strong>Common Room:</strong> {slytherinHouse.commonRoom}</p>
            <p><strong>Animal:</strong> {slytherinHouse.animal}</p>
            <p><strong>House Ghost:</strong> {slytherinHouse.ghost}</p>
            <p><strong>Founder:</strong> {slytherinHouse.founder}</p>
            <p><strong>Traits:</strong> {slytherinHouse.traits.join(', ')}</p>
            <p><strong>House Colors:</strong> {slytherinHouse.houseColors.join(', ')}</p>
            <p><strong>Current and Former Heads:</strong> {slytherinHouse.heads.join(', ')}</p>
            <p><strong>Points:</strong> {slytherinHouse.points}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseListSlytherin;
