import React, { useEffect, useRef, useState } from 'react';

// @ts-ignore
import HanziWriter from 'hanzi-writer';

interface Props {
    character: string;
    onComplete: () => void;
    size?: number;
}

export const HanziCanvas: React.FC<Props> = ({ character, onComplete: propsOnComplete, size = 250 }) => {
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
                        .catch(err => {
                            console.error("HanziWriter failed to load data for:", char);
                            setError(true);
                            // Removed auto-skip; user must manually click next
                            onError(err);
                        });
                }
            });

            writerRef.current.quiz({
                onComplete: () => {
                    setTimeout(propsOnComplete, 500); // Wait a bit after completing to show the full character
                }
            });
        } catch (e) {
            console.error("HanziWriter Error:", e);
            // If the character is not supported by HanziWriter, show error state and wait for manual click
            setError(true);
        }

        return () => {
            if (writerRef.current) {
                // Cancel ongoing quiz if unmounted
                writerRef.current.cancelQuiz();
            }
        };
    }, [character, size, propsOnComplete]);

    return (
        <div className="relative flex flex-col items-center justify-center bg-white rounded-3xl border-8 border-slate-100 shadow-inner overflow-hidden" style={{ width: size, height: size }}>
            {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/90 z-30">
                    <div className="text-8xl font-black text-slate-400 mb-6 drop-shadow-sm">
                        {character}
                    </div>
                    <button 
                        onClick={() => propsOnComplete()}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg border-b-4 border-emerald-700 active:translate-y-1 active:border-b-0 transition-all"
                    >
                        我知道了 (下一題)
                    </button>
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
