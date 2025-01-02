export const pageVariants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.6,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    x: "100vw",
  },
};

export const tabVariants = (direction) => ({
    hidden: { y: direction ? 30 : -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.6,
        
        ease: "easeInOut",
      },
    },
    exit: {
      y: direction ? -20 : 20,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.1,
        ease: "easeInOut",
      },
    },
  });