import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ArrowRight, Edit2, X,
  Heart, Check, Pencil, MapPin, Phone, Mail, UserCircle2
} from "lucide-react";

import imgRectangle105 from "../../assets/sowar/f78b0cdd7556128889da58c88bdff8e0ea22dada.png";
import imgLandscapeDesigns21 from "../../assets/sowar/b4b5763e106eda6831f372a4943db19410d47e2d.png";
import imgRichardHorvathNWaeTf6Qo0Unsplash2 from "../../assets/sowar/3ba68ebca794d6d97d617807d5448758406dcbad.png";
import imgTexture from "../../assets/sowar/7007946560060ca9880e8e9ffd6e2658f2bc6c6b.png";

import AddCardModal from "./AddCardModal";

// ---- Toggle Switch ----
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    style={{
      position: "relative",
      width: 42,
      height: 14,
      borderRadius: 9999,
      background: checked ? "#c6ab7c" : "rgba(0,0,0,0.6)",
      border: "1px solid rgba(255,255,255,0.15)",
      transition: "background 0.3s",
      cursor: "pointer",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "50%",
        transform: `translateY(-50%) translateX(${checked ? 26 : 1.5}px)`,
        width: 13.5,
        height: 13.5,
        borderRadius: "50%",
        background: "white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
        transition: "transform 0.3s",
      }}
    />
  </button>
);

