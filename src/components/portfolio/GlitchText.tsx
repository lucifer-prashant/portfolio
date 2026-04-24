"use client";

import { useEffect, useState, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  scrambleOnLoad?: boolean;
  delay?: number;
}

const chars = "▓▒░█▄▀■□▪▫";

export function GlitchText({ text, className = "", scrambleOnLoad = true, delay = 0 }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(scrambleOnLoad ? "" : text);
  const [isVisible, setIsVisible] = useState(!scrambleOnLoad);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!scrambleOnLoad) return;

    const timeout = setTimeout(() => {
      setIsVisible(true);
      let iteration = 0;
      const finalText = text;
      
      intervalRef.current = setInterval(() => {
        setDisplayText(
          finalText
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return finalText[index];
              }
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= finalText.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        iteration += 1 / 2;
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, scrambleOnLoad, delay]);

  return (
    <span
      className={`${className} ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
      data-text={text}
    >
      {displayText || text}
    </span>
  );
}
