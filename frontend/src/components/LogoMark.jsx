import React from "react";
import { Gamepad2 } from "lucide-react";

export const LogoMark = ({ className = "" }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <div className="relative flex h-9 w-9 items-center justify-center rounded-lg blue-gradient-bg shadow-[0_0_18px_rgba(0,102,253,0.5)]">
      <Gamepad2 className="h-5 w-5 text-white" strokeWidth={2.4} />
    </div>
    <div className="leading-none">
      <div className="font-display text-[15px] font-800 tracking-wide text-white" style={{ fontWeight: 800 }}>
        NEXT LEVEL
      </div>
      <div className="font-display text-[8px] tracking-[0.35em] text-[#6ea8ff]" style={{ fontWeight: 500 }}>
        GAMING EVENTS
      </div>
    </div>
  </div>
);

export default LogoMark;
