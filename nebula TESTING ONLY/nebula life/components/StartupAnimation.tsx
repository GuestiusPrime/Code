import React from 'react';

const StartupAnimation: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
            {/* A container to establish a positioning context for the absolutely positioned elements */}
            <div className="relative flex items-center justify-center">

                {/* Logo animation: starts centered, grows, then slides left */}
                <div className="animate-startup-logo absolute opacity-0">
                    <svg className="w-[100px] h-[100px] text-fuchsia-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                </div>

                {/* Title animation: fades in centered, then slides right */}
                {/* The text is large to be proportional to the large logo */}
                <h1 className="animate-startup-title absolute text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 opacity-0">
                    NEBULA LIFE
                </h1>
            </div>
        </div>
    );
};

export default StartupAnimation;