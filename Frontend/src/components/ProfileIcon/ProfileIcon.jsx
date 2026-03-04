import { useState } from "react";
import "./ProfileIcon.css";
import profileImage from "../../assets/sowar/profile.png"; // change to your image

export default function ProfileIcon() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`profileWrapper ${hovered ? "expanded" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={profileImage} alt="Profile" className="profileImage" />

      <div className="iconGroup">
        <button className="iconBtn">✎</button>
        <button className="iconBtn">⚙</button>
        <button className="iconBtn">⇦</button>
      </div>
    </div>
  );
}