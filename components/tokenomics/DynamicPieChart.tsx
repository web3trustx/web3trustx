'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOKEN_CATEGORIES, formatTokenAmount, TokenCategory } from '../../lib/tokenomicsData';
import { useLanguage } from '../../lib/LanguageContext';

interface DynamicPieChartProps {
  onCategoryClick?: (category: TokenCategory) => void;
}

export default function DynamicPieChart({ onCategoryClick }: DynamicPieChartProps) {
  const { language } = useLanguage();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const size = 400;
  const center = size / 2;
  const radius = 150;
  const innerRadius = 80;

  // Calculate pie slices
  const calculateSlices = () => {
    let currentAngle = -90; // Start from top
    return TOKEN_CATEGORIES.map((category) => {
      const angle = (category.percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = center + radius * Math.cos(startRad);
      const y1 = center + radius * Math.sin(startRad);
      const x2 = center + radius * Math.cos(endRad);
      const y2 = center + radius * Math.sin(endRad);

      const x1Inner = center + innerRadius * Math.cos(startRad);
      const y1Inner = center + innerRadius * Math.sin(startRad);
      const x2Inner = center + innerRadius * Math.cos(endRad);
      const y2Inner = center + innerRadius * Math.sin(endRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const path = `
        M ${x1Inner} ${y1Inner}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        L ${x2Inner} ${y2Inner}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner}
        Z
      `;

      // Calculate label position
      const midAngle = (startAngle + endAngle) / 2;
      const midRad = (midAngle * Math.PI) / 180;
      const labelRadius = radius + 40;
      const labelX = center + labelRadius * Math.cos(midRad);
      const labelY = center + labelRadius * Math.sin(midRad);

      return {
        category,
        path,
        startAngle,
        endAngle,
        labelX,
        labelY,
        midAngle,
      };
    });
  };

  const slices = calculateSlices();

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 py-8">
      {/* SVG Chart */}
      <div className="relative">
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform transition-transform duration-300"
        >
          {/* Glow filter */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius + 10}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="2"
          />

          {/* Pie slices */}
          {slices.map((slice, index) => {
            const isHovered = hoveredCategory === slice.category.id;
            const scale = isHovered ? 1.05 : 1;
            const translateX = isHovered ? Math.cos((slice.midAngle * Math.PI) / 180) * 10 : 0;
            const translateY = isHovered ? Math.sin((slice.midAngle * Math.PI) / 180) * 10 : 0;

            return (
              <motion.path
                key={slice.category.id}
                d={slice.path}
                fill={isHovered ? slice.category.colorLight : slice.category.color}
                stroke="rgba(10, 18, 32, 0.8)"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: scale,
                  translateX: translateX,
                  translateY: translateY,
                }}
                transition={{
                  opacity: { delay: index * 0.1, duration: 0.5 },
                  scale: { delay: index * 0.1, duration: 0.5 },
                  translateX: { duration: 0.2 },
                  translateY: { duration: 0.2 },
                }}
                style={{
                  transformOrigin: `${center}px ${center}px`,
                  filter: isHovered ? 'url(#glow)' : 'url(#shadow)',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredCategory(slice.category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => onCategoryClick?.(slice.category)}
              />
            );
          })}

          {/* Center circle with logo/text */}
          <motion.circle
            cx={center}
            cy={center}
            r={innerRadius - 10}
            fill="#0A1220"
            stroke="rgba(0, 181, 173, 0.3)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />

          {/* Center text */}
          <motion.text
            x={center}
            y={center - 15}
            textAnchor="middle"
            fill="#00B5AD"
            fontSize="24"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            1B
          </motion.text>
          <motion.text
            x={center}
            y={center + 10}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            WTX
          </motion.text>
          <motion.text
            x={center}
            y={center + 30}
            textAnchor="middle"
            fill="#6B7280"
            fontSize="11"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            Total Supply
          </motion.text>
        </svg>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredCategory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-4 z-20"
            >
              {(() => {
                const cat = TOKEN_CATEGORIES.find(c => c.id === hoveredCategory);
                if (!cat) return null;
                return (
                  <div
                    className="bg-dark-lighter border rounded-xl px-6 py-4 shadow-2xl min-w-[200px]"
                    style={{ borderColor: cat.color }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-white font-bold">
                        {language === 'es' ? cat.nameEs : cat.name}
                      </span>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: cat.color }}>
                      {cat.percentage}%
                    </div>
                    <div className="text-gray-400 text-sm">
                      {formatTokenAmount(cat.tokens)} WTX
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {language === 'es' ? 'Clic para más detalles' : 'Click for details'}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-2">
        {TOKEN_CATEGORIES.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-left ${
              hoveredCategory === category.id
                ? 'bg-white/10 scale-105'
                : 'hover:bg-white/5'
            }`}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => onCategoryClick?.(category)}
          >
            <div
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {language === 'es' ? category.nameEs : category.name}
              </div>
              <div className="text-xs text-gray-400">
                {category.percentage}% • {formatTokenAmount(category.tokens)}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
