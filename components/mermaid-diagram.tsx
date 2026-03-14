"use client";

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  code: string;
  zoom?: number;
}

export default function MermaidDiagram({ code, zoom = 1 }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      themeVariables: {
        primaryColor: '#003057',
        primaryBorderColor: '#003057',
        lineColor: '#003057',
        secondaryColor: '#B3A369',
        tertiaryColor: '#f8fafc',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
      },
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      try {
        if (!code || !code.trim()) {
          setSvgContent('');
          setError(null);
          return;
        }
        
        // Generate a unique ID to prevent caching issues in Mermaid
        const id = `mermaid-svg-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, code);
        
        if (isMounted) {
          setSvgContent(svg);
          setError(null);
        }
      } catch (e: any) {
        if (isMounted) {
          console.error("Mermaid Syntax Error:", e);
          setError(e.message || "Syntax Error");
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [code]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-primary/5 dark:bg-white/5 rounded-2xl border-2 border-dashed border-primary/20 p-8 overflow-auto">
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg z-10 backdrop-blur-sm truncate">
          <strong>Syntax Error:</strong> {error}
        </div>
      )}
      <div 
        ref={containerRef}
        className="mermaid-render-container w-full h-full flex items-center justify-center transition-all duration-300 [&>svg]:max-w-full [&>svg]:max-h-full origin-center"
        style={{ 
          opacity: error ? 0.3 : 1,
          transform: `scale(${zoom})`,
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}
