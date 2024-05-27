import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Gryffindor from "../../images/Gryffindor.png";
import Hufflepuff from "../../images/Hufflepuff.png";
import Ravenclaw from "../../images/Ravenclaw.png";
import Slytherin from "../../images/Slytherin.png";

interface House {
  houseId: string;
  name: string;
  image: string;
  commonRoom: string;
  animal: string;
  ghost: string;
  founder: string;
  traits: string[];
  houseColors: string;
  heads: { firstName: string; lastName: string }[];
  points: number;
}

const HouseDetails = () => {
  const { houseId } = useParams();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/houses/${houseId}`);
        if (!response.ok) {
          throw new Error('House not found');
        }
        const data = await response.json();
        setHouse(data);
      } catch (error) {
        setError("You probably gave a bad house id");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchHouseDetails();
  }, [houseId, navigate]);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!house) {
    return <p>House not found</p>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse', maxWidth: '500px', borderStyle: "double" }}>
        <tbody>
          <tr>
            <td style={{ padding: '10px' }} colSpan={2}>
              <img src={imageSelector()} alt={house.name} style={{ maxWidth: '20%', height: 'auto', marginLeft: '120px', marginTop: '20px' }} />
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>Name:</strong></td>
            <td style={{ padding: '10px' }}>{house.name}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>Common Room:</strong></td>
            <td style={{ padding: '10px' }}>{house.commonRoom}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>Animal:</strong></td>
            <td style={{ padding: '10px' }}>{house.animal}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>Ghost:</strong></td>
            <td style={{ padding: '10px' }}>{house.ghost}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>Founder:</strong></td>
            <td style={{ padding: '10px' }}>{house.founder}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>Traits:</strong></td>
            <td style={{ padding: '10px' }}>{house.traits ? house.traits.join(', ') : 'Unknown'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>House Colors:</strong></td>
            <td style={{ padding: '10px' }}>{house.houseColors}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '10px' }}><strong>Current Heads:</strong></td>
            <td style={{ padding: '10px' }}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {house.heads.map((head, index) => (
                  <li key={index}>{head.firstName} {head.lastName}</li>
                ))}
              </ul>
            </td>
          </tr>
          {token && (
            <tr>
              <td style={{ textAlign: 'left', padding: '10px' }}><strong>Points:</strong></td>
              <td style={{ padding: '10px' }}>{house.points}</td>
            </tr>
          )}
          <tr>
            <td>
              <Link to={`/`}>
                <button style={{ margin: '20px' }}>Házak</button>
              </Link>
            </td>
            {token && (
              <td>
                <Link to={`/houses/${houseId}/members`}>
                  <button style={{ margin: '20px' }}>Tagok</button>
                </Link>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HouseDetails;
