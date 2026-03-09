import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ArrowRight,
  Edit2,
  X,
  Heart,
  Check,
  Pencil,
  MapPin,
  Phone,
  Mail,
  UserCircle2,
} from "lucide-react";

import "./ProfileManagement.css";

import bgImg from "../../assets/sowar/f78b0cdd7556128889da58c88bdff8e0ea22dada.png";
import logoImg from "../../assets/sowar/b4b5763e106eda6831f372a4943db19410d47e2d.png";
import blurImg from "../../assets/sowar/3ba68ebca794d6d97d617807d5448758406dcbad.png";
import textureImg from "../../assets/sowar/7007946560060ca9880e8e9ffd6e2658f2bc6c6b.png";

import AddCardModal from "./AddCardModal";

// ---- Toggle Switch ----
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`pm-toggle ${checked ? "isOn" : ""}`}
    type="button"
  >
    <div className="pm-toggleKnob" />
  </button>
);

// ---- Animated Wave Line ----
const AnimatedWave = () => {
  const w = 66;
  const path =
    "M0 11 C4 5, 8 17, 11 11 C14 5, 17 17, 22 11 C25 5, 29 17, 33 11 C36 5, 40 17, 44 11 C47 5, 51 17, 55 11 C58 5, 62 17, 66 11";
  return (
    <div className="pm-waveWrap">
      <motion.div
        className="pm-waveMove"
        animate={{ x: [0, -w] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      >
        <svg width={w * 2} height={22} viewBox={`0 0 ${w * 2} 22`} fill="none">
          <path d={path} stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path
            d={path}
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            transform={`translate(${w}, 0)`}
          />
        </svg>
      </motion.div>
    </div>
  );
};

const StaticStraightLine = () => (
  <div className="pm-straightWrap">
    <div className="pm-straightLine" />
  </div>
);

// ---- Mastercard Icon ----
const MastercardIcon = () => (
  <div className="pm-masterIcon">
    <svg width="21" height="13.3" viewBox="0 0 21 13.3" fill="none">
      <circle cx="6.63" cy="6.63" r="6.63" fill="#EB001B" />
      <circle cx="14.37" cy="6.63" r="6.63" fill="#F79E1B" />
    </svg>
  </div>
);

// ---- User Avatar SVG ----
const AvatarIcon = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 49 49" fill="none">
    <circle cx="24.5" cy="24.5" r="24.5" fill="#9A9A9A" />
    <ellipse cx="24.5" cy="40.425" rx="15.925" ry="8.575" fill="white" />
    <ellipse cx="24.5" cy="21.4375" rx="8.575" ry="7.9625" fill="white" />
  </svg>
);

export default function ProfileManagement() {
  const [profile, setProfile] = useState({
    fullName: "Mark Johnson",
    mobile: "(44) 123 1234 123",
    email: "mark@simmmple.com",
    location: "United States",
    bio:
      "Hi, I'm Mark Johnson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
  });

  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  const [settings, setSettings] = useState({
    emailExpert: true,
    emailAnswered: false,
    emailMentioned: true,
    newLaunches: false,
    monthlyNews: false,
    newsletter: true,
    mailsWeekly: true,
  });

  const [cards, setCards] = useState([
    { id: "1", number: "7812 2139 0823 XXXX", validThru: "09/26", cvv: "123" },
    { id: "2", number: "7812 2139 0823 XXXX", validThru: "11/27", cvv: "456" },
  ]);

  const [showAddCard, setShowAddCard] = useState(false);

  const [creditActive, setCreditActive] = useState(true);
  const [creditMenuOpen, setCreditMenuOpen] = useState(false);

  const [selectedCardId, setSelectedCardId] = useState(() => cards?.[0]?.id || null);
  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0] || null;

  const [activeTab, setActiveTab] = useState("overview");
  const [showAttorneyModal, setShowAttorneyModal] = useState(false);

  const handleSaveProfile = () => {
    setProfile(editProfile);
    setEditMode(false);
  };

  const handleAddCard = (card) => {
    const newCard = { id: Date.now().toString(), ...card };
    setCards((prev) => [...prev, newCard]);
    setSelectedCardId(newCard.id);
  };

  const toggleSetting = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const removeCard = (id) => {
    setCards((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (id === selectedCardId) setSelectedCardId(next[0]?.id || null);
      return next;
    });
  };

  const fields = useMemo(
    () => [
      { label: "Full Name:", key: "fullName", icon: <UserCircle2 size={12} /> },
      { label: "Mobile:", key: "mobile", icon: <Phone size={12} /> },
      { label: "Email:", key: "email", icon: <Mail size={12} /> },
      { label: "Location:", key: "location", icon: <MapPin size={12} /> },
    ],
    []
  );

  return (
    <div className="pm-page">
      {/* Background */}
      

      <div className="pm-content">


        {/* MAIN */}
        <div className="pm-main">


          <h1 className="pm-title">My Profile</h1>

          {/* USER BAR */}
          <div className="pm-userBar">
            <div className="pm-userLeft">
              <div className="pm-avatarWrap">
                <div className="pm-avatarGlass">
                  <AvatarIcon size={40} />
                </div>
                <div className="pm-avatarEditDot">
                  <Pencil size={9} color="white" />
                </div>
              </div>

              <div>
                <p className="pm-userName">{profile.fullName}</p>
                <p className="pm-userEmail">{profile.email}</p>
              </div>
            </div>

            <div className="pm-tabs">
              <motion.button
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab("overview")}
                className={`pm-tabBtn ${activeTab === "overview" ? "pm-tabBtnActive" : ""}`}
                type="button"
              >
                PROFILE OVERVIEW
              </motion.button>

            </div>
          </div>

          {/* TOP GRID */}
          <div className="pm-gridTop">
            {/* Welcome */}
            <div className="pm-welcome">
              <div className="pm-welcomeBg">
                <img src={logoImg} alt="" />
              </div>
              <div className="pm-welcomeOverlay" />
              <div className="pm-welcomeContent">
                <p className="pm-welcomeSmall">Welcome</p>
                <h2 className="pm-welcomeTitle">
                  Nice to see you, user
                  <br />
                  back!
                </h2>

                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => setShowAttorneyModal(true)}
                  className="pm-welcomeLink"
                  type="button"
                >
                  sign online attorney <ArrowRight size={12} />
                </motion.button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pm-card pm-cardPad">
              <div className="pm-cardHeader">
                <h3 className="pm-cardTitle">Profile Informations</h3>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditMode(true);
                    setEditProfile(profile);
                  }}
                  className="pm-editBtn"
                  type="button"
                >
                  <Edit2 size={14} color="#c6ab7c" />
                </motion.button>
              </div>

              {editMode ? (
                <textarea
                  className="pm-textarea"
                  value={editProfile.bio}
                  onChange={(e) => setEditProfile((p) => ({ ...p, bio: e.target.value }))}
                  rows={3}
                />
              ) : (
                <p className="pm-muted pm-bio">{}</p>
              )}

              <div className="pm-divider" />

              {fields.map(({ label, key }) => (
                <div key={key} className="pm-fieldRow">
                  <span className="pm-label">{label}</span>

                  {editMode ? (
                    <input
                      className="pm-input"
                      value={editProfile[key]}
                      onChange={(e) => setEditProfile((p) => ({ ...p, [key]: e.target.value }))}
                    />
                  ) : (
                    <span className="pm-value">{profile[key]}</span>
                  )}
                </div>
              ))}

              {editMode && (
                <div className="pm-actions">
                  <button onClick={() => setEditMode(false)} className="pm-btn pm-btnGhost" type="button">
                    Cancel
                  </button>
                  <button onClick={handleSaveProfile} className="pm-btn pm-btnPrimary" type="button">
                    <Check size={14} style={{ display: "inline", marginRight: 6 }} />
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div className="pm-gridBottom">
            {/* Platform Settings */}
            <div className="pm-panel pm-panelPad">
              <h3 className="pm-cardTitle">Platform Settings</h3>

              <p className="pm-sectionLabel">ACCOUNT</p>
              {[
                { key: "emailExpert", label: "Email me when expert finish my process" },
                { key: "emailAnswered", label: "Email me when someone answers to..." },
                { key: "emailMentioned", label: "Email me when someone mentions me" },
              ].map(({ key, label }) => (
                <div key={key} className="pm-toggleRow">
                  <Toggle checked={settings[key]} onChange={() => toggleSetting(key)} />
                  <span className="pm-muted">{label}</span>
                </div>
              ))}

              <p className="pm-sectionLabel pm-sectionLabelTop">APPLICATION</p>
              {[
                { key: "newLaunches", label: "New launches and projects" },
                { key: "monthlyNews", label: "Monthly news updates" },
                { key: "newsletter", label: "Subscribe to newsletter" },
                { key: "mailsWeekly", label: "Receive mails weekly" },
              ].map(({ key, label }) => (
                <div key={key} className="pm-toggleRow">
                  <Toggle checked={settings[key]} onChange={() => toggleSetting(key)} />
                  <span className="pm-muted">{label}</span>
                </div>
              ))}
            </div>

            {/* Credit Card Big */}
            <div className="pm-creditCard">
  {/* ✅ Animated gradient layer */}
  <div className="pm-creditAnim" />

  <div className="pm-creditBlend pm-creditBlendLum">
    <img src={blurImg} alt="" />
  </div>
  <div className="pm-creditBlend pm-creditBlendSoft">
    <img src={textureImg} alt="" />
  </div>

              <div className="pm-creditInner">
                <div className="pm-creditTop">
                  <p className="pm-creditTitle">YOUR CARD</p>
                  <div className="pm-creditCircles">
                    <div className="pm-creditCircle" />
                    <div className="pm-creditCircle pm-creditCircleOverlap" />
                  </div>
                </div>

                <div className="pm-spacer" />

                <p className="pm-creditNumber">
                  {selectedCard ? selectedCard.number : "XXXX XXXX XXXX XXXX"}
                </p>

                <div className="pm-creditMetaRow">
                  <div>
                    <p className="pm-creditMetaLabel">VALID THRU</p>
                    <p className="pm-creditMetaValue">{selectedCard ? selectedCard.validThru : "MM/YY"}</p>
                  </div>
                  <div>
                    <p className="pm-creditMetaLabel">CVV</p>
                    <p className="pm-creditMetaValue">{selectedCard ? selectedCard.cvv : "•••"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="pm-rightCol">
              {/* Credit Balance */}
              <div className="pm-balance">
                <div className="pm-balanceTop">
                  <p className="pm-balanceLabel">Credit Balance</p>

                  <div className="pm-menuWrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCreditMenuOpen((v) => !v);
                      }}
                      className="pm-dotsBtn"
                      aria-label="Credit balance menu"
                    >
                      <div className="pm-dots">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="pm-dot" />
                        ))}
                      </div>
                    </button>

                    <AnimatePresence>
                      {creditMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          onClick={(e) => e.stopPropagation()}
                          className="pm-menu"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setCreditActive((a) => !a);
                              setCreditMenuOpen(false);
                            }}
                            className="pm-menuItem"
                          >
                            {creditActive ? "Deactivate" : "Activate"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pm-balanceBottom">
                  <p className="pm-balanceValue" style={{ filter: creditActive ? "none" : "blur(6px)" }}>
                    $25,215
                  </p>
                  {creditActive ? <AnimatedWave /> : <StaticStraightLine />}
                </div>

                <div className="pm-statusRow">
                  <div className={`pm-statusDot ${creditActive ? "isOn" : "isOff"}`} />
                  <span className="pm-statusText">{creditActive ? "Active" : "Inactive"}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pm-payment">
                <div className="pm-paymentHeader">
                  <p className="pm-paymentTitle">Payment Method</p>

                  {/* الزرار ستاتيك زي ما طلبت */}
                  <button onClick={() => setShowAddCard(true)} className="pm-addBtn" type="button">
                    ADD A NEW CARD
                  </button>
                </div>

                <div className="pm-payList">
                  {cards.map((card) => {
                    const active = selectedCardId === card.id;
                    return (
                      <div key={card.id} className={`pm-neonWrap ${active ? "pm-neonActive" : ""}`}>
                        <div
                          className={`pm-payRow ${active ? "pm-payRowActive" : ""}`}
                          onClick={() => setSelectedCardId(card.id)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="pm-payLeft">
                            <MastercardIcon />
                            <p className="pm-payNumber">{card.number}</p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCard(card.id);
                            }}
                            className="pm-removeBtn"
                            title="Remove card"
                            type="button"
                          >
                            <X size={12} color="white" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {cards.length === 0 && <div className="pm-empty">No payment methods added yet</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      <AddCardModal isOpen={showAddCard} onClose={() => setShowAddCard(false)} onAdd={handleAddCard} />

      {/* Attorney Modal */}
      <AnimatePresence>
        {showAttorneyModal && (
          <div className="pm-modalWrap">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pm-modalBackdrop"
              onClick={() => setShowAttorneyModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="pm-modal"
            >
              <button onClick={() => setShowAttorneyModal(false)} className="pm-modalClose" type="button">
                <X size={20} color="rgba(255,255,255,0.6)" />
              </button>

              <div className="pm-modalIcon">
                <UserCircle2 size={32} color="white" />
              </div>

              <h3 className="pm-modalTitle">Sign Online Attorney</h3>
              <p className="pm-modalText">
                Connect with certified legal professionals online. Get expert advice, sign documents digitally, and
                manage all your legal needs from one place.
              </p>

              <div className="pm-modalBtns">
                <button onClick={() => setShowAttorneyModal(false)} className="pm-btn pm-btnGhost" type="button">
                  Close
                </button>

                <button className="pm-btn pm-btnGrad" type="button">
                  Get Started <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}