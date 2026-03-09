import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) return parts.join(" ");
    return value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) return v.slice(0, 2) + "/" + v.slice(2, 4);
    return v;
  };

  const validate = () => {
    const newErrors = {};
    if (cardNumber.replace(/\s/g, "").length < 16)
      newErrors.cardNumber = "Enter a valid 16-digit card number";
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
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(6px)",
            }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 420,
              borderRadius: 24,
              overflow: "hidden",
              zIndex: 1,
              background:
                "linear-gradient(139deg, rgba(6,11,40,0.97) 19%, rgba(10,14,35,0.95) 77%)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(198,171,124,0.3)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 24, paddingBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #c6ab7c, rgba(198,171,124,0.4))",
                  }}
                >
                  <CreditCard size={20} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.4, margin: 0 }}>
                    Add New Card
                  </h3>
                  <p style={{ fontSize: 12, color: "#a0aec0", margin: 0 }}>
                    Enter your payment details
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                type="button"
              >
                <X size={16} color="rgba(255,255,255,0.7)" />
              </button>
            </div>

            {/* Card Preview */}
            <div style={{ padding: "0 24px 16px" }}>
              <div
                style={{
                  borderRadius: 18,
                  padding: 18,
                  position: "relative",
                  overflow: "hidden",
                  background: "linear-gradient(130deg, #c6ab7c 34%, #000 106%)",
                  minHeight: 120,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: 0 }}>YOUR CARD</p>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.4)", marginLeft: -16 }} />
                  </div>
                </div>

                <p style={{ fontSize: 16, fontWeight: 700, color: "white", marginTop: 16, letterSpacing: 2 }}>
                  {cardNumber || "XXXX XXXX XXXX XXXX"}
                </p>

                <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
                  <div>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", margin: 0 }}>VALID THRU</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "white", margin: 0 }}>{validThru || "MM/YY"}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", margin: 0 }}>CVV</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "white", margin: 0 }}>{cvv || "•••"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, color: "#a0aec0", display: "block", marginBottom: 6 }}>
                  Card Number
                </label>
                <input
                  type="text"
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  style={{
                    width: "100%",
                    borderRadius: 14,
                    padding: "12px 14px",
                    color: "white",
                    outline: "none",
                    background: "rgba(255,255,255,0.07)",
                    border: errors.cardNumber ? "1px solid #f56565" : "1px solid rgba(255,255,255,0.15)",
                    fontSize: 14,
                  }}
                />
                {errors.cardNumber && <p style={{ fontSize: 11, color: "#f56565", marginTop: 4 }}>{errors.cardNumber}</p>}
              </div>

              <div>
                <label style={{ fontSize: 12, color: "#a0aec0", display: "block", marginBottom: 6 }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={holder}
                  onChange={(e) => setHolder(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: 14,
                    padding: "12px 14px",
                    color: "white",
                    outline: "none",
                    background: "rgba(255,255,255,0.07)",
                    border: errors.holder ? "1px solid #f56565" : "1px solid rgba(255,255,255,0.15)",
                    fontSize: 14,
                  }}
                />
                {errors.holder && <p style={{ fontSize: 11, color: "#f56565", marginTop: 4 }}>{errors.holder}</p>}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: "#a0aec0", display: "block", marginBottom: 6 }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="MM/YY"
                    value={validThru}
                    onChange={(e) => setValidThru(formatExpiry(e.target.value))}
                    style={{
                      width: "100%",
                      borderRadius: 14,
                      padding: "12px 14px",
                      color: "white",
                      outline: "none",
                      background: "rgba(255,255,255,0.07)",
                      border: errors.validThru ? "1px solid #f56565" : "1px solid rgba(255,255,255,0.15)",
                      fontSize: 14,
                    }}
                  />
                  {errors.validThru && <p style={{ fontSize: 11, color: "#f56565", marginTop: 4 }}>{errors.validThru}</p>}
                </div>

                <div>
                  <label style={{ fontSize: 12, color: "#a0aec0", display: "block", marginBottom: 6 }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    style={{
                      width: "100%",
                      borderRadius: 14,
                      padding: "12px 14px",
                      color: "white",
                      outline: "none",
                      background: "rgba(255,255,255,0.07)",
                      border: errors.cvv ? "1px solid #f56565" : "1px solid rgba(255,255,255,0.15)",
                      fontSize: 14,
                    }}
                  />
                  {errors.cvv && <p style={{ fontSize: 11, color: "#f56565", marginTop: 4 }}>{errors.cvv}</p>}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, paddingTop: 6 }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: "12px 0",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "transparent",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "12px 0",
                    borderRadius: 14,
                    border: "none",
                    background: "linear-gradient(135deg, #c6ab7c, #a8894e)",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Add Card
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}