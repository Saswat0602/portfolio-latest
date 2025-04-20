import { useEffect, useState, RefObject } from "react";


export const useMouseParallax = (isClientSide: boolean, containerRef: RefObject<HTMLDivElement | null>) => {
    useEffect(() => {
        if (!isClientSide || !containerRef.current) return;

        let rafId: number | undefined;
        let mouseX = 0;
        let mouseY = 0;
        let isUpdating = false;

        const updateElementPositions = () => {
            if (!containerRef.current) return;

            const elements = containerRef.current.querySelectorAll('.floating-blob');
            elements.forEach((element) => {
                const el = element as HTMLElement;
                const speed = parseFloat(el.getAttribute('data-speed') || '0.05');
                const offsetX = (mouseX - 0.5) * speed * 100;
                const offsetY = (mouseY - 0.5) * speed * 100;

                el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });

            isUpdating = false;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;

            if (!isUpdating) {
                isUpdating = true;
                rafId = requestAnimationFrame(updateElementPositions);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isClientSide, containerRef]);
};


export const useClientSideEffects = (matrixRainDelay: number = 1500) => {
    const [isClientSide, setIsClientSide] = useState<boolean>(false);
    const [showMatrixRain, setShowMatrixRain] = useState<boolean>(false);

    useEffect(() => {
        setIsClientSide(true);

        const timer = setTimeout(() => {
            setShowMatrixRain(true);
        }, matrixRainDelay);

        return () => clearTimeout(timer);
    }, [matrixRainDelay]);

    return { isClientSide, showMatrixRain };
};

