// hooks/useCodeSnippets.tsx
import { useEffect, useState } from "react";
import RealCodeSnippet from "../widget/RealCodeSnippet";
import { realHeroCode1, realHeroCode2 } from '../data/realHeroCode';

type UseCodeSnippetsProps = {
    codes: string[];
    isClientSide?: boolean;
    snippetsPerRow?: number;
    rowCount?: number;
    offsetTop?: number;
    spacingY?: number;
};
const useCodeSnippets = ({
    isClientSide = typeof window !== 'undefined',
    snippetsPerRow = 4,
    rowCount = 2,
    offsetTop = 15,
    spacingY = 30,
}: UseCodeSnippetsProps) => {
    const codes = [realHeroCode1, realHeroCode2];

    const [codeSnippets, setCodeSnippets] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        if (!isClientSide) return;

        const snippets: React.ReactNode[] = [];

        for (let row = 0; row < rowCount; row++) {
            const baseTop = offsetTop + row * spacingY;

            for (let i = 0; i < snippetsPerRow; i++) {
                const baseLeft = (i / snippetsPerRow) * 85;

                const top = baseTop + (Math.random() * 10 - 5);
                const left = baseLeft + (Math.random() * 10 - 5);
                const opacity = 0.2 + Math.random() * 0.15;
                const width = 150 + Math.random() * 300;
                const fontSize = 8 + Math.random() * 2;
                const code = codes[(row * snippetsPerRow + i) % codes.length];

                snippets.push(
                    <RealCodeSnippet
                        key={`${row}-${i}`}
                        code={code}
                        opacity={opacity}
                        top={top}
                        left={left}
                        width={width}
                        fontSize={fontSize}
                    />
                );
            }
        }

        setCodeSnippets(snippets);
    }, [isClientSide, codes, snippetsPerRow, rowCount, offsetTop, spacingY]);

    return codeSnippets;
};

export default useCodeSnippets;
