import React, { useEffect, useRef, useState } from 'react';

// @ts-ignore
import HanziWriter from 'hanzi-writer';

interface Props {
    character: string;
    onComplete: () => void;
    size?: number;
}

export const HanziCanvas: React.FC<Props> = ({ character, onComplete, size = 250 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const writerRef = useRef<any>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;
        
        // Clear previous writer
        containerRef.current.innerHTML = '';
        setError(false);

        try {
            writerRef.current = HanziWriter.create(containerRef.current, character, {
                width: size,
                height: size,
                padding: 10,
                strokeAnimationSpeed: 2,
                delayBetweenStrokes: 100,
                showOutline: true,
                strokeColor: '#3b82f6', // blue-500
                outlineColor: '#e2e8f0', // slate-200
                drawingColor: '#10b981', // emerald-500
                drawingWidth: 20,
                charDataLoader: (char: string, onComplete: (data: any) => void, onError: (err: any) => void) => {
                    // Fetch from jsdelivr, but prioritize traditional chinese (if available) or default fallback
                    fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json`)
                        .then(res => {
                            if (!res.ok) throw new Error('Not found');
                            return res.json();
                        })
                        .then(onComplete)
                        .catch(onError);
                }
            });

            writerRef.current.quiz({
                onComplete: () => {
                    setTimeout(onComplete, 500); // Wait a bit after completing to show the full character
                }
            });
        } catch (e) {
            console.error("HanziWriter Error:", e);
            // If the character is not supported by HanziWriter, just auto-complete it
            setError(true);
            setTimeout(onComplete, 1000);
        }

        return () => {
            if (writerRef.current) {
                // Cancel ongoing quiz if unmounted
                writerRef.current.cancelQuiz();
            }
        };
    }, [character, size, onComplete]);

    return (
        <div className="relative flex flex-col items-center justify-center bg-white rounded-3xl border-8 border-slate-100 shadow-inner overflow-hidden" style={{ width: size, height: size }}>
            {error ? (
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-slate-300">
                    {character}
                </div>
            ) : null}
            <div ref={containerRef} className="z-10 cursor-crosshair"></div>
            
            {/* Guide overlay to show where to start / stroke order animation button */}
            <button 
                onClick={() => writerRef.current?.animateCharacter()}
                className="absolute bottom-2 right-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full p-2 text-xs font-bold shadow-sm z-20 transition-colors"
            >
                👀 看筆順
            </button>
        </div>
    );
};

export default HanziCanvas;
