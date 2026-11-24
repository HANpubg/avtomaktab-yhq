import React from 'react';
import { RoadSign } from '../types';

interface SignGraphicProps {
  sign?: RoadSign;
  signCode?: string;
  size?: number;
  className?: string;
}

export const SignGraphic: React.FC<SignGraphicProps> = ({
  sign,
  signCode,
  size = 72,
  className = ''
}) => {
  const code = sign?.code || signCode || '1.1';

  // Determine standard shape, bgColor, and borderColor based on official Uzbekistan YHQ rules
  let shape: 'triangle' | 'inverted-triangle' | 'circle' | 'diamond' | 'octagon' | 'square' | 'rectangle' = 'square';
  let bgColor = '#ffffff';
  let borderColor = '#dc2626';

  if (code.startsWith('1.')) {
    shape = 'triangle';
    bgColor = code === '1.25' ? '#fef08a' : '#ffffff'; // 1.25 temporary work sign is yellow
    borderColor = '#dc2626';
  } else if (code === '2.1') {
    shape = 'diamond';
    bgColor = '#facc15';
    borderColor = '#ffffff';
  } else if (code === '2.2') {
    shape = 'diamond';
    bgColor = '#94a3b8';
    borderColor = '#ffffff';
  } else if (code === '2.4') {
    shape = 'inverted-triangle';
    bgColor = '#ffffff';
    borderColor = '#dc2626';
  } else if (code === '2.5') {
    shape = 'octagon';
    bgColor = '#dc2626';
    borderColor = '#ffffff';
  } else if (code === '2.6') {
    shape = 'circle';
    bgColor = '#ffffff';
    borderColor = '#dc2626';
  } else if (code === '2.7') {
    shape = 'square';
    bgColor = '#2563eb';
    borderColor = '#ffffff';
  } else if (code.startsWith('3.')) {
    shape = 'circle';
    bgColor = code === '3.1' ? '#dc2626' : (code === '3.27' || code === '3.28') ? '#2563eb' : '#ffffff';
    borderColor = '#dc2626';
  } else if (code.startsWith('4.')) {
    shape = 'circle';
    bgColor = '#2563eb';
    borderColor = '#ffffff';
  } else if (code.startsWith('5.')) {
    if (code === '5.1' || code === '5.3') {
      shape = 'rectangle';
      bgColor = code === '5.1' ? '#15803d' : '#2563eb'; // Motorway is green in UZ YHQ
      borderColor = '#ffffff';
    } else if (code === '5.22') {
      shape = 'rectangle';
      bgColor = '#ffffff';
      borderColor = '#0f172a';
    } else if (code === '5.23') {
      shape = 'rectangle';
      bgColor = '#2563eb';
      borderColor = '#ffffff';
    } else {
      shape = 'square';
      bgColor = '#2563eb';
      borderColor = '#ffffff';
    }
  } else if (code.startsWith('6.')) {
    shape = 'rectangle';
    bgColor = '#2563eb';
    borderColor = '#ffffff';
  } else if (code.startsWith('7.')) {
    shape = 'rectangle';
    bgColor = '#ffffff';
    borderColor = '#0f172a';
  }

  // Override if explicitly provided by RoadSign object
  if (sign?.shape) {
    if (sign.shape === 'triangle' && code === '2.4') {
      shape = 'inverted-triangle';
    } else {
      shape = sign.shape as any;
    }
  }
  if (sign?.bgColor) bgColor = sign.bgColor;
  if (sign?.borderColor) borderColor = sign.borderColor;

  const renderContent = () => {
    // 2.5 STOP
    if (code === '2.5') {
      return (
        <text
          x="50"
          y="58"
          fill="#ffffff"
          fontSize="22"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1.5"
        >
          STOP
        </text>
      );
    }

    // 3.24 Speed Limit (e.g. 60, 30, 80)
    if (code === '3.24' || code.includes('60') || code.includes('30')) {
      const speedValue = code.includes('30') ? '30' : code.includes('80') ? '80' : '60';
      return (
        <text
          x="50"
          y="62"
          fill="#0f172a"
          fontSize="32"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          {speedValue}
        </text>
      );
    }

    // 4.6 Minimum speed
    if (code === '4.6') {
      return (
        <text
          x="50"
          y="62"
          fill="#ffffff"
          fontSize="32"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          40
        </text>
      );
    }

    // 3.1 No Entry (G'isht)
    if (code === '3.1') {
      return <rect x="20" y="44" width="60" height="13" rx="2.5" fill="#ffffff" />;
    }

    // 3.2 Movement Prohibited (Empty white circle with red border)
    if (code === '3.2') {
      return null;
    }

    // 2.1 Bosh yo'l (Priority Road)
    if (code === '2.1') {
      return <polygon points="50,20 80,50 50,80 20,50" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />;
    }

    // 2.2 Bosh yo'l oxiri
    if (code === '2.2') {
      return (
        <g>
          <polygon points="50,20 80,50 50,80 20,50" fill="#94a3b8" stroke="#ffffff" strokeWidth="3" />
          <line x1="20" y1="80" x2="80" y2="20" stroke="#0f172a" strokeWidth="8" />
        </g>
      );
    }

    // 2.3.1 Ikkinchi darajali yo'l bilan kesishuv
    if (code === '2.3.1') {
      return (
        <g stroke="#0f172a" strokeWidth="8" fill="none">
          <line x1="50" y1="36" x2="50" y2="76" />
          <line x1="30" y1="56" x2="70" y2="56" strokeWidth="4" />
        </g>
      );
    }

    // 2.4 Give Way (Inverted triangle)
    if (code === '2.4') {
      return null;
    }

    // 2.6 Priority over oncoming (white circle, red left arrow, black right arrow)
    if (code === '2.6') {
      return (
        <g>
          <line x1="38" y1="26" x2="38" y2="72" stroke="#dc2626" strokeWidth="6" />
          <polygon points="38,20 30,32 46,32" fill="#dc2626" />
          <line x1="62" y1="72" x2="62" y2="26" stroke="#0f172a" strokeWidth="6" />
          <polygon points="62,78 54,66 70,66" fill="#0f172a" />
        </g>
      );
    }

    // 2.7 Priority oncoming (Blue square, white left arrow, red right arrow)
    if (code === '2.7') {
      return (
        <g>
          <line x1="38" y1="74" x2="38" y2="26" stroke="#ffffff" strokeWidth="7" />
          <polygon points="38,18 28,32 48,32" fill="#ffffff" />
          <line x1="62" y1="28" x2="62" y2="72" stroke="#dc2626" strokeWidth="6" />
          <polygon points="62,78 54,66 70,66" fill="#dc2626" />
        </g>
      );
    }

    // 3.20 No overtaking (red car and black car)
    if (code === '3.20') {
      return (
        <g transform="translate(18, 38)">
          <rect x="0" y="4" width="28" height="16" rx="4" fill="#0f172a" />
          <rect x="36" y="4" width="28" height="16" rx="4" fill="#dc2626" />
          <circle cx="6" cy="20" r="3" fill="#64748b" />
          <circle cx="22" cy="20" r="3" fill="#64748b" />
          <circle cx="42" cy="20" r="3" fill="#64748b" />
          <circle cx="58" cy="20" r="3" fill="#64748b" />
        </g>
      );
    }

    // 3.27 No stopping (blue with red X)
    if (code === '3.27') {
      return (
        <g>
          <line x1="16" y1="16" x2="84" y2="84" stroke="#dc2626" strokeWidth="8" />
          <line x1="84" y1="16" x2="16" y2="84" stroke="#dc2626" strokeWidth="8" />
        </g>
      );
    }

    // 3.28 No parking (blue with single red slash)
    if (code === '3.28') {
      return <line x1="16" y1="16" x2="84" y2="84" stroke="#dc2626" strokeWidth="8" />;
    }

    // 3.18.1 Turn right prohibited
    if (code === '3.18.1') {
      return (
        <g>
          <path d="M40 70 L40 45 Q40 35 55 35 L68 35" fill="none" stroke="#0f172a" strokeWidth="6" />
          <polygon points="76,35 64,28 64,42" fill="#0f172a" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" strokeWidth="6" />
        </g>
      );
    }

    // 3.18.2 Turn left prohibited
    if (code === '3.18.2') {
      return (
        <g>
          <path d="M60 70 L60 45 Q60 35 45 35 L32 35" fill="none" stroke="#0f172a" strokeWidth="6" />
          <polygon points="24,35 36,28 36,42" fill="#0f172a" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" strokeWidth="6" />
        </g>
      );
    }

    // 3.19 U-turn prohibited
    if (code === '3.19') {
      return (
        <g>
          <path d="M62 70 L62 45 A15 15 0 0 0 32 45 L32 55" fill="none" stroke="#0f172a" strokeWidth="6" />
          <polygon points="32,65 24,52 40,52" fill="#0f172a" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" strokeWidth="6" />
        </g>
      );
    }

    // 4.1.1 Straight only
    if (code === '4.1.1') {
      return <path d="M50 18 L64 38 L54 38 L54 78 L46 78 L46 38 L36 38 Z" fill="#ffffff" />;
    }

    // 4.1.2 Right only
    if (code === '4.1.2') {
      return <path d="M82 50 L62 35 L62 45 L25 45 L25 55 L62 55 L62 65 Z" fill="#ffffff" />;
    }

    // 4.1.3 Left only
    if (code === '4.1.3') {
      return <path d="M18 50 L38 35 L38 45 L75 45 L75 55 L38 55 L38 65 Z" fill="#ffffff" />;
    }

    // 4.1.4 Straight or right
    if (code === '4.1.4') {
      return (
        <g fill="#ffffff">
          <path d="M50 18 L62 34 L54 34 L54 76 L46 76 L46 34 L38 34 Z" />
          <path d="M78 54 L64 42 L64 50 L52 50 L52 58 L64 58 L64 66 Z" />
        </g>
      );
    }

    // 4.1.5 Straight or left
    if (code === '4.1.5') {
      return (
        <g fill="#ffffff">
          <path d="M50 18 L62 34 L54 34 L54 76 L46 76 L46 34 L38 34 Z" />
          <path d="M22 54 L36 42 L36 50 L48 50 L48 58 L36 58 L36 66 Z" />
        </g>
      );
    }

    // 4.3 Roundabout arrows
    if (code === '4.3') {
      return (
        <g fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round">
          <path d="M50 24 A 26 26 0 0 1 74 60" />
          <polygon points="76,64 78,50 66,58" fill="#ffffff" stroke="none" />
          <path d="M70 65 A 26 26 0 0 1 28 65" />
          <polygon points="24,62 38,64 30,52" fill="#ffffff" stroke="none" />
          <path d="M28 60 A 26 26 0 0 1 50 24" />
          <polygon points="52,20 48,34 58,30" fill="#ffffff" stroke="none" />
        </g>
      );
    }

    // 5.1 Motorway / Highway
    if (code === '5.1') {
      return (
        <g stroke="#ffffff" strokeWidth="4" fill="none">
          <line x1="28" y1="18" x2="22" y2="82" strokeWidth="6" />
          <line x1="72" y1="18" x2="78" y2="82" strokeWidth="6" />
          <line x1="50" y1="18" x2="50" y2="35" strokeDasharray="4 4" strokeWidth="3" />
          <line x1="50" y1="45" x2="50" y2="82" strokeDasharray="4 4" strokeWidth="3" />
          <line x1="16" y1="50" x2="84" y2="50" strokeWidth="7" />
        </g>
      );
    }

    // 5.3 Express road (Car silhouette)
    if (code === '5.3') {
      return (
        <g fill="#ffffff">
          <rect x="25" y="44" width="50" height="20" rx="5" />
          <circle cx="37" cy="65" r="6" fill="#0f172a" />
          <circle cx="63" cy="65" r="6" fill="#0f172a" />
          <path d="M35 44 L42 32 L58 32 L65 44 Z" />
        </g>
      );
    }

    // 5.5 One way road (large white straight arrow)
    if (code === '5.5') {
      return <path d="M50 16 L70 38 L57 38 L57 82 L43 82 L43 38 L30 38 Z" fill="#ffffff" />;
    }

    // 5.15 Parking (P)
    if (code === '5.15') {
      return (
        <text
          x="50"
          y="66"
          fill="#ffffff"
          fontSize="46"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          P
        </text>
      );
    }

    // 5.16.1 Pedestrian crossing sign
    if (code === '5.16.1') {
      return (
        <g fill="#ffffff">
          <circle cx="50" cy="28" r="7" />
          <path d="M45 38 L55 38 L58 58 L66 78 L58 78 L52 64 L48 78 L40 78 L46 56 Z" />
          <rect x="20" y="80" width="60" height="5" fill="#ffffff" />
        </g>
      );
    }

    // 5.22 Aholi punkti oq fon (TOSHKENT)
    if (code === '5.22') {
      return (
        <text
          x="50"
          y="56"
          fill="#0f172a"
          fontSize="14"
          fontWeight="900"
          textAnchor="middle"
          letterSpacing="1"
          fontFamily="system-ui, sans-serif"
        >
          TOSHKENT
        </text>
      );
    }

    // 5.23 Aholi punkti ko'k fon (SAMARQAND)
    if (code === '5.23') {
      return (
        <text
          x="50"
          y="56"
          fill="#ffffff"
          fontSize="13"
          fontWeight="900"
          textAnchor="middle"
          letterSpacing="1"
          fontFamily="system-ui, sans-serif"
        >
          SAMARQAND
        </text>
      );
    }

    // 6.3 Fuel / Gas station (AYQSh)
    if (code === '6.3') {
      return (
        <g>
          {/* Inner white field */}
          <rect x="20" y="22" width="60" height="56" rx="4" fill="#ffffff" />
          {/* Pump nozzle & station */}
          <rect x="30" y="32" width="22" height="36" rx="3" fill="#0f172a" />
          <rect x="34" y="36" width="14" height="12" fill="#ffffff" />
          <path d="M52 40 L60 40 L60 55 L65 55 L65 48" fill="none" stroke="#0f172a" strokeWidth="3" />
        </g>
      );
    }

    // 6.11 Dam olish joyi (Tree & Bench)
    if (code === '6.11') {
      return (
        <g>
          <rect x="20" y="22" width="60" height="56" rx="4" fill="#ffffff" />
          {/* Pine Tree */}
          <polygon points="40,32 30,50 35,50 26,64 45,64" fill="#15803d" />
          <rect x="38" y="64" width="4" height="6" fill="#78350f" />
          {/* Table / Bench */}
          <line x1="50" y1="56" x2="68" y2="56" stroke="#0f172a" strokeWidth="4" />
          <line x1="56" y1="56" x2="56" y2="70" stroke="#0f172a" strokeWidth="3" />
        </g>
      );
    }

    // 6.1 Medical point
    if (code === '6.1' || code === '6.2') {
      return (
        <g>
          <rect x="20" y="22" width="60" height="56" rx="4" fill="#ffffff" />
          <rect x="44" y="32" width="12" height="36" rx="2" fill="#dc2626" />
          <rect x="32" y="44" width="36" height="12" rx="2" fill="#dc2626" />
        </g>
      );
    }

    // 1.25 Road works worker
    if (code === '1.25') {
      return (
        <g fill="#0f172a" stroke="#0f172a">
          <circle cx="50" cy="40" r="5" />
          <line x1="50" y1="45" x2="45" y2="65" strokeWidth="4" />
          <line x1="45" y1="65" x2="35" y2="80" strokeWidth="4" />
          <line x1="45" y1="65" x2="55" y2="80" strokeWidth="4" />
          <line x1="47" y1="52" x2="68" y2="72" strokeWidth="3" />
          <polygon points="68,70 76,78 65,82" fill="#0f172a" />
        </g>
      );
    }

    // 1.23 Children
    if (code === '1.23') {
      return (
        <g fill="#0f172a">
          <circle cx="44" cy="42" r="5" />
          <path d="M40 49 L48 49 L50 64 L44 78 L38 78 L43 64 Z" />
          <circle cx="60" cy="50" r="4" />
          <path d="M57 55 L63 55 L65 68 L60 78 L55 78 Z" />
        </g>
      );
    }

    // 1.1 Railway with barrier
    if (code === '1.1') {
      return (
        <g stroke="#0f172a" strokeWidth="3" fill="none">
          <line x1="28" y1="42" x2="72" y2="42" />
          <line x1="28" y1="58" x2="72" y2="58" />
          <line x1="34" y1="36" x2="34" y2="72" />
          <line x1="44" y1="36" x2="44" y2="72" />
          <line x1="56" y1="36" x2="56" y2="72" />
          <line x1="66" y1="36" x2="66" y2="72" />
        </g>
      );
    }

    // 1.2 Railway without barrier (Cross of St. Andrew)
    if (code === '1.2') {
      return (
        <g stroke="#0f172a" strokeWidth="6" strokeLinecap="round">
          <line x1="34" y1="44" x2="66" y2="72" />
          <line x1="66" y1="44" x2="34" y2="72" />
        </g>
      );
    }

    // 1.8 Traffic light warning
    if (code === '1.8') {
      return (
        <g>
          <rect x="42" y="36" width="16" height="42" rx="4" fill="#0f172a" />
          <circle cx="50" cy="43" r="4" fill="#ef4444" />
          <circle cx="50" cy="57" r="4" fill="#facc15" />
          <circle cx="50" cy="71" r="4" fill="#22c55e" />
        </g>
      );
    }

    // 1.11.1 Sharp turn right
    if (code === '1.11.1') {
      return (
        <g stroke="#0f172a" strokeWidth="7" fill="none" strokeLinecap="round">
          <path d="M40 76 L40 54 Q40 40 58 40 L64 40" />
          <polygon points="68,40 58,34 58,46" fill="#0f172a" stroke="none" />
        </g>
      );
    }

    // 1.11.2 Sharp turn left
    if (code === '1.11.2') {
      return (
        <g stroke="#0f172a" strokeWidth="7" fill="none" strokeLinecap="round">
          <path d="M60 76 L60 54 Q60 40 42 40 L36 40" />
          <polygon points="32,40 42,34 42,46" fill="#0f172a" stroke="none" />
        </g>
      );
    }

    // 7.13 Priority road direction
    if (code === '7.13') {
      return (
        <g stroke="#0f172a" fill="none">
          <rect x="18" y="18" width="64" height="64" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
          <line x1="50" y1="20" x2="50" y2="80" stroke="#94a3b8" strokeWidth="3" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="#94a3b8" strokeWidth="3" />
          <path d="M50 80 L50 50 L20 50" stroke="#0f172a" strokeWidth="12" strokeLinecap="square" />
        </g>
      );
    }

    // 7.2.1 Zone of action (↑ 100 m ↑)
    if (code === '7.2.1') {
      return (
        <g>
          <line x1="26" y1="70" x2="26" y2="30" stroke="#0f172a" strokeWidth="4" />
          <polygon points="26,24 20,34 32,34" fill="#0f172a" />
          <line x1="74" y1="70" x2="74" y2="30" stroke="#0f172a" strokeWidth="4" />
          <polygon points="74,24 68,34 80,34" fill="#0f172a" />
          <text
            x="50"
            y="56"
            fill="#0f172a"
            fontSize="15"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            100 m
          </text>
        </g>
      );
    }

    // Default: Crisp sign code badge
    return (
      <text
        x="50"
        y="58"
        fill={bgColor === '#ffffff' ? '#0f172a' : '#ffffff'}
        fontSize="17"
        fontWeight="900"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        {code}
      </text>
    );
  };

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 drop-shadow select-none transition-transform hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title={`Yo'l belgisi № ${code}`}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* Triangle (Warning) */}
        {shape === 'triangle' && (
          <polygon
            points="50,10 94,88 6,88"
            fill={bgColor}
            stroke={borderColor}
            strokeWidth="11"
            strokeLinejoin="round"
          />
        )}

        {/* Inverted Triangle (2.4 Yo'l bering) */}
        {shape === 'inverted-triangle' && (
          <polygon
            points="8,12 92,12 50,88"
            fill={bgColor}
            stroke={borderColor}
            strokeWidth="11"
            strokeLinejoin="round"
          />
        )}

        {/* Circle */}
        {shape === 'circle' && (
          <circle
            cx="50"
            cy="50"
            r="44"
            fill={code === '3.1' ? '#dc2626' : bgColor}
            stroke={borderColor}
            strokeWidth="10"
          />
        )}

        {/* Diamond (2.1 Priority Road) */}
        {shape === 'diamond' && (
          <polygon
            points="50,6 94,50 50,94 6,50"
            fill={bgColor}
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinejoin="round"
          />
        )}

        {/* Octagon (2.5 STOP) */}
        {shape === 'octagon' && (
          <polygon
            points="28,6 72,6 94,28 94,72 72,94 28,94 6,72 6,28"
            fill="#dc2626"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinejoin="round"
          />
        )}

        {/* Square */}
        {shape === 'square' && (
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="12"
            fill={bgColor}
            stroke="#ffffff"
            strokeWidth="5"
          />
        )}

        {/* Rectangle */}
        {shape === 'rectangle' && (
          <rect
            x="6"
            y="14"
            width="88"
            height="72"
            rx="8"
            fill={bgColor}
            stroke={borderColor}
            strokeWidth={code.startsWith('7.') ? '3' : '5'}
          />
        )}

        {/* Content */}
        {renderContent()}
      </svg>
    </div>
  );
};
