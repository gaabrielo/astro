import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import './styles.scss';

interface MenuProps {
  isOpen: boolean;
  onClose: any;
}

export function Menu({ isOpen, onClose }: MenuProps) {
  const [open, setOpen] = useState(false);

  // const isOpen = () => {
  //   setOpen(true);
  // };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const closeMenu = () => {
    setOpen(false);
    onClose(false);
  };

  // animation
  const item = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.3,
        delay: 1.2,
      },
    },
  };

  return (
    // <header className="container">
    <AnimatePresence>
      {open && (
        <motion.div
          className="menu_container"
          variants={item}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: '100vh', opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit="exit"
        >
          <div className="btn_close" onClick={closeMenu}>
            X
          </div>
          <motion.a
            href=""
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            exit={{
              opacity: 0,
              y: 90,
              transition: {
                ease: 'easeInOut',
                delay: 1,
              },
            }}
          >
            Astro Smash
          </motion.a>
          <motion.a
            href=""
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            exit={{
              opacity: 0,
              y: 90,
              transition: {
                ease: 'easeInOut',
                delay: 0.8,
              },
            }}
          >
            Grelhados como churrasco
          </motion.a>
          <motion.a
            href=""
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            exit={{
              opacity: 0,
              y: 90,
              transition: {
                ease: 'easeInOut',
                delay: 0.6,
              },
            }}
          >
            Acompanhamentos
          </motion.a>
          {/* <motion.a
            href=""
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            exit={{
              opacity: 0,
              y: 90,
              transition: {
                ease: 'easeInOut',
                delay: 0.4,
              },
            }}
          >
            iFood
          </motion.a> */}
        </motion.div>
      )}
    </AnimatePresence>
    // </header>
  );
}
