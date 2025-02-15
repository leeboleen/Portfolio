import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition({ children, route }) {
  const transitionDuration = 300;

  return (
    <>
      <Script id="window-history">{ 'window.history.scrollRestoration = "manual"' }</Script>

      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={
          () => {
            if (typeof window !== 'undefined') {
              window.scrollTo(0, 0);
            }
          }
        }
      >
        <motion.div
          key={route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration / 1000 }}
        >
          { children }
        </motion.div>
      </AnimatePresence>
    </>
  );
}

