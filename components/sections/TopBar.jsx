// components/sections/TopBar.tsx
import { motion } from 'framer-motion';

export default function TopBar() {
  const showTopBar = false; // Change to 'true' when you want to show it
  
  if (!showTopBar) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-eco-bg py-2 text-center"
    >
      <p className="text-xs font-medium text-eco-text tracking-wide">
        OFFERS
      </p>
    </motion.div>
  );
}