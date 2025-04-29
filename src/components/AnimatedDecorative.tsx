import PixelTransition from "../widget/PixelTransition"
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';



const AnimatedDecorative = () => {
    return (
        <AnimatedSection direction="left" className="order-1 md:order-2">
            <div className="relative max-w-xs mx-auto md:max-w-sm overflow-visible">
                <motion.div
                    className="absolute -top-6 -left-6 w-16 md:w-20 h-16 md:h-20 bg-blue-200 dark:bg-blue-900/30 rounded-lg z-0"
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div
                    className="absolute -bottom-6 -right-6 w-16 md:w-20 h-16 md:h-20 bg-purple-200 dark:bg-purple-900/30 rounded-lg z-0"
                    animate={{
                        rotate: [0, -360],
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                ></motion.div>
                <motion.div
                    className="absolute top-1/4 -right-4 md:-right-8 w-8 md:w-12 h-8 md:h-12 bg-green-200 dark:bg-green-900/30 rounded-full z-0"
                    animate={{
                        y: [0, 15, 0],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                ></motion.div>
                <motion.div
                    className="absolute bottom-1/4 -left-4 md:-left-8 w-8 md:w-12 h-8 md:h-12 bg-pink-200 dark:bg-pink-900/30 rounded-full z-0"
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3
                    }}
                ></motion.div>

                <motion.div
                    className="relative z-10 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 shadow-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: [0, 2, 0, -2, 0],
                    }}
                    transition={{
                        duration: 0.6,
                        scale: { duration: 0.6 },
                        rotate: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    whileHover={{ scale: 1.03 }}
                >

                    <PixelTransition
                        firstContent={
                            <img
                                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop"
                                alt="Saswat.Dev"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "fill",
                                    position: "absolute",

                                }}
                            />
                        }

                        secondContent={
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "grid",
                                    placeItems: "center",
                                    backgroundColor: "#111"
                                }}
                            >
                                <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Saswat.Dev!</p>
                            </div>
                        }
                        gridSize={15}
                        pixelColor='#431c7d'
                        animationStepDuration={0.4}
                    />
                </motion.div>
            </div>
        </AnimatedSection>
    )
}

export default AnimatedDecorative