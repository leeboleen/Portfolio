import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GridVisualiser() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onKeydown = e => {
      if (e.key === 'Alt') {
        setIsVisible(state => !state);
      }

      if (isVisible && e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  });

  return (
    <>
      {
        isVisible && (
          <div
            className="grid-visualiser container site-grid">
            {
              [...Array(12)].map((el, i) => (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 * i, ease: 'easeInOut' }}
                  className="column"
                  key={i}
                />
              ))
            }
          </div>
        )
      }

      <style jsx global>
        {
          `
        .grid-visualiser {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.5;
          z-index: 1000;
          position: fixed;
          pointer-events: none;
        }

        .grid-visualiser .column {
          background-color: rgb(0 255 255 / 40%);
        }
        `
        }
      </style>
    </>
  );
}
