import React from 'react';
import {Loader2} from "lucide-react";

function Loader({variant = "big"}) {
    if (variant === "big") {
        return (
            // <div className={`grid items-center justify-center m-auto`}>
            //     <Loader2 className="mr-2 h-20 w-20 animate-spin"/>
            // </div>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                {/* Simple Dot Loader */}
                <div className="dot-loader">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

                {/*<p className="loading-text">Yuklanmoqda...</p>*/}

                <style jsx>{`
        .dot-loader {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #3661d9;
          animation: pulse 1.4s ease-in-out infinite both;
        }
        
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        .dot:nth-child(3) { animation-delay: 0s; }
        .dot:nth-child(4) { animation-delay: 0.16s; }
        .dot:nth-child(5) { animation-delay: 0.32s; }
        
        @keyframes pulse {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .loading-text {
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          animation: fade 2s ease-in-out infinite;
        }
        
        @keyframes fade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
            </div>
        );
    }
    if (variant === "small") {
        return <Loader2 className="ml-2 h-4 w-4 animate-spin"/>
    }



}

export default Loader;