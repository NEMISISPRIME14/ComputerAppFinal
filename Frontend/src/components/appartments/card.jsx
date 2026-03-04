import React from "react";
import "./card.css";
import Button from "../button/button";

const apartments = [
  {
    title: "Madinaty",
    description: "Madinaty is so big and beautiful to have such a great community.",
    image:
      "https://th.bing.com/th/id/R.3878b0006589888e9f6dab1fef8c7556?rik=U3zYt33Uj9nWmg&riu=http%3a%2f%2fwww.sitesint.com%2fwp-content%2fuploads%2fSites-International-Project-Madinaty-Residential-01.jpg&ehk=BylqgCzWPJG%2f9RuBcOx9jS6doX38cOeqMRRrCG0KcG4%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    title: "New Cairo",
    description: "Premium projects, modern living, and everything close to you.",
    image:
      "https://images.adsttc.com/media/images/5a60/784b/f197/cc7f/1b00/0078/large_jpg/24.jpg?1516279867",
  },
  {
    title: "New Capital",
    description: "Smart city lifestyle with large green spaces and luxury zones.",
    image:
      "https://images.adsttc.com/media/images/5f2a/1f6d/b357/652d/4a00/00f3/large_jpg/5.jpg?1596591941",
  },
];

export default function Card() {
  return (
    <div className="scroll-container">
      <div className="apartment-cards-container scroll-1">
        {apartments.map((apt, idx) => (
          <div className="card" key={idx}>
            <div
              className="card__image"
              style={{ backgroundImage: `url(${apt.image})` }}
            />
            <div className="card__content">
              <span className="card__title">{apt.title}</span>
              <p className="card__describe">{apt.description}</p>

              <div className="button-container">
                <Button />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}