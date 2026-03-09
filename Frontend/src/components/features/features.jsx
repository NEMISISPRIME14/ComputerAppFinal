import React from "react";
import "./features.css";

const features = [
  {
    icon: "🔍",
    title: "Advanced Search",
    description:
      "Find your perfect property with our intelligent search filters and AI-powered recommendations",
  },
  {
    icon: "✅",
    title: "Verified Properties",
    description:
      "Every listing is thoroughly verified to ensure accuracy and prevent fraud",
  },
  {
    icon: "👨‍💼",
    title: "Expert Consultants",
    description:
      "Professional real estate advisors to guide you through every step of your journey",
  },
  {
    icon: "📱",
    title: "Mobile Experience",
    description:
      "Access our platform anytime, anywhere with our responsive design and mobile app",
  },
];

const highlights = [
  {
    image: "https://imageio.forbes.com/specials-images/imageserve/64c14767374908aa7616a7fe/happy-family-mother-father-and-children-at-home-on-couch/960x0.jpg?format=jpg&width=960",
    caption: "Happy Families – 50K+ families found their dream homes",
  },
  {
    image: "https://img.freepik.com/premium-photo/modern-house-with-beautiful-exterior-design_604472-24891.jpg",
    caption: "Modern Properties – Latest developments and luxury projects",
  },
  {
    image: "https://einstein-challenge.com/wp-content/uploads/2024/02/shutterstock_2056433831.jpg",
    caption: "Expert Service – Professional guidance every step",
  },
];


const Features = () => {
  return (
    <div className="features">
      <div className="features__container">
        {/* Left side */}
        <div className="features__left">
          <h2 className="features__title">Why Choose EasyHome?</h2>
          <p className="features__subtitle">
            Egypt’s most trusted real estate platform with unmatched expertise and service
          </p>
          <div className="features__list">
            {features.map((f, index) => (
              <button key={index} className="feature-item">
                <span className="feature-icon">{f.icon}</span>
                <div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="features__right">
          <div className="highlight-card large">
            <img src={highlights[0].image} alt={highlights[0].caption} />
            <p className="highlight-caption">{highlights[0].caption}</p>
          </div>
          <div className="highlight-row">
            {highlights.slice(1).map((h, index) => (
              <div key={index} className="highlight-card small">
                <img src={h.image} alt={h.caption} />
                <p className="highlight-caption">{h.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
