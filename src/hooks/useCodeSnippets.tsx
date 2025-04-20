import { useState, useEffect } from 'react';
import RealCodeSnippet from '../widget/RealCodeSnippet';
import { realHeroCode1, realHeroCode2 } from '../data/realHeroCode';


const getRandomGradient = () => {
  const gradients = [
    'from-pink-500 via-red-500 to-yellow-500',
    'from-purple-500 via-indigo-500 to-blue-500',
    'from-green-400 via-cyan-500 to-blue-500',
    'from-yellow-400 via-pink-500 to-red-500',
    'from-rose-400 via-fuchsia-500 to-indigo-500'
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};



export const useCodeSnippets = (isClientSide: boolean, isHero?: boolean) => {
    const [codeSnippets, setCodeSnippets] = useState<React.ReactNode[]>([]);
  
    const codeExamples = isHero ? [realHeroCode1, realHeroCode2] : [realHeroCode1];
    const snippetCount = 10; // Number of floating snippets on screen
  
    const widthMin = 150;
    const widthMax = 450;
    const fontSizeMin = 8;
    const fontSizeMax = 10;
  
    useEffect(() => {
      if (!isClientSide) return;
  
      const snippets: React.ReactNode[] = [];
  
      for (let i = 0; i < snippetCount; i++) {
        const left = Math.random() * 90; 
        const top = Math.random() * 100;
  
        const opacity = 0.2 + Math.random() * 0.15;
        const width = widthMin + Math.random() * (widthMax - widthMin);
        const fontSize = fontSizeMin + Math.random() * (fontSizeMax - fontSizeMin);
        const code = codeExamples[i % codeExamples.length];
        const gradient = getRandomGradient();

        snippets.push(
          <RealCodeSnippet
            key={`snippet-${i}`}
            code={code}
            opacity={opacity}
            top={top}
            left={left}
            width={width}
            fontSize={fontSize}
            gradient={gradient}

          />
        );
      }
  
      setCodeSnippets(snippets);
    }, [isClientSide]);
  
    return codeSnippets;
  };
  