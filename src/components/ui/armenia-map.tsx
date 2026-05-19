'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Clock, Euro, ArrowRight, Compass, Sparkles } from 'lucide-react'
import { tours, type Tour } from '@/lib/tours-data'
import { useLocale } from '@/hooks/use-locale'
import Image from 'next/image'

interface ArmeniaMapProps {
  onSelectTour: (tour: Tour) => void
}

const LANDMARK_INFOS = {
  Yerevan: {
    en: {
      name: 'Yerevan & Republic Square',
      region: 'Yerevan',
      desc: 'The pink capital of Armenia, one of the oldest cities in the world. Famous for its pink tuff architecture, the grand Republic Square fountains, and the Cascade monument offering views of Ararat.',
    },
    de: {
      name: 'Eriwan & Platz der Republik',
      region: 'Yerevan',
      desc: 'Die rosa Hauptstadt Armeniens, eine der ältesten Städte der Welt. Berühmt für ihre Architektur aus rosa Tuffstein, die Springbrunnen auf dem Platz der Republik und das Kaskaden-Denkmal mit Blick auf den Ararat.',
    },
    ru: {
      name: 'Ереван и Площадь Республики',
      region: 'Yerevan',
      desc: 'Розовая столица Армении, один из древнейших городов мира. Знаменит своей архитектурой из розового туфа, фонтанами на площади Республики и монументом Каскад с видом на Арарат.',
    },
  },
  Dilijan: {
    en: {
      name: 'Dilijan National Park',
      region: 'Tavush',
      desc: 'Often called "Armenian Switzerland", Dilijan is a lush forested paradise. High alpine lakes, dense oak forests, and ancient medieval monasteries like Haghartsin and Goshavank are hidden in its misty woods.',
    },
    de: {
      name: 'Dilidschan-Nationalpark',
      region: 'Tavush',
      desc: 'Dilidschan, oft als "Armenische Schweiz" bezeichnet, ist ein üppig bewaldetes Paradies. Hochalpene Bergseen, dichte Eichenwälder und mittelalterliche Klöster wie Haghartsin und Goschawank liegen in seinen nebligen Wäldern verborgen.',
    },
    ru: {
      name: 'Дилижанский Национальный Парк',
      region: 'Tavush',
      desc: 'Дилижан, который часто называют «Армянской Швейцарией», представляет собой густой лесной рай. В его туманных лесах скрыты высокогорные озера, дубравы и древние монастыри Ахарцин и Гошаванк.',
    },
  },
  Sevan: {
    en: {
      name: 'Lake Sevan & Sevanavank',
      region: 'Gegharkunik',
      desc: 'The blue gem of Armenia, Lake Sevan is one of the largest high-altitude freshwater lakes in the world. Perched on its peninsula is the iconic 9th-century Sevanavank monastery, looking over deep turquoise waters.',
    },
    de: {
      name: 'Sewansee & Sewanawank',
      region: 'Gegharkunik',
      desc: 'Der Sewansee, das blaue Juwel Armeniens, ist einer der größten Süßwasser-Hochgebirgsseen der Welt. Auf seiner Halbinsel thront das berühmte Sewanawank-Kloster aus dem 9. Jahrhundert mit Blick auf das türkisfarbene Wasser.',
    },
    ru: {
      name: 'Озеро Севан и Севанаванк',
      region: 'Gegharkunik',
      desc: 'Голубая жемчужина Армении, озеро Севан — одно из крупнейших высокогорных пресных озер в мире. На его полуострове возвышается культовый монастырь Севанаванк IX века, смотрящий на бирюзовые воды.',
    },
  },
  Garni: {
    en: {
      name: 'Garni Pagan Temple & Geghard',
      region: 'Kotayk',
      desc: 'Explore Garni, the only standing Greco-Roman colonnaded temple in the former Soviet Union, and Geghard, the legendary UNESCO-listed cave monastery carved directly out of the massive rock walls of the Azat river gorge.',
    },
    de: {
      name: 'Heidnischer Tempel Garni & Geghard',
      region: 'Kotayk',
      desc: 'Erkunden Sie Garni, den einzigen erhaltenen griechisch-römischen Säulentempel der ehemaligen Sowjetunion, und Geghard, das legendäre UNESCO-Höhlenkloster, das direkt aus den massiven Felswänden der Asat-Schlucht gehauen wurde.',
    },
    ru: {
      name: 'Языческий Храм Гарни и Гегард',
      region: 'Kotayk',
      desc: 'Исследуйте Гарни — единственный сохранившийся греко-римский колонный храм на территории бывшего СССР, и Гегард — легендарный пещерный монастырь ЮНЕСКО, высеченный в скалах ущелья реки Азат.',
    },
  },
  Ararat: {
    en: {
      name: 'Mount Ararat & Khor Virap',
      region: 'Ararat',
      desc: 'The biblical heartland. Khor Virap monastery offers the most spectacular view of the majestic, snow-capped Mount Ararat. This is where St. Gregory the Illuminator was imprisoned, leading to Armenia becoming the first Christian nation.',
    },
    de: {
      name: 'Berg Ararat & Chor Wirap',
      region: 'Ararat',
      desc: 'Das biblische Kernland. Das Kloster Chor Wirap bietet den spektakulärsten Blick auf den majestätischen, schneebedeckten Berg Ararat. Hier wurde der heilige Gregor der Erleuchter gefangen gehalten, woraufhin Armenien das erste christliche Land wurde.',
    },
    ru: {
      name: 'Гора Арарат и Хор Вирап',
      region: 'Ararat',
      desc: 'Библейские земли Армении. Из монастыря Хор Вирап открывается самый захватывающий вид на величественную заснеженную гору Арарат. Здесь был заточен Григорий Просветитель, после чего Армения стала первой христианской страной.',
    },
  },
  Tatev: {
    en: {
      name: 'Tatev Monastery & Wings of Tatev',
      region: 'Syunik',
      desc: 'Built on the edge of a deep basalt gorge in the rugged south. Tatev is reached by the record-breaking "Wings of Tatev" cableway, gliding over deep canyons to a medieval fortress monastery that once was a high scholarly university.',
    },
    de: {
      name: 'Kloster Tatev & Flügel von Tatev',
      region: 'Syunik',
      desc: 'Erbaut am Rande einer tiefen Basaltschlucht im schroffen Süden. Tatev wird mit der rekordverdächtigen Seilbahn "Flügel von Tatev" erreicht, die über tiefe Schluchten zu einem mittelalterlichen Festungskloster gleitet.',
    },
    ru: {
      name: 'Монастырь Татев и Крылья Татева',
      region: 'Syunik',
      desc: 'Построенный на краю глубокого базальтового ущелья на суровом юге. До Татева можно добраться по рекордной канатной дороге «Крылья Татева», парящей над глубокими каньонами к средневековому монастырю-крепости.',
    },
  },
}

