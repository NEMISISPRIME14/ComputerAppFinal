import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard } from "lucide-react";

export default function AddCardModal({ isOpen, onClose, onAdd }) {
  const [cardNumber, setCardNumber] = useState("");
  const [validThru, setValidThru] = useState("");
  const [cvv, setCvv] = useState("");
  const [holder, setHolder] = useState("");
  const [errors, setErrors] = useState({});

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) parts.push(match.substring(i, i + 4));
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) return v.slice(0, 2) + "/" + v.slice(2, 4);
    return v;
  };

  const validate = () => {
    const newErrors = {};
    if (cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = "Enter a valid 16-digit card number";
    if (validThru.length < 5) newErrors.validThru = "Enter a valid expiry date";
    if (cvv.length < 3) newErrors.cvv = "Enter a valid CVV";
    if (!holder.trim()) newErrors.holder = "Enter cardholder name";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    onAdd({ number: `XXXX XXXX XXXX ${last4}`, validThru, cvv, holder });

    setCardNumber("");
    setValidThru("");
    setCvv("");
    setHolder("");
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={styles.wrap}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.backdrop}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={styles.card}
          >
            {/* Header */}
            <div style={styles.header}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={styles.iconBox}>
                  <CreditCard size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.4 }}>Add New Card</div>
                  <div style={{ fontSize: 12, color: "#a0aec0" }}>Enter your payment details</div>
                </div>
              </div>

              <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
                <X size={16} color="rgba(255,255,255,0.7)" />
              </button>
            </div>

            {/* Preview */}
            <div style={{ padding: "0 24px 16px" }}>
              <div style={styles.preview}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>YOUR CARD</div>
                  <div style={{ display: "flex" }}>
                    <div style={styles.dot} />
                    <div style={{ ...styles.dot, marginLeft: -16 }} />
                  </div>
                </div>

                <div style={{ fontSize: 16, fontWeight: 700, color: "white", marginTop: 16, letterSpacing: 2 }}>
                  {cardNumber || "XXXX XXXX XXXX XXXX"}
                </div>

                <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
                  <div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)" }}>VALID THRU</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{validThru || "MM/YY"}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)" }}>CVV</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{cvv || "•••"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: 24, paddingTop: 0, display: "grid", gap: 12 }}>
              <Field label="Card Number" error={errors.cardNumber}>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  style={inputStyle(!!errors.cardNumber)}
                />
              </Field>

              <Field label="Cardholder Name" error={errors.holder}>
                <input
                  value={holder}
                  onChange={(e) => setHolder(e.target.value)}
                  placeholder="John Doe"
                  style={inputStyle(!!errors.holder)}
                />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field label="Expiry Date" error={errors.validThru}>
                  <input
                    value={validThru}
                    onChange={(e) => setValidThru(formatExpiry(e.target.value))}
                    maxLength={5}
                    placeholder="MM/YY"
                    style={inputStyle(!!errors.validThru)}
                  />
                </Field>

                <Field label="CVV" error={errors.cvv}>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                    placeholder="123"
                    style={inputStyle(!!errors.cvv)}
                  />
                </Field>
              </div>

              <button type="submit" style={styles.submit}>
                Add Card
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <div style={{ fontSize: 12, marginBottom: 6, color: "rgba(255,255,255,0.65)" }}>{label}</div>
      {children}
      {error && <div style={{ fontSize: 11, color: "#f56565", marginTop: 4 }}>{error}</div>}
    </div>
  );
}

function inputStyle(error) {
  return {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    outline: "none",
    color: "white",
    background: "rgba(255,255,255,0.07)",
    border: error ? "1px solid #f56565" : "1px solid rgba(255,255,255,0.15)",
  };
}

const styles = {
  wrap: {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.70)",
    backdropFilter: "blur(6px)",
  },
  card: {
    position: "relative",
    zIndex: 2,
    width: "min(520px, 92vw)",
    borderRadius: 24,
    overflow: "hidden",
    background: "linear-gradient(139deg, rgba(6,11,40,0.97) 19%, rgba(10,14,35,0.95) 77%)",
    border: "1px solid rgba(198,171,124,0.3)",
  },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: 24, paddingBottom: 16 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #c6ab7c, rgba(198,171,124,0.4))",
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 999,
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
  preview: {
    borderRadius: 16,
    padding: 20,
    background: "linear-gradient(130deg, #c6ab7c 34%, #000 106%)",
    minHeight: 120,
  },
  dot: { width: 32, height: 32, borderRadius: 999, background: "rgba(255,255,255,0.40)" },
  submit: {
    marginTop: 6,
    padding: "12px 14px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    fontWeight: 800,
    background: "linear-gradient(135deg, #c6ab7c, rgba(198,171,124,0.55))",
    color: "black",
  },
};