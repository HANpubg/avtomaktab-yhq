import React, { useState } from 'react';
import { Maximize2, X, ZoomIn, Info, ShieldAlert } from 'lucide-react';
import { Question } from '../types';
import { SignGraphic } from './SignGraphic';

interface TrafficSituationVisualProps {
  question: Question;
}

export const TrafficSituationVisual: React.FC<TrafficSituationVisualProps> = ({ question }) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const { imageType, topicId, scenarioMeta, globalIndex, signCode, questionNumber } = question;

  const currentType = imageType || 'intersection';
  const signsList = scenarioMeta?.signsPresent || (signCode ? [signCode] : ['2.1']);

  // Diagram SVG / Graphic content renderer
  const renderDiagramContent = (isModal: boolean = false) => {
    // 1. ROUNDABOUT
    if (currentType === 'roundabout') {
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full max-w-lg mx-auto">
          {/* Ground */}
          <rect x="0" y="0" width="400" height="240" fill="#090d16" />

          {/* Cross roadways */}
          <rect x="165" y="0" width="70" height="240" fill="#1e293b" />
          <rect x="0" y="85" width="400" height="70" fill="#1e293b" />

          {/* Sidewalk grass corners */}
          <rect x="0" y="0" width="160" height="80" fill="#0f172a" rx="8" />
          <rect x="240" y="0" width="160" height="80" fill="#0f172a" rx="8" />
          <rect x="0" y="160" width="160" height="80" fill="#0f172a" rx="8" />
          <rect x="240" y="160" width="160" height="80" fill="#0f172a" rx="8" />

          {/* Roundabout outer asphalt circle */}
          <circle cx="200" cy="120" r="88" fill="#1e293b" stroke="#334155" strokeWidth="3" />

          {/* Outer lane markings */}
          <circle cx="200" cy="120" r="66" fill="none" stroke="#facc15" strokeWidth="2.5" strokeDasharray="10 8" />

          {/* Central Green Island */}
          <circle cx="200" cy="120" r="42" fill="#15803d" stroke="#22c55e" strokeWidth="4" />
          <circle cx="200" cy="120" r="28" fill="#166534" />

          {/* Sign 4.3 mounted on south entrance */}
          <g transform="translate(142, 175)">
            <rect x="9" y="16" width="3" height="30" fill="#94a3b8" />
            <circle cx="10" cy="10" r="12" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
            {/* Arrows */}
            <path d="M6 10 A 4 4 0 0 1 14 10" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <polygon points="15,10 12,7 12,13" fill="#ffffff" />
          </g>

          {/* CAR 1 (Blue - Circulating inside roundabout with Priority) */}
          <g transform="translate(160, 68) rotate(-45)">
            <rect x="0" y="0" width="36" height="22" rx="5" fill="#2563eb" stroke="#60a5fa" strokeWidth="2" />
            <rect x="7" y="3" width="12" height="16" rx="2" fill="#93c5fd" />
            <circle cx="18" cy="11" r="7" fill="#1e3a8a" />
            <text x="18" y="15" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle">1</text>
            {/* Priority Badge */}
            <circle cx="34" cy="-2" r="7" fill="#10b981" />
            <text x="34" y="2" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">✓</text>
          </g>

          {/* CAR 2 (Red - Entering from South, must yield) */}
          <g transform="translate(188, 175)">
            <rect x="0" y="0" width="22" height="36" rx="5" fill="#dc2626" stroke="#f87171" strokeWidth="2" />
            <rect x="3" y="7" width="16" height="12" rx="2" fill="#fca5a5" />
            <circle cx="11" cy="18" r="7" fill="#7f1d1d" />
            <text x="11" y="22" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle">2</text>
            {/* Trajectory dotted arrow */}
            <path d="M11 0 L11 -30" stroke="#f87171" strokeWidth="3" strokeDasharray="4 4" />
            <polygon points="11,-34 7,-26 15,-26" fill="#f87171" />
          </g>

          {/* Status Banners */}
          <rect x="85" y="8" width="230" height="24" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
          <text x="200" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
            4.3 Aylanma harakat: Aylanadagi transport ustun
          </text>
        </svg>
      );
    }

    // 2. CONTROLLER (DAN XODIMI)
    if (currentType === 'controller') {
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full max-w-lg mx-auto">
          <rect x="0" y="0" width="400" height="240" fill="#090d16" />

          {/* Crossroads */}
          <rect x="0" y="75" width="400" height="90" fill="#1e293b" />
          <rect x="155" y="0" width="90" height="240" fill="#1e293b" />

          {/* Center dashes */}
          <line x1="0" y1="120" x2="145" y2="120" stroke="#facc15" strokeWidth="2" strokeDasharray="8 6" />
          <line x1="255" y1="120" x2="400" y2="120" stroke="#facc15" strokeWidth="2" strokeDasharray="8 6" />
          <line x1="200" y1="0" x2="200" y2="65" stroke="#facc15" strokeWidth="2" strokeDasharray="8 6" />
          <line x1="200" y1="175" x2="200" y2="240" stroke="#facc15" strokeWidth="2" strokeDasharray="8 6" />

          {/* Stop lines */}
          <line x1="155" y1="70" x2="200" y2="70" stroke="#ffffff" strokeWidth="4" />
          <line x1="200" y1="170" x2="245" y2="170" stroke="#ffffff" strokeWidth="4" />

          {/* Traffic Controller Officer (Center) */}
          <g transform="translate(200, 120)">
            <circle cx="0" cy="0" r="26" fill="#0369a1" opacity="0.3" />
            {/* Officer Body */}
            <circle cx="0" cy="-8" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" /> {/* Head */}
            <rect x="-10" y="0" width="20" height="20" rx="3" fill="#1e3a8a" /> {/* Uniform */}
            <rect x="-8" y="2" width="16" height="8" rx="2" fill="#eab308" /> {/* Fluorescent Vest */}
            {/* Extended Arms */}
            <line x1="-10" y1="5" x2="-26" y2="5" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" />
            <line x1="10" y1="5" x2="28" y2="5" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" />
            {/* Striped Baton */}
            <line x1="28" y1="5" x2="46" y2="5" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <line x1="33" y1="5" x2="38" y2="5" stroke="#000000" strokeWidth="4" />
            <line x1="41" y1="5" x2="45" y2="5" stroke="#000000" strokeWidth="4" />
          </g>

          {/* Car 1 (South - Blue) */}
          <g transform="translate(205, 180)">
            <rect x="0" y="0" width="24" height="38" rx="5" fill="#2563eb" stroke="#60a5fa" strokeWidth="2" />
            <circle cx="12" cy="19" r="8" fill="#1e3a8a" />
            <text x="12" y="23" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">1</text>
          </g>

          {/* Car 2 (West - Red) */}
          <g transform="translate(65, 88)">
            <rect x="0" y="0" width="38" height="24" rx="5" fill="#dc2626" stroke="#f87171" strokeWidth="2" />
            <circle cx="19" cy="12" r="8" fill="#7f1d1d" />
            <text x="19" y="16" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">2</text>
          </g>

          {/* Header Note */}
          <rect x="70" y="8" width="260" height="24" rx="6" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
          <text x="200" y="24" fill="#facc15" fontSize="11" fontWeight="bold" textAnchor="middle">
            Tartibga soluvchi (DAN xodimi) ishorasi
          </text>
        </svg>
      );
    }

    // 3. INTERSECTION / PRIORITY JUNCTION
    if (currentType === 'intersection' || currentType === 'priority_junction') {
      const hasGreen = scenarioMeta?.trafficLightColor === 'green';
      const hasTrafficLight = scenarioMeta?.hasTrafficLight;

      return (
        <svg viewBox="0 0 400 240" className="w-full h-full max-w-lg mx-auto">
          <rect x="0" y="0" width="400" height="240" fill="#090d16" />

          {/* Roads */}
          <rect x="0" y="75" width="400" height="90" fill="#1e293b" />
          <rect x="155" y="0" width="90" height="240" fill="#1e293b" />

          {/* Curbs / Sidewalk corners */}
          <rect x="0" y="0" width="150" height="70" fill="#0f172a" rx="6" />
          <rect x="250" y="0" width="150" height="70" fill="#0f172a" rx="6" />
          <rect x="0" y="170" width="150" height="70" fill="#0f172a" rx="6" />
          <rect x="250" y="170" width="150" height="70" fill="#0f172a" rx="6" />

          {/* Yellow centerline dividers */}
          <line x1="0" y1="120" x2="145" y2="120" stroke="#facc15" strokeWidth="2.5" strokeDasharray="10 6" />
          <line x1="255" y1="120" x2="400" y2="120" stroke="#facc15" strokeWidth="2.5" strokeDasharray="10 6" />
          <line x1="200" y1="0" x2="200" y2="65" stroke="#facc15" strokeWidth="2.5" strokeDasharray="10 6" />
          <line x1="200" y1="175" x2="200" y2="240" stroke="#facc15" strokeWidth="2.5" strokeDasharray="10 6" />

          {/* White Stop Lines */}
          <line x1="155" y1="68" x2="200" y2="68" stroke="#ffffff" strokeWidth="4" />
          <line x1="200" y1="172" x2="245" y2="172" stroke="#ffffff" strokeWidth="4" />
          <line x1="148" y1="75" x2="148" y2="120" stroke="#ffffff" strokeWidth="4" />
          <line x1="252" y1="120" x2="252" y2="165" stroke="#ffffff" strokeWidth="4" />

          {/* Road sign mounted on corner (e.g. 2.1 Bosh yo'l or 2.4 Yo'l bering) */}
          <g transform="translate(125, 40)">
            <rect x="14" y="24" width="3" height="30" fill="#94a3b8" />
            <polygon points="15,0 30,15 15,30 0,15" fill="#facc15" stroke="#ffffff" strokeWidth="3" />
            <polygon points="15,5 25,15 15,25 5,15" fill="#eab308" />
            <text x="15" y="44" fill="#facc15" fontSize="8" fontWeight="bold" textAnchor="middle">2.1</text>
          </g>

          {/* Secondary road sign 2.4 (Give way) on West corner */}
          <g transform="translate(120, 140)">
            <polygon points="4,2 26,2 15,24" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
            <text x="15" y="34" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">2.4</text>
          </g>

          {/* Traffic light if present */}
          {hasTrafficLight && (
            <g transform="translate(255, 42)">
              <rect x="0" y="0" width="16" height="36" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <circle cx="8" cy="8" r="4" fill={hasGreen ? '#334155' : '#ef4444'} />
              <circle cx="8" cy="18" r="4" fill="#334155" />
              <circle cx="8" cy="28" r="4" fill={hasGreen ? '#22c55e' : '#334155'} className={hasGreen ? 'animate-pulse' : ''} />
            </g>
          )}

          {/* CAR 1 (Blue - Coming from South) */}
          <g transform="translate(205, 178)">
            <rect x="0" y="0" width="26" height="42" rx="6" fill="#2563eb" stroke="#60a5fa" strokeWidth="2.5" />
            <rect x="3" y="8" width="20" height="14" rx="2" fill="#93c5fd" />
            <circle cx="13" cy="28" r="8" fill="#1e3a8a" />
            <text x="13" y="32" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">1</text>
            {/* Trajectory Arrow (Straight or turn) */}
            <path d="M13 0 L13 -40" stroke="#60a5fa" strokeWidth="3.5" strokeDasharray="4 4" />
            <polygon points="13,-45 8,-36 18,-36" fill="#60a5fa" />
          </g>

          {/* CAR 2 (Red - Coming from West) */}
          <g transform="translate(60, 84)">
            <rect x="0" y="0" width="42" height="26" rx="6" fill="#dc2626" stroke="#f87171" strokeWidth="2.5" />
            <rect x="8" y="3" width="14" height="20" rx="2" fill="#fca5a5" />
            <circle cx="28" cy="13" r="8" fill="#7f1d1d" />
            <text x="28" y="17" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">2</text>
            {/* Trajectory Arrow */}
            <path d="M46 13 L140 13" stroke="#f87171" strokeWidth="3.5" strokeDasharray="4 4" />
            <polygon points="146,13 138,8 138,18" fill="#f87171" />
          </g>

          {/* CAR 3 (Green - Coming from North) */}
          <g transform="translate(165, 18)">
            <rect x="0" y="0" width="26" height="42" rx="6" fill="#16a34a" stroke="#86efac" strokeWidth="2.5" />
            <rect x="3" y="20" width="20" height="14" rx="2" fill="#bbf7d0" />
            <circle cx="13" cy="12" r="8" fill="#14532d" />
            <text x="13" y="16" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">3</text>
            {/* Trajectory */}
            <path d="M13 46 L13 86 L50 86" stroke="#86efac" strokeWidth="3" strokeDasharray="4 4" fill="none" />
            <polygon points="56,86 48,81 48,91" fill="#86efac" />
          </g>

          {/* Header Banner */}
          <rect x="80" y="8" width="240" height="24" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <text x="200" y="24" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
            Chorraha manyovri va o'tish ketma-ketligi
          </text>
        </svg>
      );
    }

    // 4. SPEED RESTRICTION
    if (currentType === 'speed') {
      const speedLimit = topicId === 't-8' && question.id === 'q-107' ? '30' : (signCode?.includes('30') ? '30' : '60');
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full max-w-lg mx-auto">
          <rect x="0" y="0" width="400" height="220" fill="#090d16" />

          {/* Horizon & Sky */}
          <rect x="0" y="0" width="400" height="90" fill="#0f172a" />
          {/* City / Building Skyline silhouettes */}
          <rect x="40" y="45" width="30" height="45" fill="#1e293b" />
          <rect x="75" y="30" width="40" height="60" fill="#1e293b" />
          <rect x="120" y="50" width="25" height="40" fill="#1e293b" />
          <rect x="260" y="35" width="45" height="55" fill="#1e293b" />
          <rect x="310" y="48" width="35" height="42" fill="#1e293b" />

          {/* Asphalt Roadway */}
          <rect x="0" y="90" width="400" height="130" fill="#1e293b" />
          {/* Sidewalk curb */}
          <rect x="0" y="86" width="400" height="6" fill="#64748b" />
          {/* Road center dashed line */}
          <line x1="0" y1="150" x2="400" y2="150" stroke="#facc15" strokeWidth="3.5" strokeDasharray="20 14" />

          {/* Large Road Sign 3.24 on roadside post */}
          <g transform="translate(60, 25)">
            <rect x="22" y="54" width="6" height="95" fill="#94a3b8" />
            <circle cx="25" cy="30" r="30" fill="#ffffff" stroke="#dc2626" strokeWidth="8" />
            <text x="25" y="40" fill="#0f172a" fontSize="26" fontWeight="900" textAnchor="middle">
              {speedLimit}
            </text>
            <rect x="2" y="65" width="46" height="18" rx="3" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
            <text x="25" y="78" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
              km/soat
            </text>
          </g>

          {/* Car driving on the road */}
          <g transform="translate(190, 110)">
            {/* Car body */}
            <rect x="0" y="16" width="110" height="32" rx="8" fill="#2563eb" stroke="#60a5fa" strokeWidth="2" />
            {/* Roof cabin */}
            <path d="M22 16 L38 2 L80 2 L94 16 Z" fill="#1e40af" />
            {/* Windows */}
            <path d="M26 14 L39 5 L56 5 L56 14 Z" fill="#93c5fd" />
            <path d="M60 14 L60 5 L78 5 L88 14 Z" fill="#93c5fd" />
            {/* Headlights */}
            <rect x="104" y="24" width="6" height="10" rx="2" fill="#fef08a" />
            {/* Wheels */}
            <circle cx="28" cy="48" r="12" fill="#0f172a" stroke="#94a3b8" strokeWidth="3" />
            <circle cx="84" cy="48" r="12" fill="#0f172a" stroke="#94a3b8" strokeWidth="3" />
            <circle cx="28" cy="48" r="4" fill="#cbd5e1" />
            <circle cx="84" cy="48" r="4" fill="#cbd5e1" />
          </g>

          {/* Speed Radar badge */}
          <g transform="translate(230, 20)">
            <rect x="0" y="0" width="150" height="36" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="14" y="22" fill="#38bdf8" fontSize="16" fontWeight="900">RADAR</text>
            <text x="80" y="22" fill="#22c55e" fontSize="14" fontWeight="bold">{speedLimit} km/s</text>
          </g>
        </svg>
      );
    }

    // 5. OVERTAKE
    if (currentType === 'overtake') {
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full max-w-lg mx-auto">
          <rect x="0" y="0" width="400" height="220" fill="#090d16" />

          {/* Road */}
          <rect x="0" y="30" width="400" height="160" fill="#1e293b" />
          {/* Dividing centerline */}
          <line x1="0" y1="110" x2="400" y2="110" stroke="#ffffff" strokeWidth="4" strokeDasharray="16 12" />

          {/* Sign 3.20 (No Overtaking) on roadside */}
          <g transform="translate(20, 40)">
            <rect x="14" y="20" width="4" height="60" fill="#94a3b8" />
            <circle cx="16" cy="16" r="16" fill="#ffffff" stroke="#dc2626" strokeWidth="4" />
            <rect x="8" y="14" width="7" height="6" rx="1" fill="#0f172a" />
            <rect x="17" y="14" width="7" height="6" rx="1" fill="#dc2626" />
          </g>

          {/* Slow vehicle (Truck) on right lane */}
          <g transform="translate(180, 125)">
            <rect x="0" y="0" width="90" height="38" rx="4" fill="#475569" stroke="#64748b" strokeWidth="2" />
            <rect x="70" y="3" width="20" height="32" rx="3" fill="#2563eb" />
            <text x="40" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">30 km/s</text>
          </g>

          {/* Overtaking Car (Red) pulling into opposite lane */}
          <g transform="translate(60, 130)">
            <rect x="0" y="0" width="55" height="28" rx="5" fill="#dc2626" stroke="#f87171" strokeWidth="2" />
            <text x="27" y="18" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">A</text>
            {/* Overtaking trajectory curve */}
            <path d="M55 14 Q 130 14 140 60 Q 150 60 250 60 Q 290 60 300 135" fill="none" stroke="#f87171" strokeWidth="3.5" strokeDasharray="5 5" />
            <polygon points="305,140 298,130 306,132" fill="#f87171" />
          </g>

          <rect x="65" y="8" width="270" height="24" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
          <text x="200" y="24" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
            Qarama-qarshi bo‘lak orqali quvib o‘tish qoidasi
          </text>
        </svg>
      );
    }

    // 6. PARKING
    if (currentType === 'parking') {
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full max-w-lg mx-auto">
          <rect x="0" y="0" width="400" height="220" fill="#090d16" />

          {/* Road & Curb */}
          <rect x="0" y="30" width="400" height="130" fill="#1e293b" />
          <rect x="0" y="160" width="400" height="40" fill="#334155" />
          <line x1="0" y1="160" x2="400" y2="160" stroke="#f8fafc" strokeWidth="3" />

          {/* Parking Sign 5.15 on Post */}
          <g transform="translate(40, 50)">
            <rect x="22" y="40" width="5" height="70" fill="#94a3b8" />
            <rect x="0" y="0" width="48" height="48" rx="8" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
            <text x="24" y="36" fill="#ffffff" fontSize="32" fontWeight="900" textAnchor="middle">
              P
            </text>
          </g>

          {/* Parked Cars */}
          <g transform="translate(130, 115)">
            <rect x="0" y="0" width="65" height="34" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2" />
            <rect x="14" y="4" width="28" height="26" rx="2" fill="#a7f3d0" />
            <text x="32" y="22" fill="#064e3b" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>
          </g>

          <g transform="translate(230, 115)">
            <rect x="0" y="0" width="65" height="34" rx="6" fill="#6366f1" stroke="#818cf8" strokeWidth="2" />
            <rect x="14" y="4" width="28" height="26" rx="2" fill="#c7d2fe" />
            <text x="32" y="22" fill="#1e1b4b" fontSize="12" fontWeight="bold" textAnchor="middle">B</text>
          </g>

          {/* Distance Rules Banner */}
          <rect x="70" y="8" width="260" height="24" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
          <text x="200" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
            To'xtash va to'xtab turish (5m, 15m, 50m qoidalari)
          </text>
        </svg>
      );
    }

    // 7. PEDESTRIAN
    if (currentType === 'pedestrian') {
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full max-w-lg mx-auto">
          <rect x="0" y="0" width="400" height="220" fill="#090d16" />

          {/* Roadway */}
          <rect x="0" y="35" width="400" height="130" fill="#1e293b" />
          {/* Sidewalks */}
          <rect x="0" y="20" width="400" height="18" fill="#475569" />
          <rect x="0" y="165" width="400" height="20" fill="#475569" />

          {/* Zebra stripes 1.14.1 */}
          <g fill="#ffffff">
            <rect x="170" y="35" width="16" height="130" />
            <rect x="200" y="35" width="16" height="130" />
            <rect x="230" y="35" width="16" height="130" />
            <rect x="260" y="35" width="16" height="130" />
          </g>

          {/* 5.16.1 Pedestrian Sign on Post */}
          <g transform="translate(285, 30)">
            <rect x="16" y="30" width="4" height="60" fill="#94a3b8" />
            <rect x="0" y="0" width="36" height="36" rx="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
            <circle cx="18" cy="10" r="3" fill="#ffffff" />
            <path d="M15 14 L21 14 L22 22 L17 28 M18 22 L14 28" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Pedestrian crossing */}
          <g transform="translate(210, 65)">
            <circle cx="8" cy="8" r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="1" />
            <path d="M8 14 L8 34 L16 50 M8 34 L0 50" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
            <path d="M-2 22 L18 22" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Car stopped before crosswalk */}
          <g transform="translate(65, 80)">
            <rect x="0" y="0" width="70" height="38" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <rect x="16" y="4" width="28" height="30" rx="2" fill="#bae6fd" />
          </g>

          {/* 5m buffer bracket */}
          <line x1="135" y1="135" x2="170" y2="135" stroke="#f59e0b" strokeWidth="2.5" />
          <line x1="135" y1="128" x2="135" y2="142" stroke="#f59e0b" strokeWidth="2.5" />
          <line x1="170" y1="128" x2="170" y2="142" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="152" y="130" fill="#f59e0b" fontSize="10" fontWeight="900" textAnchor="middle">
            5 metr
          </text>
        </svg>
      );
    }

    // 8. RAILWAY
    if (currentType === 'railway') {
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full max-w-lg mx-auto">
          <rect x="0" y="0" width="400" height="220" fill="#090d16" />

          {/* Road */}
          <rect x="0" y="50" width="400" height="120" fill="#1e293b" />

          {/* Railway Tracks Crossing */}
          <line x1="160" y1="0" x2="230" y2="220" stroke="#94a3b8" strokeWidth="8" />
          <line x1="185" y1="0" x2="255" y2="220" stroke="#94a3b8" strokeWidth="8" />
          {/* Wooden Ties */}
          {Array.from({ length: 9 }).map((_, idx) => (
            <line
              key={idx}
              x1={150 + idx * 10}
              y1={idx * 24}
              x2={205 + idx * 10}
              y2={idx * 24}
              stroke="#78350f"
              strokeWidth="5"
            />
          ))}

          {/* Shlagbaum Barrier & Red Flashing Lights */}
          <g transform="translate(85, 30)">
            <rect x="20" y="30" width="5" height="85" fill="#94a3b8" />
            <circle cx="8" cy="24" r="10" fill="#ef4444" className="animate-pulse" />
            <circle cx="36" cy="24" r="10" fill="#ef4444" className="animate-pulse" />
            {/* Barrier Arm with Red/White Stripes */}
            <line x1="22" y1="65" x2="120" y2="65" stroke="#ffffff" strokeWidth="7" />
            <line x1="40" y1="65" x2="55" y2="65" stroke="#dc2626" strokeWidth="7" />
            <line x1="75" y1="65" x2="90" y2="65" stroke="#dc2626" strokeWidth="7" />
          </g>

          <rect x="60" y="8" width="280" height="24" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
          <text x="200" y="24" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
            Temir yo‘l kesishmasi: Shlagbaumgacha 5m, relsgacha 10m
          </text>
        </svg>
      );
    }

    // 9. MEDICAL
    if (currentType === 'medical') {
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full max-w-lg mx-auto">
          <rect x="0" y="0" width="400" height="220" fill="#090d16" />

          {/* Red Cross Symbol */}
          <g transform="translate(175, 35)">
            <circle cx="25" cy="25" r="44" fill="#dc2626" opacity="0.2" />
            <rect x="18" y="0" width="14" height="50" rx="3" fill="#ef4444" />
            <rect x="0" y="18" width="50" height="14" rx="3" fill="#ef4444" />
          </g>

          {/* CPR Metric Card */}
          <g transform="translate(60, 110)">
            <rect x="0" y="0" width="280" height="60" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="140" y="28" fill="#38bdf8" fontSize="16" fontWeight="900" textAnchor="middle">
              Reanimatsiya nisbati: 30 : 2
            </text>
            <text x="140" y="48" fill="#cbd5e1" fontSize="11" textAnchor="middle">
              30 ta ko'krak qafasini bosish + 2 ta sun'iy nafas
            </text>
          </g>

          <text x="200" y="195" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
            Jgut: yozda ko‘pi bilan 1 soat, qishda 30 daqiqa
          </text>
        </svg>
      );
    }

    // 10. LANE MARKINGS (Yo'l Chiziqlari)
    if (currentType === 'lane') {
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full max-w-lg mx-auto">
          <rect x="0" y="0" width="400" height="220" fill="#090d16" />

          {/* Asphalt 4-Lane Roadway */}
          <rect x="0" y="30" width="400" height="160" fill="#1e293b" />
          {/* Curbs */}
          <rect x="0" y="24" width="400" height="6" fill="#64748b" />
          <rect x="0" y="190" width="400" height="6" fill="#64748b" />

          {/* Lane 1-2 separator (Dashed 1.5) */}
          <line x1="0" y1="70" x2="400" y2="70" stroke="#f8fafc" strokeWidth="2.5" strokeDasharray="14 10" />

          {/* Centerline: 1.3 Double Solid Line OR 1.11 Dash-Solid */}
          <g>
            <line x1="0" y1="106" x2="400" y2="106" stroke="#ffffff" strokeWidth="3" />
            {signCode === '1.11' ? (
              <line x1="0" y1="114" x2="400" y2="114" stroke="#ffffff" strokeWidth="3" strokeDasharray="14 10" />
            ) : (
              <line x1="0" y1="114" x2="400" y2="114" stroke="#ffffff" strokeWidth="3" />
            )}
          </g>

          {/* Lane 3-4 separator */}
          <line x1="0" y1="150" x2="400" y2="150" stroke="#f8fafc" strokeWidth="2.5" strokeDasharray="14 10" />

          {/* Allowed vs Prohibited Arrow Maneuver */}
          <g transform="translate(180, 110)">
            {/* Prohibited crossing red cross */}
            <circle cx="20" cy="0" r="14" fill="#dc2626" opacity="0.9" />
            <line x1="12" y1="-8" x2="28" y2="8" stroke="#ffffff" strokeWidth="3" />
            <line x1="28" y1="-8" x2="12" y2="8" stroke="#ffffff" strokeWidth="3" />
          </g>

          {/* Code badge */}
          <rect x="70" y="8" width="260" height="24" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
          <text x="200" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
            {signCode ? `Yo‘l chizig‘i ${signCode}` : '1.3 Qo‘shaloq yaxlit chiziq (kesib o‘tish taqiqlanadi)'}
          </text>
        </svg>
      );
    }

    // 11. SIGNS (Official Vector Road Sign Catalog Presentation)
    // Renders the authentic vector signs mounted cleanly on roadside poles
    return (
      <div className="w-full h-full flex flex-col items-center justify-center py-3 px-4">
        {/* Road signs container */}
        <div className="flex items-end justify-center gap-6 sm:gap-8 mb-2">
          {signsList.map((code, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              {/* Sign Graphic */}
              <div className="relative">
                <SignGraphic
                  signCode={code}
                  size={isModal ? 130 : 96}
                  className="filter drop-shadow-xl transition-transform group-hover:scale-105"
                />
              </div>

              {/* Realistic Galvanized Steel Post */}
              <div className="w-2.5 h-10 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b shadow-sm" />

              {/* Code Pill Badge */}
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-black text-amber-400 shadow-md">
                № {code}
              </span>
            </div>
          ))}
        </div>

        {/* Informative text below the signs */}
        <div className="text-center mt-1">
          <p className="text-xs sm:text-sm font-black text-white tracking-wide">
            O'zbekiston Davlat Standarti (YHQ 1-ilova)
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Belgi talablariga va yo'l chiziqlariga qat'iy rioya qiling
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full min-h-[220px] sm:min-h-[260px] bg-slate-950 rounded-2xl overflow-hidden relative shadow-lg border border-slate-800 my-4 flex items-center justify-center select-none group">
        {/* Dark Asphalt Texture Grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Top-Left Question Number Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-black text-slate-200 z-10 flex items-center gap-1.5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>№ {globalIndex || questionNumber || 1} — Vaziyat tasviri</span>
        </div>

        {/* Top-Right HD Kattalashtirish (Zoom Modal) Button */}
        <button
          onClick={() => setIsZoomOpen(true)}
          title="Rasmni katta ekranda ko'rish (HD)"
          className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500 text-xs font-bold transition-all z-10 flex items-center gap-1.5 shadow-md"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">HD Kattalashtirish</span>
        </button>

        {/* Main Rendered Graphic */}
        <div className="w-full h-full flex items-center justify-center p-2">
          {renderDiagramContent(false)}
        </div>
      </div>

      {/* FULL-SCREEN HD ZOOM MODAL */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="w-full flex items-center gap-2 pb-3 mb-4 border-b border-slate-800">
              <ZoomIn className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-black text-white">
                Savol № {globalIndex || questionNumber || 1} — HD Yo'l Vaziyati
              </h3>
            </div>

            {/* Enlarged Diagram */}
            <div className="w-full py-4 flex items-center justify-center min-h-[300px]">
              {renderDiagramContent(true)}
            </div>

            {/* Footnote */}
            <div className="w-full mt-4 p-3 rounded-xl bg-slate-800/70 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                Ushbu diagramma O'zbekiston Respublikasi Yo'l harakati qoidalarining rasmiy davlat imtihon biletlari talablari asosida tuzilgan.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
