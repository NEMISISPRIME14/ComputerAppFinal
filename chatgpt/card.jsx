import React from 'react';
import styled from 'styled-components';
import './card.css';
import Button from '../button/button';


const Card = ({ title, description, imageUrl }) => {
  return (
    <div
      style={{
        width: 'auto',
        height: '500px',
        borderRadius: '8px',
        backgroundColor: '#141414',
        color: '#fff',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* https://th.bing.com/th/id/R.3878b0006589888e9f6dab1fef8c7556?rik=U3zYt33Uj9nWmg&riu=http%3a%2f%2fwww.sitesint.com%2fwp-content%2fuploads%2fSites-International-Project-Madinaty-Residential-01.jpg&ehk=BylqgCzWPJG%2f9RuBcOx9jS6doX38cOeqMRRrCG0KcG4%3d&risl=&pid=ImgRaw&r=0*/}
      <div
        style={{
          height: '400px',
          backgroundImage: `url(https://th.bing.com/th/id/R.3878b0006589888e9f6dab1fef8c7556?rik=U3zYt33Uj9nWmg&riu=http%3a%2f%2fwww.sitesint.com%2fwp-content%2fuploads%2fSites-International-Project-Madinaty-Residential-01.jpg&ehk=BylqgCzWPJG%2f9RuBcOx9jS6doX38cOeqMRRrCG0KcG4%3d&risl=&pid=ImgRaw&r=0)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* hello */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', flexGrow: 1 }}>
        <span style={{ fontSize: '28px', fontWeight: 'bold' }}>hello</span>
        <p style={{ fontSize: '19px', margin: 0 }}>madinty is so big and beautiful to have a such great communnity</p>

        {/* Button aligned right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Card;
