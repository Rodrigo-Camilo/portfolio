"use client";

import { useEffect, useState } from "react";

const stack = ["React JS", "Next.js", "TypeScript", "Firebase", "Node.js"];

const codeLines = [
  [
    { text: "const", className: "syntax-pink" },
    { text: " " },
    { text: "rodrigo", className: "syntax-blue" },
    { text: " = {" },
  ],
  [
    { text: "  name: " },
    { text: '"Rodrigo Camilo"', className: "syntax-accent" },
    { text: "," },
  ],
  [
    { text: "  birthYear: " },
    { text: "2006", className: "syntax-accent" },
    { text: "," },
  ],
  [
    { text: "  isStudent: " },
    { text: "true", className: "syntax-accent" },
    { text: "," },
  ],
  [
    { text: "  university: " },
    { text: '"Anhembi Morumbi"', className: "syntax-accent" },
    { text: "," },
  ],
  [
    { text: "  course: " },
    { text: '"Sistemas de Informação"', className: "syntax-accent" },
  ],
  [{ text: "};" }],
  [{ text: "" }],
  [
    { text: "export default", className: "syntax-pink" },
    { text: " " },
    { text: "build", className: "syntax-blue" },
    { text: "(rodrigo);" },
  ],
];

const plainLines = codeLines.map((line) => line.map((token) => token.text).join(""));
const lineOffsets = plainLines.map((_, lineIndex) => (
  plainLines
    .slice(0, lineIndex)
    .reduce((offset, line) => offset + line.length + 1, 0)
));
const fullCode = plainLines.join("\n");

export function HeroCodeCard() {
  const [typedCharacters, setTypedCharacters] = useState(0);
  const isComplete = typedCharacters >= fullCode.length;

  useEffect(() => {
    let timeoutId;
    let currentCharacter = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const typeNextCharacter = () => {
      currentCharacter += 1;
      setTypedCharacters(currentCharacter);

      if (currentCharacter >= fullCode.length) return;

      const typedCharacter = fullCode[currentCharacter - 1];
      const delay = typedCharacter === "\n" ? 105 : /[,;}]/.test(typedCharacter) ? 52 : 24;
      timeoutId = window.setTimeout(typeNextCharacter, delay);
    };

    timeoutId = window.setTimeout(
      reduceMotion ? () => setTypedCharacters(fullCode.length) : typeNextCharacter,
      reduceMotion ? 0 : 520,
    );

    return () => window.clearTimeout(timeoutId);
  }, []);

  const activeLine = plainLines.findIndex((line, index) => {
    const lineEnd = lineOffsets[index] + line.length;
    return typedCharacters <= lineEnd || index === plainLines.length - 1;
  });

  return (
    <div className="hero-visual" data-reveal style={{ "--delay": "180ms" }}>
      <div className="code-card">
        <div className="code-card-header">
          <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
          <span>rodrigo.ts</span>
          <span className="code-status"><i /> production</span>
        </div>
        <div className="code-body" aria-label={`Exemplo conceitual de código: ${fullCode}`}>
          <div aria-hidden="true">
            {codeLines.map((line, lineIndex) => {
              let tokenOffset = 0;
              const currentLineOffset = lineOffsets[lineIndex];
              const renderedLine = (
                <div className="code-line" key={lineIndex}>
                  <span className="line-number">{String(lineIndex + 1).padStart(2, "0")}</span>
                  <span className="code-line-text">
                    {line.map((token, tokenIndex) => {
                      const visibleCharacters = Math.max(
                        0,
                        Math.min(token.text.length, typedCharacters - currentLineOffset - tokenOffset),
                      );
                      tokenOffset += token.text.length;

                      return (
                        <span className={token.className} key={`${lineIndex}-${tokenIndex}`}>
                          {token.text.slice(0, visibleCharacters)}
                        </span>
                      );
                    })}
                    {!isComplete && activeLine === lineIndex && <span className="typing-cursor" />}
                  </span>
                </div>
              );

              return renderedLine;
            })}
          </div>
        </div>
        <div className="code-card-footer">
          <span>stack</span>
          <div>{stack.map((item) => <i key={item}>{item}</i>)}</div>
        </div>
      </div>
    </div>
  );
}
