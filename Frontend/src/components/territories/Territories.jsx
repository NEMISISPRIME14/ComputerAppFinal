import React from "react";
import Button from "../button/button"; // reuse your button
import "./Territories.css"; // create this CSS file for styling



const Territories = () => {
  return (
    <div className="territories">
      <h2 className="territories__title">Popular Compounds</h2>
      <div className="territories__list">
        <div className="territory-card">
          <div className="territory-card__image" style={{ backgroundImage: "url('https://assets-global.website-files.com/6565eeb2bb9144961794b0d3/66337a84fd6cc82651f67af1_The_Mayor_8.4.3_2-p-2600.jpg')" }}></div>
          <div className="territory-card__content">
            <div>
              <h3 className="territory-card__title">Shorouk City Compounds</h3>
              <p className="territory-card__stats">663 Units • 76 Projects</p>
              <p className="territory-card__desc">Best El Shorouk Compound. El Shorouk City is one of the most beautiful and peaceful third-generation cities...</p>
            </div>
            <button className="territory-card__button">MORE DETAILS</button>
          </div>
        </div>

        <div className="territory-card">
          <div className="territory-card__image" style={{ backgroundImage: "url('https://tse4.mm.bing.net/th/id/OIP.bid8uIW8xmJxmIEK8xyGmAHaEB?w=1335&h=726&rs=1&pid=ImgDetMain&o=7&rm=3')" }}></div>
          <div className="territory-card__content">
            <div>
              <h3 className="territory-card__title">New Cairo Compounds</h3>
              <p className="territory-card__stats">9,009 Units • 756 Projects</p>
              <p className="territory-card__desc">The best compound in New Cairo. New Cairo is one of the most prestigious residential neighborhoods...</p>
            </div>
            <button className="territory-card__button">MORE DETAILS</button>
          </div>
        </div>

        <div className="territory-card">
          <div className="territory-card__image" style={{ backgroundImage: "url('https://vikingheliskiing.com/wp-content/uploads/2024/09/svart-lodge-credit-donal-boyd-63.jpeg')" }}></div>
          <div className="territory-card__content">
            <div>
              <h3 className="territory-card__title">New Capital Compounds</h3>
              <p className="territory-card__stats">10,254 Units • 667 Projects</p>
              <p className="territory-card__desc">The best compound in New Administrative Capital. Egypt's newest real estate and investment development project...</p>
            </div>
            <button className="territory-card__button">MORE DETAILS</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Territories;
