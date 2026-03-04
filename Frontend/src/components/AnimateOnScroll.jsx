import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const presets = {
  fadeLeft:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
  fadeUp:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  zoomIn:    { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
};

export default function AnimateOnScroll({
  children,
  preset = "fadeUp",
  duration = 0.9,
  delay = 0,
  threshold = 0.2,
  className,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

const observer = new IntersectionObserver(
  ([entry]) => {
    setInView(entry.isIntersecting);
  },
  {
    threshold,
    rootMargin: "0px 0px -20% 0px", // ✅ waits until element is 20% into view
  }
);

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={presets[preset] ?? presets.fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}