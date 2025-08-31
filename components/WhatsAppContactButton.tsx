"use client"

import { PulsingBorder } from "@paper-design/shaders-react"
import { motion, useAnimationControls } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export default function WhatsAppContactButton() {
  const [isDragging, setIsDragging] = useState(false)
  const buttonRef = useRef(null)
  const constraintsRef = useRef(null)
  
  const dragControls = useAnimationControls()

  const BUTTON_SIZE_PX = 64;
  const INNER_BUTTON_SIZE_PX = 56;
  const WHATSAPP_ICON_SIZE_PX = 24;
  const PADDING_PX = 20;

  // Set the initial position to the bottom-right corner
  useEffect(() => {
    if (!buttonRef.current) return;
    
    const initialX = window.innerWidth - BUTTON_SIZE_PX - PADDING_PX;
    const initialY = window.innerHeight - BUTTON_SIZE_PX - PADDING_PX;
    
    // Set position and fade it in to prevent a flash at the top-left corner on load
    dragControls.set({ x: initialX, y: initialY, opacity: 1 });
  }, [dragControls]);

  // 3. Updated WhatsApp link
  const handleWhatsAppClick = () => {
    if (isDragging) return
    
    const whatsappUrl = "https://api.whatsapp.com/send/?phone=918277343650&text&type=phone_number&app_absent=0";
    window.open(whatsappUrl, '_blank');
  }

  const handleDragEnd = () => {
    setTimeout(() => setIsDragging(false), 50)
    
    if (!buttonRef.current) return

    const buttonRect = buttonRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    const buttonCenter = {
      x: buttonRect.x + buttonRect.width / 2,
      y: buttonRect.y + buttonRect.height / 2,
    }

    let targetX;
    let targetY;

    targetX = 
      buttonCenter.x < viewportWidth / 2 
        ? PADDING_PX 
        : viewportWidth - BUTTON_SIZE_PX - PADDING_PX;
    
    if (buttonCenter.y < viewportHeight / 2) {
      if (targetX === PADDING_PX) {
        targetY = viewportHeight - BUTTON_SIZE_PX - PADDING_PX;
      } else {
        targetY = PADDING_PX;
      }
    } else {
      targetY = viewportHeight - BUTTON_SIZE_PX - PADDING_PX;
    }
    
    dragControls.start({ x: targetX, y: targetY }, { type: "spring", stiffness: 400, damping: 35 })
  }

  // 1. Tooltip logic updated to only show on the sides
  const getTooltipClasses = () => {
    if (!buttonRef.current) return "right-full top-1/2 -translate-y-1/2 mr-3"; // Default to left side

    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;

    // If the button is on the left half of the screen, show the tooltip on the right.
    if (buttonCenterX < window.innerWidth / 2) {
      return "left-full top-1/2 -translate-y-1/2 ml-3"; // Show on the right
    } 
    // Otherwise (on the right half), show it on the left.
    else {
      return "right-full top-1/2 -translate-y-1/2 mr-3"; // Show on the left
    }
  };

  return (
    <div ref={constraintsRef} className="fixed inset-0 z-50 pointer-events-none">
      <motion.div 
        ref={buttonRef}
        className="absolute z-30 pointer-events-auto"
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd} 
        animate={dragControls} 
        whileHover={!isDragging ? { scale: 1.02 } : {}}
        whileTap={!isDragging ? { scale: 0.98 } : {}}
        // 2. Initial style set to prevent flash of content at top-left
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          opacity: 0 // Start invisible
        }} 
      >
        <div 
          className="relative flex items-center justify-center group"
          onClick={handleWhatsAppClick}
          style={{ width: BUTTON_SIZE_PX, height: BUTTON_SIZE_PX }}
        >
          {/* ... all inner button styling remains the same ... */}
          <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <PulsingBorder
            colors={["#6EE7B7", "#34D399", "#10B981", "#059669"]}
            colorBack="#00000000" speed={0.8} roundness={1} thickness={0.06} softness={0.6} intensity={2} spotspercolor={3} spotSize={0.08} pulse={0.1} smoke={0.2} smokeSize={2} scale={0.9} rotation={0} frame={9161408.251009725}
            style={{
              width: `${INNER_BUTTON_SIZE_PX}px`, height: `${INNER_BUTTON_SIZE_PX}px`, borderRadius: "50%",
            }}
          />
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div 
              className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-full flex items-center justify-center shadow-lg border border-slate-600/50 group-hover:border-emerald-400/30 transition-all duration-300 group-hover:shadow-emerald-400/10 backdrop-blur-sm"
              style={{ width: INNER_BUTTON_SIZE_PX - 8, height: INNER_BUTTON_SIZE_PX - 8 }}
            >
              <div className="absolute inset-1 bg-gradient-to-br from-slate-600/30 to-transparent rounded-full"></div>
              <svg 
                className="relative z-10 group-hover:scale-105 transition-transform duration-200" 
                viewBox="0 0 24 24" fill="currentColor"
                style={{ width: WHATSAPP_ICON_SIZE_PX, height: WHATSAPP_ICON_SIZE_PX }}
              >
                <path 
                  fill="url(#whatsappGradient)"
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"
                />
                <defs>
                  <linearGradient id="whatsappGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className={`absolute ${getTooltipClasses()} bg-slate-800/95 backdrop-blur-md border border-slate-600/50 text-emerald-300 px-3 py-2 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl z-10`}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              Chat on WhatsApp
            </div>
          </div>
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
            <div className="flex gap-0.5">
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}