// ---- Animated Wave Line ----
const AnimatedWave = () => {
  const w = 66;
  const path = `M0 11 C4 5, 8 17, 11 11 C14 5, 17 17, 22 11 C25 5, 29 17, 33 11 C36 5, 40 17, 44 11 C47 5, 51 17, 55 11 C58 5, 62 17, 66 11`;
  return (
    <div style={{ width: w, height: 22, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <motion.div
        style={{ position: "absolute", top: 0, left: 0, display: "flex" }}
        animate={{ x: [0, -w] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      >
        <svg width={w * 2} height={22} viewBox={`0 0 ${w * 2} 22`} fill="none">
          <path d={path} stroke="#c6ab7c" strokeWidth="2" strokeLinecap="round" />
          <g transform={`translate(${w} 0)`}>
            <path d={path} stroke="#c6ab7c" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default function ProfileManagement() {
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Mark Johnson",
    mobile: "(44) 123 1234 123",
    email: "mark@simmmple.com",
    location: "United States",
    bio:
      "Hi, I'm Mark Johnson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term.",
  });

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
    { id: "1", number: "7812 2139 0823 XXXX", validThru: "09/26", cvv: "123", holder: "MARK JOHNSON" },
    { id: "2", number: "7812 2139 0823 XXXX", validThru: "11/27", cvv: "456", holder: "MARK JOHNSON" },
  ]);

  const toggleSetting = (key) => setSettings((p) => ({ ...p, [key]: !p[key] }));
  const removeCard = (id) => setCards((p) => p.filter((c) => c.id !== id));
  const handleAddCard = (card) => setCards((p) => [...p, { id: Date.now().toString(), ...card }]);

  const handleSaveProfile = () => {
    setProfile(editProfile);
    setEditMode(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0800", position: "relative", overflow: "hidden", fontFamily: "Inter, system-ui, Arial" }}>
      {/* background */}
      <img src={imgRectangle105} alt="" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)" }} />

      <div style={{ position: "relative", zIndex: 2, minHeight: "100vh" }}>
        {/* top bar */}
        <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => window.history.back()}
              style={{
                width: 44, height: 44, borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(0,0,0,0.25)",
                color: "white", cursor: "pointer",
              }}
            >
              <ChevronLeft />
            </button>
            <div style={{ color: "white", fontSize: 18, fontWeight: 800 }}>Profile Management</div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {["overview", "settings"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: activeTab === t ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.20)",
                  color: "white",
                  fontWeight: 800,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* header card */}
        <div style={{ padding: "0 20px 16px" }}>
          <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.25)" }}>
            <div style={{ height: 170, position: "relative" }}>
              <img src={imgLandscapeDesigns21} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <img src={imgTexture} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, mixBlendMode: "overlay" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: 999, overflow: "hidden", border: "2px solid rgba(255,255,255,0.25)" }}>
                <img src={imgRichardHorvathNWaeTf6Qo0Unsplash2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              <div style={{ flex: 1, color: "white" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 900, fontSize: 18 }}>
                  {profile.fullName} <UserCircle2 size={18} style={{ opacity: 0.75 }} />
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 8, fontSize: 12, opacity: 0.85 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Phone size={14} /> {profile.mobile}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Mail size={14} /> {profile.email}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><MapPin size={14} /> {profile.location}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!editMode) setEditProfile(profile);
                  setEditMode((p) => !p);
                }}
                style={{
                  width: 44, height: 44, borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(0,0,0,0.25)",
                  cursor: "pointer", color: "white",
                }}
              >
                {editMode ? <X /> : <Pencil />}
              </button>
            </div>
          </div>
        </div>

        {/* content */}
        <div style={{ padding: "0 20px 40px", maxWidth: 1100, margin: "0 auto", display: "grid", gap: 14 }}>
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
                {/* About */}
                <Box title="About">
                  {editMode ? (
                    <div style={{ display: "grid", gap: 10 }}>
                      <Input label="Full Name" value={editProfile.fullName} onChange={(v) => setEditProfile((p) => ({ ...p, fullName: v }))} />
                      <Input label="Mobile" value={editProfile.mobile} onChange={(v) => setEditProfile((p) => ({ ...p, mobile: v }))} />
                      <Input label="Email" value={editProfile.email} onChange={(v) => setEditProfile((p) => ({ ...p, email: v }))} />
                      <Input label="Location" value={editProfile.location} onChange={(v) => setEditProfile((p) => ({ ...p, location: v }))} />
                      <Textarea label="Bio" value={editProfile.bio} onChange={(v) => setEditProfile((p) => ({ ...p, bio: v }))} />

                      <button
                        onClick={handleSaveProfile}
                        style={{
                          padding: "12px 14px",
                          borderRadius: 14,
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 900,
                          background: "linear-gradient(135deg, #c6ab7c, rgba(198,171,124,0.55))",
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <div style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <AnimatedWave />
                        <div style={{ fontWeight: 900, color: "white" }}>A little about me</div>
                      </div>
                      {profile.bio}
                    </div>
                  )}
                </Box>

                {/* Payment Cards */}
                <Box
                  title="Payment Cards"
                  right={
                    <button
                      onClick={() => setShowAddCard(true)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 12px",
                        borderRadius: 14,
                        cursor: "pointer",
                        border: "1px solid rgba(255,255,255,0.10)",
                        background: "rgba(0,0,0,0.20)",
                        color: "white",
                        fontWeight: 800,
                      }}
                    >
                      <span style={{ fontSize: 18, lineHeight: 0 }}>+</span> Add
                    </button>
                  }
                >
                  <div style={{ display: "grid", gap: 10 }}>
                    {cards.map((c) => (
                      <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 14, borderRadius: 16, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.20)" }}>
                        <div style={{ color: "white" }}>
                          <div style={{ fontWeight: 900, letterSpacing: 1 }}>{c.number}</div>
                          <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
                            Holder: {c.holder} • Valid: {c.validThru}
                          </div>
                        </div>

                        <button
                          onClick={() => removeCard(c.id)}
                          style={{ width: 40, height: 40, borderRadius: 14, cursor: "pointer", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.25)", color: "white" }}
                          title="Remove"
                        >
                          🗑
                        </button>
                      </div>
                    ))}
                  </div>
                </Box>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
                <Box title="Notifications">
                  <SettingRow label="Email me when someone answers my question" value={settings.emailAnswered} onToggle={() => toggleSetting("emailAnswered")} />
                  <SettingRow label="Email me when I'm mentioned" value={settings.emailMentioned} onToggle={() => toggleSetting("emailMentioned")} />
                  <SettingRow label="Email me when I become an expert" value={settings.emailExpert} onToggle={() => toggleSetting("emailExpert")} />
                </Box>

                <Box title="News">
                  <SettingRow label="New launches" value={settings.newLaunches} onToggle={() => toggleSetting("newLaunches")} />
                  <SettingRow label="Monthly news" value={settings.monthlyNews} onToggle={() => toggleSetting("monthlyNews")} />
                  <SettingRow label="Newsletter" value={settings.newsletter} onToggle={() => toggleSetting("newsletter")} />
                  <SettingRow label="Weekly mails" value={settings.mailsWeekly} onToggle={() => toggleSetting("mailsWeekly")} />
                </Box>

                <Box title="Preferences">
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Tag icon={<Heart size={16} />} text="Favorites" />
                    <Tag icon={<Check size={16} />} text="Verified" />
                    <Tag icon={<Edit2 size={16} />} text="Editable" />
                    <Tag icon={<ArrowRight size={16} />} text="Next" />
                  </div>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AddCardModal isOpen={showAddCard} onClose={() => setShowAddCard(false)} onAdd={handleAddCard} />
      </div>
    </div>
  );
}

function Box({ title, right, children }) {
  return (
    <div style={{ borderRadius: 22, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.25)", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ color: "white", fontWeight: 900 }}>{title}</div>
        {right}
      </div>
      {children}
    </div>
  );
}

function SettingRow({ label, value, onToggle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>{label}</div>
      <Toggle checked={value} onChange={onToggle} />
    </div>
  );
}

function Tag({ icon, text }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.22)", color: "white", fontWeight: 800 }}>
      {icon} {text}
    </span>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <div style={{ fontSize: 12, marginBottom: 6, color: "rgba(255,255,255,0.65)" }}>{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 12, outline: "none", color: "white", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <div style={{ fontSize: 12, marginBottom: 6, color: "rgba(255,255,255,0.65)" }}>{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 12, outline: "none", color: "white", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", resize: "vertical" }}
      />
    </div>
  );
}