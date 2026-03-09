import React, { useState, useMemo } from "react";
import "./ProfileOverlay.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import LocationMap from "../Map/LocationMap";

// somewhere in JSX
<LocationMap />

const HALF_H = 460;   // taller default form
const FULL_H = 460;   // keep expanded height same

function OptionCard({ option, isHovered, fast }) {
  return (
    <motion.div
      className="pp-card"
      animate={{ height: isHovered ? FULL_H : HALF_H }}
      transition={{duration: fast ? 0.18 : 0.5,ease: fast ? [0.2, 0.9, 0.2, 1] : [0.25, 0.46, 0.45, 0.94],}}
    >
      <img
        src={option.src}
        alt={option.label}
        draggable={false}
        className="pp-img"
        style={{ height: FULL_H }}
      />

      <div className="pp-gradient" />

      <motion.div
        className="pp-labelWrap"
        animate={{ opacity: isHovered ? 1 : 0.5, y: isHovered ? 0 : 8 }}
        transition={{ duration: 0.3 }}
      >
        <span className="pp-label">{option.label}</span>
      </motion.div>

      <motion.div
        className="pp-glow"
        animate={{
          boxShadow: isHovered
            ? "inset 0 0 0 2px rgba(255,255,255,0.5)"
            : "inset 0 0 0 0px rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
}

export default function ProfileOverlay({ open, onClose, navbarHeight = 109 }) {
  const [hovered, setHovered] = useState(null);

  // ✅ change these to your real routes + images (put images in /public/profile/)
  const OPTIONS = useMemo(
    () => [
      { id: 0, src: "/src/assets/sowar/certificate.png", label: "CERTIFICATE", to: "/home/certificate" },
      { id: 1, src: "/src/assets/sowar/track process.png", label: "TRACK PROCESS", to: "/home/track" },
      { id: 2, src: "/src/assets/sowar/your profile.png", label: "YOUR PROFILE", to: "/home/profile-management" },
    ],
    []
  );

  const anyHovered = hovered !== null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="pp-overlay"
          style={{ top: navbarHeight }}
          onClick={() => {
            setHovered(null);
            onClose();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="pp-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="pp-row" style={{ height: FULL_H }}>
              {OPTIONS.map((opt) => {
                const isHov = hovered === opt.id;
                const grow = anyHovered ? (isHov ? 100 : 0) : 1;
                const cardOpacity = anyHovered && !isHov ? 0 : 1;

                return (
                  <motion.div
                    key={opt.id}
                    className="pp-col"
                    initial={{ flexGrow: 1, opacity: 0 }}
                    animate={{ flexGrow: grow, opacity: cardOpacity }}
                   transition={{
                    flexGrow: {
                      duration: opt.id === 1 ? 0.18 : 0.5,
                      ease: opt.id === 1 ? [0.2, 0.9, 0.2, 1] : [0.25, 0.46, 0.45, 0.94],
                    },
                    opacity: { duration: opt.id === 1 ? 0.12 : 0.3 },
                  }}
                    onHoverStart={() => setHovered(opt.id)}
                    onHoverEnd={() => setHovered(null)}
                  >
                    <Link to={opt.to} onClick={onClose} className="pp-link">
                      <OptionCard option={opt} isHovered={isHov} fast={opt.id === 1} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}