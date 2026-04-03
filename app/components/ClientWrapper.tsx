"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./Loader";


export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loader — unmounts completely after exit */}
      <AnimatePresence>
        {loading && (
          <Loader onFinish={() => setLoading(false)} brandName="MEMORA" />
        )}
      </AnimatePresence>

      {/* Main layout — revealed after loader exits */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            key="site"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}