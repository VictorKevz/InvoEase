export const pageVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    x: "100vw",
  },
};
export const portalVariants = {
  initial: {
    opacity: 0,
    y: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    x: "100vw",
  },
};
export const tabVariants = (direction) => ({
  hidden: { x: direction ? 30 : -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.6,

      ease: "easeInOut",
    },
  },
  exit: {
    x: direction ? -20 : 20,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.1,
      ease: "easeInOut",
    },
  },
});
export const modalVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      type: "spring",
      stiffness:200,
      damping:15
    },
  },
  exit: {
    opacity: 0,
    x: "100vw",
  },
};

