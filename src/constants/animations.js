/**
 * Shared animation variant presets for Framer Motion.
 * Extracted from 6+ components that all defined identical objects on every render.
 */

/** Stagger children on container mount */
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

/** Stagger with delayed children (used by HomeView) */
export const staggerContainerDelayed = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

/** Standard spring-in item (y + opacity) */
export const springItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

/** Spring-in item with subtle scale (used by HomeView, MatchesView) */
export const springItemScale = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

/** Larger spring-in item with scale (used by HomeView hero) */
export const springItemHero = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};