export function ArmeniaMap({ onSelectTour }: ArmeniaMapProps) {
  const { locale } = useLocale()
  const [selectedLandmark, setSelectedLandmark] = useState<keyof typeof LANDMARK_INFOS | null>('Tatev')

  const currentTours = useMemo(() => {
    if (!selectedLandmark) return []
    const mappedRegion = LANDMARK_INFOS[selectedLandmark].en.region
    return tours.filter(
      (t) =>
        t.region === mappedRegion ||
        (t.region === 'Multiple' &&
          t.name.en.toLowerCase().includes(mappedRegion.toLowerCase()))
    )
  }, [selectedLandmark])

  const landmarkInfo = useMemo(() => {
    if (!selectedLandmark) return null
    return LANDMARK_INFOS[selectedLandmark][locale as 'en' | 'de' | 'ru'] || LANDMARK_INFOS[selectedLandmark].en
  }, [selectedLandmark, locale])

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start mt-6 max-w-6xl mx-auto">
      {/* ─── Embedded Styles for River Path golden Flow lights ─── */}
      <style>{`
        @keyframes routeFlow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -20;
          }
        }
        .animated-river-route {
          stroke-dasharray: 6, 4;
          animation: routeFlow 1.2s linear infinite;
        }
        .fairytale-border {
          stroke-dasharray: 12, 6;
          animation: routeFlow 8s linear infinite;
        }
      `}</style>

      {/* Map Column */}
      <div className="lg:col-span-7 flex justify-center relative">
        <div className="w-full max-w-[580px] aspect-[4/3.2] relative rounded-3xl p-4 sm:p-5 border border-emerald-900/40 bg-[#021c15] shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Subtle Armenian Flag Accent paint overlay */}
          <div className="absolute top-0 left-0 w-full h-1.5 flex z-10">
            <div className="flex-1 h-full bg-[#E30A17]/80" />
            <div className="flex-1 h-full bg-[#0033A0]/80" />
            <div className="flex-1 h-full bg-[#F2A800]/80" />
          </div>

          <svg
            viewBox="0 0 700 560"
            className="w-full h-full text-foreground/20 select-none overflow-visible"
            style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.6))' }}
          >
            {/* Background fairytales stars */}
            <g className="fill-yellow-200/20">
              <circle cx="80" cy="90" r="1.5" />
              <circle cx="150" cy="50" r="1" />
              <circle cx="480" cy="60" r="2" className="animate-pulse" />
              <circle cx="610" cy="180" r="1.5" />
              <circle cx="120" cy="440" r="1" />
              <circle cx="280" cy="510" r="2" />
              <circle cx="580" cy="420" r="1.5" className="animate-pulse" />
            </g>

            {/* Fairytale Corner Pomegranates & Border Framing */}
            <rect
              x="12"
              y="12"
              width="676"
              height="536"
              rx="16"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              className="fairytale-border stroke-yellow-500/30 opacity-70"
            />

            {/* Corner Ornaments */}
            {/* Top Right Pomegranate */}
            <g transform="translate(640, 30)" className="fill-red-600/80 stroke-yellow-600/40 stroke-[0.8px] scale-75">
              <path d="M12 0 C24 0 30 14 26 24 C22 32 12 36 12 36 C12 36 2 32 -2 24 C-6 14 0 0 12 0 Z" />
              <circle cx="12" cy="18" r="8" className="fill-red-700" />
              {/* crown */}
              <polygon points="12,-4 8,-10 12,-7 16,-10" className="fill-red-600" />
              {/* leaf */}
              <path d="M26,10 C32,5 34,12 30,16 C26,20 22,12 26,10 Z" className="fill-emerald-800" />
            </g>
            {/* Bottom Left Pomegranate */}
            <g transform="translate(30, 480)" className="fill-red-600/80 stroke-yellow-600/40 stroke-[0.8px] scale-75">
              <path d="M12 0 C24 0 30 14 26 24 C22 32 12 36 12 36 C12 36 2 32 -2 24 C-6 14 0 0 12 0 Z" />
              <circle cx="12" cy="18" r="8" className="fill-red-700" />
              <polygon points="12,-4 8,-10 12,-7 16,-10" className="fill-red-600" />
              <path d="M-2,15 C-8,10 -10,18 -6,22 C-2,26 2,18 -2,15 Z" className="fill-emerald-800" />
            </g>

            {/* ─── main map landmass (organic curvy outline) ─── */}
            <g>
              {/* Detailed Organic Glowing Shape of Armenia */}
              <path
                d="M 120,130 
                   Q 150,110 200,100
                   Q 260,90 320,105
                   Q 380,120 440,115
                   Q 510,110 540,150
                   Q 570,190 530,225
                   Q 500,250 490,290
                   Q 480,330 460,370
                   Q 440,410 490,430
                   Q 540,450 560,490
                   Q 580,530 500,545
                   Q 440,520 440,470
                   Q 440,440 390,415
                   Q 340,390 310,340
                   Q 280,295 240,285
                   Q 200,275 160,280
                   Q 120,285 110,240
                   Q 100,195 120,170
                   Z"
                className="fill-emerald-950/90 stroke-emerald-400 stroke-[3px] filter drop-shadow-[0_0_15px_rgba(52,211,153,0.35)]"
              />

              {/* Sub-elevation topographic contour outlines inside landmass */}
              <path
                d="M 140,160 Q 200,130 280,140 Q 350,150 420,145 Q 490,140 500,180"
                className="fill-none stroke-emerald-800/40 stroke-[1.5px]"
              />
              <path
                d="M 150,220 Q 200,210 260,210 Q 320,230 380,220"
                className="fill-none stroke-emerald-800/40 stroke-[1.5px]"
              />
              <path
                d="M 330,360 Q 380,350 410,380"
                className="fill-none stroke-emerald-800/40 stroke-[1.5px]"
              />
            </g>

            {/* ─── Animated flowing golden routes (rivers of lights) ─── */}
            <g className="fill-none stroke-yellow-500/80 stroke-[2px]">
              {/* Route: Yerevan (200,240) -> Dilijan (360,150) */}
              <path d="M 200,240 Q 260,180 360,150" className="animated-river-route" />

              {/* Route: Yerevan (200,240) -> Sevan (420,200) */}
              <path d="M 200,240 Q 300,210 420,200" className="animated-river-route" />

              {/* Route: Yerevan (200,240) -> Garni (300,270) */}
              <path d="M 200,240 Q 240,265 300,270" className="animated-river-route" />

              {/* Route: Yerevan (200,240) -> Ararat/Khor Virap (230,340) */}
              <path d="M 200,240 Q 190,290 230,340" className="animated-river-route" />

              {/* Route: Khor Virap (230,340) -> Tatev (480,480) */}
              <path d="M 230,340 Q 320,380 400,430 T 480,480" className="animated-river-route" />
            </g>

            {/* ─── Landmark: Dilijan National Park (Evergreen Pine forest & Deer) ─── */}
            <g
              transform="translate(360, 140)"
              className="cursor-pointer"
              onClick={() => setSelectedLandmark('Dilijan')}
            >
              {/* Glow backdrop on select */}
              {selectedLandmark === 'Dilijan' && (
                <circle r="40" className="fill-yellow-500/10 stroke-yellow-500/30 stroke-[1px] animate-pulse" />
              )}
              {/* Trees */}
              <g className="fill-emerald-600 stroke-emerald-950 stroke-[0.8px]">
                <polygon points="-15,0 -25,20 -5,20" />
                <polygon points="-15,-8 -22,8 -8,8" />
                <polygon points="-5,5 -12,22 2,22" />
                <polygon points="5,8 -2,25 12,25" />
              </g>
              {/* Golden Deer Silhouette */}
              <path
                d="M 5,20 L 7,15 L 9,15 L 10,13 L 8,11 L 9,7 L 11,10 L 12,9 L 10,6 L 12,5 L 14,8 L 16,9 L 17,14 L 18,17 L 19,21 M 13,11 L 11,21 M 7,15 L 5,21"
                className="stroke-yellow-400 stroke-[1.5px] fill-none"
              />
              <text x="0" y="36" className="fill-emerald-100 text-[12px] font-black tracking-widest text-center stroke-emerald-950 stroke-[2.5px]" style={{ paintOrder: 'stroke fill' }} textAnchor="middle">
                DILIJAN
              </text>
            </g>

            {/* ─── Landmark: Lake Sevan & Sevanavank ─── */}
            <g
              transform="translate(420, 200)"
              className="cursor-pointer"
              onClick={() => setSelectedLandmark('Sevan')}
            >
              {/* Glow backdrop on select */}
              {selectedLandmark === 'Sevan' && (
                <circle r="45" className="fill-yellow-500/10 stroke-yellow-500/30 stroke-[1px]" />
              )}
              {/* Sevan Lake Shape */}
              <path
                d="M -30,-5 C -15,-20 15,-20 30,5 C 20,25 -5,15 -30,-5 Z"
                className="fill-cyan-500/80 stroke-cyan-300 stroke-[1.5px] filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              />

              {/* Drifting Sailboat animation */}
              <motion.g
                animate={{
                  x: [-12, 12, -12],
                  y: [-3, 3, -3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="fill-white stroke-cyan-900 stroke-[0.5px]"
              >
                <polygon points="0,0 5,-10 8,0" />
                <rect x="-2" y="0" width="10" height="2" rx="0.5" className="fill-yellow-800" />
              </motion.g>

              {/* Sevanavank Monastery (tiny church icon perched on peninsula) */}
              <g transform="translate(18, -12)" className="fill-yellow-100/90 stroke-yellow-950 stroke-[0.8px] scale-75">
                {/* Church structure */}
                <rect x="-6" y="-6" width="12" height="12" />
                {/* Dome roof */}
                <polygon points="-7,-6 0,-15 7,-6" className="fill-[#b91c1c]" />
                <line x1="0" y1="-18" x2="0" y2="-14" className="stroke-yellow-400 stroke-[1px]" />
              </g>

              <text x="0" y="28" className="fill-cyan-100 text-[12px] font-black tracking-widest stroke-cyan-950 stroke-[2.5px]" style={{ paintOrder: 'stroke fill' }} textAnchor="middle">
                LAKE SEVAN
              </text>
            </g>

            {/* ─── Landmark: Garni Pagan Temple & Geghard ─── */}
            <g
              transform="translate(300, 270)"
              className="cursor-pointer"
              onClick={() => setSelectedLandmark('Garni')}
            >
              {/* Glow backdrop on select */}
              {selectedLandmark === 'Garni' && (
                <circle r="40" className="fill-yellow-500/10 stroke-yellow-500/30 stroke-[1px] animate-pulse" />
              )}
              {/* Garni Columned Roman Temple Icon */}
              <g className="fill-yellow-500 stroke-yellow-950 stroke-[1px] transform scale-90">
                {/* Triangular roof */}
                <polygon points="-16,-12 0,-24 16,-12" />
                {/* Architrave */}
                <rect x="-16" y="-12" width="32" height="4" />
                {/* Columns */}
                <line x1="-12" y1="-8" x2="-12" y2="4" strokeWidth="2" className="stroke-yellow-600" />
                <line x1="-6" y1="-8" x2="-6" y2="4" strokeWidth="2" className="stroke-yellow-600" />
                <line x1="0" y1="-8" x2="0" y2="4" strokeWidth="2" className="stroke-yellow-600" />
                <line x1="6" y1="-8" x2="6" y2="4" strokeWidth="2" className="stroke-yellow-600" />
                <line x1="12" y1="-8" x2="12" y2="4" strokeWidth="2" className="stroke-yellow-600" />
                {/* Foundation base */}
                <rect x="-18" y="4" width="36" height="5" />
              </g>

              <text x="0" y="28" className="fill-yellow-100 text-[12px] font-black tracking-widest stroke-yellow-950 stroke-[2.5px]" style={{ paintOrder: 'stroke fill' }} textAnchor="middle">
                GARNI & GEGHARD
              </text>
            </g>

            {/* ─── Landmark: Mount Ararat & Khor Virap ─── */}
            <g
              transform="translate(230, 350)"
              className="cursor-pointer"
              onClick={() => setSelectedLandmark('Ararat')}
            >
              {/* Glow backdrop on select */}
              {selectedLandmark === 'Ararat' && (
                <circle r="50" className="fill-yellow-500/10 stroke-yellow-500/30 stroke-[1px]" />
              )}

              {/* Mount Ararat Silhouette (Twin Snow peaks) */}
              <g className="stroke-slate-900 stroke-[1px]">
                {/* Little Ararat */}
                <path d="M 5,10 L 25,-10 L 45,10 Z" className="fill-slate-600" />
                <polygon points="20,-5 25,-10 30,-5 25,-2" className="fill-white" />

                {/* Greater Ararat */}
                <path d="M -40,10 L -10,-35 L 20,10 Z" className="fill-slate-500" />
                {/* Snowy cap */}
                <polygon points="-18,-23 -10,-35 -2,-23 -10,-14" className="fill-white" />
              </g>

              {/* Floating Cloud Trails */}
              <motion.path
                d="M -30,-15 Q -10,-25 15,-15 Q 35,-5 25,-25"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{
                  x: [-8, 8, -8],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Khor Virap Monastery at base */}
              <g transform="translate(-10, 8)" className="fill-red-800 stroke-red-950 stroke-[0.8px] scale-75">
                <rect x="-8" y="-6" width="16" height="10" />
                {/* Cone roof */}
                <polygon points="-9,-6 0,-15 9,-6" className="fill-yellow-700" />
              </g>

              <text x="0" y="28" className="fill-slate-100 text-[12px] font-black tracking-widest stroke-slate-950 stroke-[2.5px]" style={{ paintOrder: 'stroke fill' }} textAnchor="middle">
                ARARAT & KHOR VIRAP
              </text>
            </g>

            {/* ─── Landmark: Tatev Monastery & sliding cablecar ─── */}
            <g
              transform="translate(480, 470)"
              className="cursor-pointer"
              onClick={() => setSelectedLandmark('Tatev')}
            >
              {/* Glow backdrop on select */}
              {selectedLandmark === 'Tatev' && (
                <circle r="45" className="fill-yellow-500/10 stroke-yellow-500/30 stroke-[1px]" />
              )}

              {/* Rocky Halidzor Cliffs */}
              <path
                d="M -40,20 L -30,-10 L -10,-2 C 5,-20 25,-15 35,-5 L 45,20 Z"
                className="fill-emerald-900 stroke-emerald-950 stroke-[1px]"
              />

              {/* Tatev Monastery church perched high */}
              <g transform="translate(12, -22)" className="fill-yellow-100 stroke-yellow-950 stroke-[0.8px] scale-[0.65]">
                <rect x="-8" y="-6" width="16" height="12" />
                <polygon points="-9,-6 0,-16 9,-6" className="fill-red-700" />
                <line x1="0" y1="-19" x2="0" y2="-15" className="stroke-yellow-400" />
              </g>

              {/* Sliding Cablecar wire */}
              <line x1="-50" y1="-30" x2="0" y2="-45" className="stroke-yellow-500/40 stroke-[1px]" />

              {/* Cablecar sliding animation */}
              <motion.g
                animate={{
                  x: [-50, -5, -50],
                  y: [-30, -43, -30],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="fill-red-500 stroke-slate-900 stroke-[0.5px]"
              >
                <rect x="-4" y="-3" width="8" height="6" rx="1.5" />
                <line x1="0" y1="-3" x2="0" y2="-8" className="stroke-slate-400 stroke-[0.8px]" />
                {/* little blue window */}
                <rect x="-2" y="-1.5" width="4" height="2" className="fill-cyan-300" />
              </motion.g>

              <text x="0" y="32" className="fill-yellow-100 text-[12px] font-black tracking-widest stroke-emerald-950 stroke-[2.5px]" style={{ paintOrder: 'stroke fill' }} textAnchor="middle">
                TATEV MONASTERY
              </text>
            </g>

            {/* ─── Landmark: Yerevan (Capital center) ─── */}
            <g
              transform="translate(200, 240)"
              className="cursor-pointer"
              onClick={() => setSelectedLandmark('Yerevan')}
            >
              {/* Glow backdrop on select */}
              {selectedLandmark === 'Yerevan' && (
                <circle r="35" className="fill-yellow-500/10 stroke-yellow-500/30 stroke-[1px] animate-pulse" />
              )}
              {/* Yerevan Cascade and pink building */}
              <g className="fill-rose-350 stroke-rose-950 stroke-[0.8px] scale-90">
                {/* cascade steps */}
                <path d="M -15,5 L -10,0 L -5,-5 L 5,-5 L 10,0 L 15,5 Z" className="fill-rose-200/90" />
                {/* Republic Square pink arch */}
                <rect x="-8" y="5" width="16" height="8" className="fill-rose-300/90" />
                <path d="M -4,13 L -4,9 Q 0,7 4,9 L 4,13 Z" className="fill-[#021c15]" />
              </g>

              <text x="0" y="28" className="fill-rose-100 text-[13px] font-black tracking-widest stroke-rose-950 stroke-[2.5px]" style={{ paintOrder: 'stroke fill' }} textAnchor="middle">
                YEREVAN
              </text>
            </g>

            {/* ─── Vintage Rotating Compass Rose ─── */}
            <g transform="translate(90, 420)" className="pointer-events-none opacity-80">
              <motion.g
                animate={{ rotate: 360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <circle r="18" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,2" />
                {/* Points */}
                <polygon points="0,-16 -3,-4 0,0" className="fill-yellow-500" />
                <polygon points="0,-16 3,-4 0,0" className="fill-yellow-600" />
                <polygon points="0,16 -3,4 0,0" className="fill-yellow-600" />
                <polygon points="0,16 3,4 0,0" className="fill-yellow-500" />
                <polygon points="16,0 4,-3 0,0" className="fill-yellow-500" />
                <polygon points="16,0 4,3 0,0" className="fill-yellow-600" />
                <polygon points="-16,0 -4,-3 0,0" className="fill-yellow-600" />
                <polygon points="-16,0 -4,3 0,0" className="fill-yellow-500" />
              </motion.g>
              <text x="-1.5" y="-19" className="fill-yellow-400 text-[6.5px] font-black">N</text>
              <Compass className="size-3 text-yellow-500/50 absolute left-[-6px] top-[-6px]" />
            </g>

            {/* Map title overlay in vintage fairytale typeface inside SVG */}
            <g transform="translate(350, 46)" className="pointer-events-none">
              <text
                x="0"
                y="0"
                className="fill-yellow-100 font-serif font-black text-2xl tracking-[0.18em] uppercase text-center"
                textAnchor="middle"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.95))' }}
              >
                Discover Armenia
              </text>
              <text
                x="0"
                y="22"
                className="fill-yellow-500 font-serif font-bold text-[12px] tracking-[0.32em] uppercase text-center"
                textAnchor="middle"
              >
                ★ Ancient Wonders & Sacred Trails ★
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Details Column */}
      <div className="lg:col-span-5 relative">
        <AnimatePresence mode="wait">
          {landmarkInfo && (
            <motion.div
              key={selectedLandmark}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-strong border border-emerald-950/40 p-6 sm:p-8 rounded-3xl relative backdrop-blur-xl bg-[#021812]/90 min-h-[380px] flex flex-col justify-between shadow-2xl"
            >
              {/* Subtle background sparks decorative */}
              <div className="absolute top-4 right-4 text-yellow-500/20">
                <Sparkles className="size-5 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-yellow-500" />
                    <h3 className="text-lg font-black tracking-tight text-yellow-100">
                      {landmarkInfo.name}
                    </h3>
                  </div>
                  {currentTours.length > 0 && (
                    <span className="text-[10px] uppercase font-black tracking-widest bg-yellow-500/10 text-yellow-400 px-2.5 py-1 rounded-full border border-yellow-500/20">
                      {currentTours.length} {currentTours.length === 1 ? 'Tour' : 'Tours'}
                    </span>
                  )}
                </div>

                <p className="text-xs text-emerald-100/70 leading-relaxed mb-6">
                  {landmarkInfo.desc}
                </p>

                {/* Tours available list */}
                <div className="space-y-3.5">
                  {currentTours.length > 0 ? (
                    currentTours.map((tour) => (
                      <motion.div
                        key={tour.id}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center gap-4 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-900/30 rounded-2xl p-3 transition-all cursor-pointer group"
                        onClick={() => onSelectTour(tour)}
                      >
                        <div className="relative size-14 rounded-xl overflow-hidden shrink-0 border border-emerald-900/40">
                          <Image
                            src={tour.image}
                            alt={tour.name[locale as 'en' | 'de' | 'ru'] || tour.name.en}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-yellow-100 truncate group-hover:text-yellow-400 transition-colors">
                            {tour.name[locale as 'en' | 'de' | 'ru'] || tour.name.en}
                          </h4>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-emerald-200/50">
                            <span className="flex items-center gap-1">
                              <Clock className="size-3 text-yellow-500/60" />
                              {tour.duration === 'full day' ? 'Full Day' : tour.duration}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Euro className="size-3 text-yellow-500/60" />
                              {tour.priceEUR}
                            </span>
                          </div>
                        </div>
                        <div className="size-7 rounded-full bg-emerald-900/30 group-hover:bg-yellow-500 group-hover:text-emerald-950 flex items-center justify-center transition-all">
                          <ArrowRight className="size-3.5" />
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 rounded-2xl bg-[#02130e]/40 border border-dashed border-emerald-900/30 text-xs text-emerald-200/40">
                      No group tours scheduled for this attraction currently.
                      <div className="mt-2 text-[10px] text-yellow-500/70 cursor-pointer hover:underline animate-pulse" onClick={() => setSelectedLandmark('Tatev')}>
                        Try exploring Tatev Monastery
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ancient Armenian Fairytale Quote in Footer of card */}
              <div className="mt-6 border-t border-white/5 pt-4 text-[9.5px] font-medium tracking-wide italic text-yellow-500/30 text-center select-none">
                "Land of ancient stones, sacred monasteries and endless heights."
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
