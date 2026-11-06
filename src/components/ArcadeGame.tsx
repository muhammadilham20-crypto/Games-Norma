import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CharacterProfile, PowerUpItem, DilemmaScenario, NormaType } from '../types/game';
import { PLAYABLE_CHARACTERS, POWER_UPS } from '../data/characters';
import { DILEMMA_SCENARIOS } from '../data/dilemmas';
import { soundEffects } from '../utils/audio';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Award,
  Zap,
  HelpCircle,
  Play,
  Scale,
  ShieldCheck
} from 'lucide-react';

interface Obstacle {
  x: number;
  lane: number;
  width: number;
  speed: number;
  type: 'elder' | 'teacher' | 'car' | 'angkot' | 'bike' | 'police' | 'log' | 'moral_stone' | 'tempt_stone';
  label: string;
  greeted?: boolean;
  dilemmaId?: string;
  broken?: boolean;
}

interface LaneData {
  index: number;
  type: 'start' | 'sidewalk' | 'river' | 'road' | 'sanctuary' | 'finish';
  title: string;
  norma?: NormaType;
  trafficLight?: 'GREEN' | 'RED';
  lightTimer?: number;
}

export const ArcadeGame: React.FC = () => {
  // Game Setup State
  const [selectedChar, setSelectedChar] = useState<CharacterProfile>(PLAYABLE_CHARACTERS[0]);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [gameState, setGameState] = useState<'MENU' | 'PLAYING' | 'QTE_PAUSE' | 'GAME_OVER' | 'VICTORY'>('MENU');

  // Stats
  const [moralScore, setMoralScore] = useState<number>(50);
  const [sanctionMeter, setSanctionMeter] = useState<number>(0);
  const [blessingPoints, setBlessingPoints] = useState<number>(0);
  const [eldersGreetedCount, setEldersGreetedCount] = useState<number>(0);
  const [activePowerUp, setActivePowerUp] = useState<PowerUpItem | null>(null);
  const [powerUpTimer, setPowerUpTimer] = useState<number>(0);

  // Character Grid Position (0-8 columns, 0 to maxLanes rows)
  const [playerGrid, setPlayerGrid] = useState<{ x: number; y: number }>({ x: 4, y: 0 });
  const [isStunned, setIsStunned] = useState<boolean>(false);
  const [isPoliteGesture, setIsPoliteGesture] = useState<boolean>(false);
  const [isQuietMode, setIsQuietMode] = useState<boolean>(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'warning' | 'info' } | null>(null);

  // Active QTE Dilemma
  const [activeDilemma, setActiveDilemma] = useState<DilemmaScenario | null>(null);
  const [qteTimeLeft, setQteTimeLeft] = useState<number>(5);

  // Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Lanes & Obstacles Configuration based on Level
  const getLevelLanes = (level: number): LaneData[] => {
    if (level === 1) {
      // Level 1: Kesopanan & Kesusilaan (Trotoar & Sungai)
      return [
        { index: 0, type: 'start', title: 'Taman Asri Desa (Titik Aman)' },
        { index: 1, type: 'sidewalk', title: 'Trotoar Perkampungan 1', norma: 'KESOPANAN' },
        { index: 2, type: 'sidewalk', title: 'Trotoar Depan Sekolah', norma: 'KESOPANAN' },
        { index: 3, type: 'river', title: 'Sungai Nurani - Arus Tenang', norma: 'KESUSILAAN' },
        { index: 4, type: 'river', title: 'Sungai Nurani - Batu Kejujuran', norma: 'KESUSILAAN' },
        { index: 5, type: 'sidewalk', title: 'Trotoar Balai Warga', norma: 'KESOPANAN' },
        { index: 6, type: 'finish', title: 'Gapura Masuk Kota Madani' },
      ];
    } else if (level === 2) {
      // Level 2: Hukum & Agama (Jalan Raya & Tempat Ibadah)
      return [
        { index: 0, type: 'start', title: 'Halte Angkot Sudirman' },
        { index: 1, type: 'road', title: 'Jalan Protokol Barat', norma: 'HUKUM', trafficLight: 'GREEN', lightTimer: 0 },
        { index: 2, type: 'road', title: 'Jalan Protokol Timur', norma: 'HUKUM', trafficLight: 'GREEN', lightTimer: 0 },
        { index: 3, type: 'road', title: 'Zebra Cross Pelican', norma: 'HUKUM', trafficLight: 'GREEN', lightTimer: 0 },
        { index: 4, type: 'sanctuary', title: 'Kawasan Masjid & Gereja', norma: 'AGAMA' },
        { index: 5, type: 'sanctuary', title: 'Pekarangan Vihara & Pura', norma: 'AGAMA' },
        { index: 6, type: 'finish', title: 'Plaza Harmoni Nusantara' },
      ];
    } else {
      // Level 3: Simfoni 4 Norma (All lanes)
      return [
        { index: 0, type: 'start', title: 'Pemberangkatan Mandiri' },
        { index: 1, type: 'sidewalk', title: 'Trotoar Pasar Ramai', norma: 'KESOPANAN' },
        { index: 2, type: 'river', title: 'Sungai Dilema Batin', norma: 'KESUSILAAN' },
        { index: 3, type: 'road', title: 'Jalan Raya Protokol Utara', norma: 'HUKUM', trafficLight: 'GREEN', lightTimer: 0 },
        { index: 4, type: 'road', title: 'Zebra Cross Sudirman', norma: 'HUKUM', trafficLight: 'GREEN', lightTimer: 0 },
        { index: 5, type: 'sanctuary', title: 'Kawasan Rumah Ibadah Bersama', norma: 'AGAMA' },
        { index: 6, type: 'sidewalk', title: 'Trotoar Kehormatan', norma: 'KESOPANAN' },
        { index: 7, type: 'finish', title: 'Balai Kota Madani (Panggung Utama)' },
      ];
    }
  };

  const lanes = getLevelLanes(selectedLevel);
  const totalLanes = lanes.length;
  const cols = 9;

  // Obstacles state stored in Ref for 60fps canvas loop
  const obstaclesRef = useRef<Obstacle[]>([]);

  // Initialize Obstacles
  const initObstacles = useCallback(() => {
    const obs: Obstacle[] = [];
    lanes.forEach((lane) => {
      if (lane.type === 'sidewalk') {
        obs.push({
          x: 1,
          lane: lane.index,
          width: 0.9,
          speed: 0.02,
          type: 'elder',
          label: 'Kakek Berpeci',
          greeted: false,
        });
        obs.push({
          x: 6,
          lane: lane.index,
          width: 0.9,
          speed: -0.015,
          type: 'teacher',
          label: 'Ibu Guru',
          greeted: false,
        });
      } else if (lane.type === 'river') {
        obs.push({
          x: 1,
          lane: lane.index,
          width: 1.4,
          speed: 0.025,
          type: 'log',
          label: 'Kayu Terhanyut',
        });
        obs.push({
          x: 4,
          lane: lane.index,
          width: 1.1,
          speed: 0.02,
          type: 'moral_stone',
          label: 'Batu Kejujuran',
          dilemmaId: 'dilemma_dompet_sungai',
        });
        obs.push({
          x: 7,
          lane: lane.index,
          width: 1.2,
          speed: 0.022,
          type: 'log',
          label: 'Kayu Apung',
        });
      } else if (lane.type === 'road') {
        const isOdd = lane.index % 2 === 1;
        obs.push({
          x: isOdd ? 0 : 7,
          lane: lane.index,
          width: 1.4,
          speed: isOdd ? 0.045 : -0.05,
          type: isOdd ? 'angkot' : 'car',
          label: isOdd ? 'Angkot Biru' : 'Sedan Kota',
        });
        obs.push({
          x: isOdd ? 5 : 2,
          lane: lane.index,
          width: 0.8,
          speed: isOdd ? 0.06 : -0.055,
          type: 'bike',
          label: 'Motor Bebek',
        });
        if (selectedLevel >= 2 && lane.index === 3) {
          obs.push({
            x: 8,
            lane: lane.index,
            width: 1.5,
            speed: -0.04,
            type: 'police',
            label: 'Patroli Polisi',
          });
        }
      }
    });
    obstaclesRef.current = obs;
  }, [lanes, selectedLevel]);

  // Start / Reset Game
  const startNewGame = () => {
    setGameState('PLAYING');
    setMoralScore(50);
    setSanctionMeter(0);
    setBlessingPoints(0);
    setEldersGreetedCount(0);
    setActivePowerUp(null);
    setPowerUpTimer(0);
    setPlayerGrid({ x: 4, y: 0 });
    setIsStunned(false);
    setIsPoliteGesture(false);
    setSpeechBubble(null);
    setNotification({ text: `Permainan Dimulai: Level ${selectedLevel}`, type: 'info' });
    initObstacles();
    soundEffects.playHop();
  };

  // Trigger Notification Banner
  const notify = (text: string, type: 'success' | 'warning' | 'info') => {
    setNotification({ text, type });
  };

  // Trigger Speech Bubble
  const say = (text: string, durationMs: number = 2000) => {
    setSpeechBubble(text);
    setTimeout(() => {
      setSpeechBubble((prev) => (prev === text ? null : prev));
    }, durationMs);
  };

  // Perform Greet / Polite Action (Tombol E / Spasi)
  const triggerPoliteAction = () => {
    if (gameState !== 'PLAYING' || isStunned) return;

    setIsPoliteGesture(true);
    soundEffects.playGreetingChime();
    say('Nyuwun Sewu / Permisi Pak/Bu! 🙏', 1800);

    // Check if near any Elder or Teacher in the current or adjacent lane
    let greetedAnyone = false;
    obstaclesRef.current.forEach((obs) => {
      if ((obs.type === 'elder' || obs.type === 'teacher') && !obs.greeted) {
        const distY = Math.abs(obs.lane - playerGrid.y);
        const distX = Math.abs(obs.x - playerGrid.x);
        const radius = selectedChar.id === 'budi_andi' ? 2.2 : 1.6;

        if (distY <= 1 && distX <= radius) {
          obs.greeted = true;
          greetedAnyone = true;
          const bonus = Math.round(15 * selectedChar.moralBonusMultiplier);
          setMoralScore((m) => Math.min(100, m + bonus));
          setEldersGreetedCount((c) => c + 1);
          notify(`+${bonus} Skor Moral: Disambut ramah oleh warga!`, 'success');
        }
      }
    });

    if (!greetedAnyone) {
      notify('Bersikap santun membiasakan diri beradab.', 'info');
    }

    setTimeout(() => {
      setIsPoliteGesture(false);
    }, 1200);
  };

  // Activate Power-Up
  const triggerPowerUp = (pu: PowerUpItem) => {
    if (gameState !== 'PLAYING' || activePowerUp) return;
    const duration = selectedChar.id === 'pak_budi_joko' ? pu.durationSeconds + 3 : pu.durationSeconds;
    setActivePowerUp(pu);
    setPowerUpTimer(duration);
    soundEffects.playPowerUpActivate();
    notify(`Power-Up Aktif: ${pu.name} (${duration}s)`, 'success');
  };

  // Player Movement (Grid Hop)
  const movePlayer = useCallback((dx: number, dy: number) => {
    if (gameState !== 'PLAYING' || isStunned) return;

    const newX = Math.max(0, Math.min(cols - 1, playerGrid.x + dx));
    const newY = Math.max(0, Math.min(totalLanes - 1, playerGrid.y + dy));

    if (newX === playerGrid.x && newY === playerGrid.y) return;

    soundEffects.playHop();
    setPlayerGrid({ x: newX, y: newY });

    // Check Lane Specific Logic
    const currentLane = lanes[newY];
    if (!currentLane) return;

    // Norma Agama: Sanctuary Zone
    if (currentLane.type === 'sanctuary') {
      if (isQuietMode || activePowerUp?.id === 'PAYUNG_TOLERANSI') {
        const blessingInc = activePowerUp?.id === 'PAYUNG_TOLERANSI' ? 20 : 10;
        setBlessingPoints((b) => b + blessingInc);
        setMoralScore((m) => Math.min(100, m + 5));
        setSanctionMeter((s) => Math.max(0, s - 3));
        soundEffects.playMoralSuccess();
        notify(`+${blessingInc} Poin Berkah: Menjaga ketenangan pekarangan ibadah`, 'success');
      } else {
        // Did not use quiet mode
        setSanctionMeter((s) => Math.min(100, s + 15));
        setBlessingPoints((b) => Math.max(0, b - 5));
        soundEffects.playReprimand();
        notify('Peringatan Adab: Harap aktifkan Mode Tenang (Shift) di tempat ibadah!', 'warning');
      }
    }

    // Check Victory Condition
    if (newY === totalLanes - 1) {
      soundEffects.playVictoryFanfare();
      setGameState('VICTORY');
    }
  }, [gameState, isStunned, playerGrid, cols, totalLanes, lanes, isQuietMode, activePowerUp, selectedChar]);

  // Resolve QTE Dilemma Choice
  const handleDilemmaChoice = (isMoral: boolean) => {
    if (!activeDilemma) return;
    const choice = isMoral ? activeDilemma.choices[0] : activeDilemma.choices[1];

    if (isMoral) {
      soundEffects.playMoralSuccess();
      setMoralScore((m) => Math.min(100, m + choice.moralDelta));
      setSanctionMeter((s) => Math.max(0, s + choice.sanctionDelta));
      notify(`Pilihan Berintegritas! +${choice.moralDelta} Skor Moral`, 'success');
    } else {
      soundEffects.playWaterSplash();
      const penalty = Math.round(choice.sanctionDelta * (1 - selectedChar.penaltyResistance));
      setMoralScore((m) => Math.max(0, m + choice.moralDelta));
      setSanctionMeter((s) => {
        const next = Math.min(100, s + penalty);
        if (next >= 100) {
          setTimeout(() => {
            soundEffects.playGameOver();
            setGameState('GAME_OVER');
          }, 600);
        }
        return next;
      });
      notify(`Sanksi Rasa Bersalah! +${penalty}% Sanksi Meter`, 'warning');
    }

    setActiveDilemma(null);
    setGameState('PLAYING');
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'PLAYING') {
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          movePlayer(0, 1);
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
          e.preventDefault();
          movePlayer(0, -1);
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          movePlayer(-1, 0);
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          movePlayer(1, 0);
        } else if (e.key === 'e' || e.key === 'E' || e.key === ' ') {
          e.preventDefault();
          triggerPoliteAction();
        } else if (e.key === 'Shift') {
          setIsQuietMode(true);
        } else if (e.key === '1') {
          triggerPowerUp(POWER_UPS[0]);
        } else if (e.key === '2') {
          triggerPowerUp(POWER_UPS[1]);
        } else if (e.key === '3') {
          triggerPowerUp(POWER_UPS[2]);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsQuietMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, movePlayer]);

  // Power Up Timer Loop
  useEffect(() => {
    if (activePowerUp && powerUpTimer > 0) {
      const interval = setInterval(() => {
        setPowerUpTimer((t) => {
          if (t <= 1) {
            setActivePowerUp(null);
            notify('Power-Up telah habis durasinya.', 'info');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activePowerUp, powerUpTimer]);

  // Main 60FPS Game Loop on Canvas
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const width = canvas.width;
      const height = canvas.height;
      const laneHeight = height / totalLanes;
      const colWidth = width / cols;

      // Update Obstacle Positions
      const speedModifier = activePowerUp?.id === 'KARTU_TAAT_HUKUM' ? 0.45 : 1.0;

      obstaclesRef.current.forEach((obs) => {
        obs.x += obs.speed * speedModifier * 60 * dt;
        if (obs.speed > 0 && obs.x > cols + 1) {
          obs.x = -obs.width - 0.5;
          obs.greeted = false;
        } else if (obs.speed < 0 && obs.x < -obs.width - 1) {
          obs.x = cols + 0.5;
          obs.greeted = false;
        }
      });

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Lanes (rendered from top = finish down to bottom = start)
      lanes.forEach((lane) => {
        const yTop = height - (lane.index + 1) * laneHeight;

        if (lane.type === 'start') {
          ctx.fillStyle = '#15803d'; // Green park
          ctx.fillRect(0, yTop, width, laneHeight);
          // Grass texture accents
          ctx.fillStyle = '#166534';
          ctx.fillRect(0, yTop, width, 4);
        } else if (lane.type === 'finish') {
          ctx.fillStyle = '#047857'; // Deep emerald plaza
          ctx.fillRect(0, yTop, width, laneHeight);
          // Gold ribbon line
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(0, yTop, width, 6);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px Outfit, sans-serif';
          ctx.fillText('🏆 BALAI KOTA MADANI — GARIS FINISH', width / 2 - 120, yTop + laneHeight / 2 + 4);
        } else if (lane.type === 'sidewalk') {
          ctx.fillStyle = '#e2e8f0'; // Paving slab
          ctx.fillRect(0, yTop, width, laneHeight);
          // Paving grid line
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 1;
          for (let c = 0; c < cols; c++) {
            ctx.strokeRect(c * colWidth, yTop, colWidth, laneHeight);
          }
        } else if (lane.type === 'river') {
          ctx.fillStyle = '#0284c7'; // Clear blue river
          ctx.fillRect(0, yTop, width, laneHeight);
          // Wave shimmer
          ctx.fillStyle = '#38bdf8';
          const waveShift = (now * 0.05) % colWidth;
          for (let w = -colWidth; w < width; w += colWidth * 1.5) {
            ctx.fillRect(w + waveShift, yTop + laneHeight * 0.4, 24, 3);
          }
        } else if (lane.type === 'road') {
          ctx.fillStyle = '#1e293b'; // Dark asphalt
          ctx.fillRect(0, yTop, width, laneHeight);

          // Zebra Cross marks
          ctx.fillStyle = '#f8fafc';
          for (let c = 1; c < cols - 1; c += 2) {
            ctx.fillRect(c * colWidth + 8, yTop + 6, colWidth - 16, laneHeight - 12);
          }

          // Road divider line
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(0, yTop, width, 2);
        } else if (lane.type === 'sanctuary') {
          ctx.fillStyle = '#fef3c7'; // Warm golden peaceful sanctuary
          ctx.fillRect(0, yTop, width, laneHeight);
          ctx.strokeStyle = '#fde68a';
          ctx.strokeRect(0, yTop, width, laneHeight);
        }

        // Draw Lane Label
        ctx.fillStyle = lane.type === 'road' ? '#94a3b8' : '#475569';
        ctx.font = '10px Plus Jakarta Sans, sans-serif';
        ctx.fillText(lane.title, 8, yTop + 14);
      });

      // 2. Draw Obstacles (NPCs, Logs, Cars, Stones)
      obstaclesRef.current.forEach((obs) => {
        const yTop = height - (obs.lane + 1) * laneHeight;
        const xPos = obs.x * colWidth;
        const obsW = obs.width * colWidth;
        const obsH = laneHeight * 0.75;
        const obsY = yTop + (laneHeight - obsH) / 2;

        if (obs.type === 'elder') {
          // Tetua / Kakek Berpeci
          ctx.fillStyle = obs.greeted ? '#10b981' : '#d97706';
          ctx.beginPath();
          ctx.arc(xPos + obsW / 2, obsY + obsH / 2, obsH / 2 - 2, 0, Math.PI * 2);
          ctx.fill();
          // Peci cap
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(xPos + obsW / 2 - 8, obsY + 2, 16, 6);
          // Label
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.fillText(obs.greeted ? '😊' : '👴', xPos + obsW / 2 - 6, obsY + obsH / 2 + 4);
        } else if (obs.type === 'teacher') {
          // Guru / Warga
          ctx.fillStyle = obs.greeted ? '#10b981' : '#ec4899';
          ctx.beginPath();
          ctx.arc(xPos + obsW / 2, obsY + obsH / 2, obsH / 2 - 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.fillText(obs.greeted ? '😊' : '👩‍🏫', xPos + obsW / 2 - 6, obsY + obsH / 2 + 4);
        } else if (obs.type === 'log') {
          // Floating Log
          ctx.fillStyle = '#78350f';
          ctx.roundRect(xPos, obsY, obsW, obsH, 8);
          ctx.fill();
          ctx.strokeStyle = '#451a03';
          ctx.stroke();
        } else if (obs.type === 'moral_stone') {
          // Dilemma Stone
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.ellipse(xPos + obsW / 2, obsY + obsH / 2, obsW / 2, obsH / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = '#78350f';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('⚖️ DILEMA', xPos + obsW / 2 - 22, obsY + obsH / 2 + 3);
        } else if (obs.type === 'car' || obs.type === 'angkot' || obs.type === 'police') {
          // Vehicle
          ctx.fillStyle = obs.type === 'police' ? '#1e40af' : obs.type === 'angkot' ? '#0284c7' : '#dc2626';
          ctx.roundRect(xPos, obsY, obsW, obsH, 6);
          ctx.fill();
          // Vehicle roof
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(xPos + 6, obsY + 4, obsW - 12, obsH * 0.4);
          // Headlights
          ctx.fillStyle = '#fef08a';
          if (obs.speed > 0) {
            ctx.fillRect(xPos + obsW - 4, obsY + 4, 3, 6);
            ctx.fillRect(xPos + obsW - 4, obsY + obsH - 10, 3, 6);
          } else {
            ctx.fillRect(xPos + 1, obsY + 4, 3, 6);
            ctx.fillRect(xPos + 1, obsY + obsH - 10, 3, 6);
          }
        } else if (obs.type === 'bike') {
          ctx.fillStyle = '#10b981';
          ctx.roundRect(xPos, obsY + 4, obsW, obsH - 8, 4);
          ctx.fill();
        }
      });

      // 3. Collision & River Check
      const playerLane = lanes[playerGrid.y];
      const playerPxX = playerGrid.x * colWidth + colWidth / 2;
      const playerPxY = height - (playerGrid.y + 0.5) * laneHeight;

      // River Water Float Check
      if (playerLane?.type === 'river') {
        let onFloatingEntity = false;
        obstaclesRef.current.forEach((obs) => {
          if (obs.lane === playerGrid.y) {
            const obsLeft = obs.x * colWidth;
            const obsRight = obsLeft + obs.width * colWidth;
            if (playerPxX >= obsLeft && playerPxX <= obsRight) {
              onFloatingEntity = true;
              if (obs.type === 'moral_stone' && obs.dilemmaId && gameState === 'PLAYING') {
                // Trigger Dilemma QTE Modal
                const d = DILEMMA_SCENARIOS.find((sc) => sc.id === obs.dilemmaId) || DILEMMA_SCENARIOS[0];
                soundEffects.playDilemmaAlert();
                setActiveDilemma(d);
                setGameState('QTE_PAUSE');
                setQteTimeLeft(5);
              }
            }
          }
        });

        if (!onFloatingEntity && gameState === 'PLAYING') {
          // Sunk in water!
          soundEffects.playWaterSplash();
          setSanctionMeter((s) => {
            const next = Math.min(100, s + 35);
            if (next >= 100) {
              soundEffects.playGameOver();
              setGameState('GAME_OVER');
            }
            return next;
          });
          notify('Tenggelam di Sungai! Kehilangan keseimbangan nurani.', 'warning');
          setPlayerGrid({ x: 4, y: Math.max(0, playerGrid.y - 1) });
        }
      }

      // Sidewalk / Road Collision Check
      obstaclesRef.current.forEach((obs) => {
        if (obs.lane === playerGrid.y) {
          const obsLeft = obs.x * colWidth - 8;
          const obsRight = obsLeft + obs.width * colWidth + 8;
          if (playerPxX >= obsLeft && playerPxX <= obsRight) {
            if (obs.type === 'elder' || obs.type === 'teacher') {
              if (!obs.greeted && !isPoliteGesture && activePowerUp?.id !== 'SANTUN_BOOSTER') {
                // Bumping elder without greeting!
                soundEffects.playReprimand();
                setIsStunned(true);
                const pen = Math.round(25 * (1 - selectedChar.penaltyResistance));
                setSanctionMeter((s) => {
                  const next = Math.min(100, s + pen);
                  if (next >= 100) {
                    soundEffects.playGameOver();
                    setGameState('GAME_OVER');
                  }
                  return next;
                });
                say('Aduh! Maaf Pak, saya terburu-buru... 😳', 1500);
                notify(`Teguran Lisan! Menabrak tanpa permisi (+${pen}% Sanksi)`, 'warning');
                setTimeout(() => setIsStunned(false), 1500);
              }
            } else if (obs.type === 'car' || obs.type === 'angkot' || obs.type === 'bike' || obs.type === 'police') {
              if (activePowerUp?.id !== 'KARTU_TAAT_HUKUM') {
                soundEffects.playCarHorn();
                soundEffects.playPoliceSiren();
                const pen = Math.round(45 * (1 - selectedChar.penaltyResistance));
                setSanctionMeter((s) => {
                  const next = Math.min(100, s + pen);
                  if (next >= 100) {
                    soundEffects.playGameOver();
                    setGameState('GAME_OVER');
                  }
                  return next;
                });
                notify(`Pelanggaran Lalu Lintas! Hampir terserempet (+${pen}% Sanksi)`, 'warning');
                setPlayerGrid({ x: playerGrid.x, y: Math.max(0, playerGrid.y - 1) });
              }
            }
          }
        }
      });

      // 4. Draw Player
      const pRadius = laneHeight * 0.32;
      ctx.save();
      ctx.translate(playerPxX, playerPxY);

      // Aura if power-up or polite gesture
      if (activePowerUp) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, pRadius + 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (isPoliteGesture) {
        // Bowing angle
        ctx.rotate(0.2);
      }

      // Player Body
      ctx.fillStyle = selectedChar.id === 'budi_andi' ? '#3b82f6' : selectedChar.id === 'siti_rahma' ? '#ec4899' : '#10b981';
      ctx.beginPath();
      ctx.arc(0, 0, pRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Face / Cap
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isStunned ? '😵' : isPoliteGesture ? '🙏' : '🏃', 0, 1);

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, lanes, cols, totalLanes, playerGrid, isPoliteGesture, isQuietMode, isStunned, activePowerUp, selectedChar]);

  // QTE Countdown Timer
  useEffect(() => {
    if (gameState === 'QTE_PAUSE' && activeDilemma) {
      const timer = setInterval(() => {
        setQteTimeLeft((t) => {
          if (t <= 1) {
            // Default to fail/temptation if time expires
            handleDilemmaChoice(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, activeDilemma]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Title & Level Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span>Arcade Crosser Simulator</span>
            <span aria-hidden="true">·</span>
            <span>Refleks & Keputusan Moral</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Langkah Beretika: Arena Menyeberang
          </h1>
        </div>

        {/* Level Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Pilih Level:</span>
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            {[1, 2, 3].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  if (gameState === 'PLAYING') startNewGame();
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Level {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Arena Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Game Canvas & HUD */}
        <div className="lg:col-span-8 flex flex-col items-center">
          {/* Top HUD: Moral Meter & Sanksi Meter */}
          <div className="w-full bg-slate-900 text-white p-4 rounded-t-xl border-x border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            {/* Moral Meter */}
            <div className="flex-1 min-w-[140px]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Moral Meter (Integritas)
                </span>
                <span className="font-mono font-bold text-emerald-300">{moralScore}/100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, moralScore)}%` }}
                />
              </div>
            </div>

            {/* Sanksi Meter */}
            <div className="flex-1 min-w-[140px]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-rose-400 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Sanksi Meter (Batas 100%)
                </span>
                <span className="font-mono font-bold text-rose-300">{sanctionMeter}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    sanctionMeter > 70 ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, sanctionMeter)}%` }}
                />
              </div>
            </div>

            {/* Poin Berkah */}
            <div className="text-right shrink-0">
              <div className="text-[10px] text-slate-400">Poin Berkah</div>
              <div className="text-base font-bold text-amber-300 font-mono">✨ {blessingPoints}</div>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className="relative w-full bg-slate-950 border-x border-slate-800 overflow-hidden shadow-inner flex justify-center">
            <canvas
              ref={canvasRef}
              width={640}
              height={520}
              className="w-full max-w-[640px] aspect-[640/520] block bg-slate-900"
            />

            {/* Notification Banner Overlay */}
            {notification && (
              <div className="absolute top-3 left-4 right-4 pointer-events-none flex justify-center">
                <div
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur-md transition-all ${
                    notification.type === 'success'
                      ? 'bg-emerald-600/90 text-white'
                      : notification.type === 'warning'
                      ? 'bg-rose-600/90 text-white'
                      : 'bg-slate-800/90 text-slate-200'
                  }`}
                >
                  {notification.text}
                </div>
              </div>
            )}

            {/* Speech Bubble Above Character */}
            {speechBubble && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow-lg border border-slate-300 text-xs font-bold pointer-events-none animate-bounce">
                {speechBubble}
              </div>
            )}

            {/* Stun Indicator */}
            {isStunned && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center">
                <div className="bg-white/95 text-slate-900 px-6 py-4 rounded-xl border border-slate-200 shadow-xl text-center max-w-sm">
                  <div className="text-2xl mb-1">😳 Teguran Lisan!</div>
                  <div className="text-xs text-slate-600 font-medium">
                    Kamu terhenti sesaat karena menyenggol tetua tanpa permisi. Harap biasakan sopan santun!
                  </div>
                </div>
              </div>
            )}

            {/* Menu Start Screen Overlay */}
            {gameState === 'MENU' && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Langkah Beretika: Mulai Petualangan</h2>
                <p className="text-xs text-slate-300 max-w-md mb-6 leading-relaxed">
                  Bimbing karaktermu menyeberangi lajur trotoar santun, arus sungai nurani, jalan raya tertib, dan pekarangan rumah ibadah yang damai.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={startNewGame}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Mulai Menyeberang</span>
                  </button>
                </div>
              </div>
            )}

            {/* QTE Dilemma Modal Overlay */}
            {gameState === 'QTE_PAUSE' && activeDilemma && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-20">
                <div className="bg-white text-slate-900 rounded-2xl p-6 max-w-lg w-full border border-slate-300 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                    <span className="text-xs font-mono font-bold text-rose-600 flex items-center gap-1.5">
                      <Scale className="w-4 h-4" /> DILEMA HATI NURANI (QTE)
                    </span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-full">
                      ⏳ Sisa Waktu: {qteTimeLeft}s
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">{activeDilemma.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    {activeDilemma.contextText}
                  </p>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => handleDilemmaChoice(true)}
                      className="w-full p-3 text-left rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 transition-all cursor-pointer group"
                    >
                      <div className="text-xs font-bold text-emerald-900 group-hover:text-emerald-950 flex items-center gap-2">
                        <span>A. {activeDilemma.choices[0].text}</span>
                      </div>
                      <div className="text-[11px] text-emerald-700 mt-0.5">
                        Dampak: +{activeDilemma.choices[0].moralDelta} Skor Moral & Pijakan Tetap Kokoh
                      </div>
                    </button>

                    <button
                      onClick={() => handleDilemmaChoice(false)}
                      className="w-full p-3 text-left rounded-xl border border-rose-300 bg-rose-50/70 hover:bg-rose-100 transition-all cursor-pointer group"
                    >
                      <div className="text-xs font-bold text-rose-900 group-hover:text-rose-950 flex items-center gap-2">
                        <span>B. {activeDilemma.choices[1].text}</span>
                      </div>
                      <div className="text-[11px] text-rose-700 mt-0.5">
                        Dampak: Sanksi Rasa Bersalah! Batu retak & tenggelam ke air.
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Victory Modal Overlay */}
            {gameState === 'VICTORY' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-20">
                <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl text-center">
                  <div className="text-4xl mb-2">🎉🏆</div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
                    Sukses Menyeberang dengan Beradab!
                  </h2>
                  <p className="text-xs text-slate-600 mb-6">
                    Kamu berhasil mengantarkan Piagam Kebajikan ke Balai Kota Madani tanpa melanggar norma sosial.
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-6 text-center">
                    <div>
                      <div className="text-[10px] text-slate-500">Skor Moral</div>
                      <div className="text-base font-extrabold text-emerald-600 font-mono">{moralScore}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Sanksi Meter</div>
                      <div className="text-base font-extrabold text-rose-600 font-mono">{sanctionMeter}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Tetua Disapa</div>
                      <div className="text-base font-extrabold text-blue-600 font-mono">{eldersGreetedCount} Orang</div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={startNewGame}
                      className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Mainkan Lagi</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Game Over Modal Overlay */}
            {gameState === 'GAME_OVER' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-20">
                <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl text-center">
                  <div className="text-4xl mb-2">🛑</div>
                  <h2 className="text-2xl font-extrabold text-rose-700 mb-1">
                    Tersingkir dari Masyarakat!
                  </h2>
                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                    Sanksi Meter telah mencapai 100%. Akumulasi teguran lisan, pelanggaran hukum jalan raya, atau rasa bersalah menghentikan langkahmu.
                  </p>

                  <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-xl border border-rose-200 mb-6">
                    <strong>Refleksi Pedagogis:</strong> Masyarakat membutuhkan kepatuhan pada 4 norma agar tercipta ketenteraman dan keadilan bersama.
                  </div>

                  <button
                    onClick={startNewGame}
                    className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Coba Lagi dari Awal</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls Bar (Mobile D-Pad & Action Buttons) */}
          <div className="w-full bg-slate-900 border-x border-b border-slate-800 p-4 rounded-b-xl flex flex-wrap items-center justify-between gap-4">
            {/* Action Buttons: Permisi & Mode Tenang */}
            <div className="flex items-center gap-2">
              <button
                onClick={triggerPoliteAction}
                disabled={gameState !== 'PLAYING'}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-md transition-all active:scale-95 cursor-pointer"
                title="Tombol 'E' atau Spasi di keyboard"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Permisi / Sapa (E)</span>
              </button>

              <button
                onMouseDown={() => setIsQuietMode(true)}
                onMouseUp={() => setIsQuietMode(false)}
                onTouchStart={() => setIsQuietMode(true)}
                onTouchEnd={() => setIsQuietMode(false)}
                disabled={gameState !== 'PLAYING'}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isQuietMode
                    ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
                title="Tahan Shift di keyboard"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Langkah Tenang ({isQuietMode ? 'Aktif' : 'Tahan'})</span>
              </button>
            </div>

            {/* Virtual D-Pad for Mobile Touch */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => movePlayer(-1, 0)}
                aria-label="Geser Kiri"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white rounded-lg flex items-center justify-center cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => movePlayer(0, 1)}
                  aria-label="Maju Melompat"
                  className="w-10 h-10 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-500 text-white rounded-lg flex items-center justify-center cursor-pointer shadow-xs"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => movePlayer(0, -1)}
                  aria-label="Mundur"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white rounded-lg flex items-center justify-center cursor-pointer shadow-xs"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => movePlayer(1, 0)}
                aria-label="Geser Kanan"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white rounded-lg flex items-center justify-center cursor-pointer shadow-xs"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Character Switcher & Power-Ups */}
        <div className="lg:col-span-4 space-y-4">
          {/* Character Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Karakter Terpilih
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                <img
                  src={selectedChar.avatarUrl}
                  alt={selectedChar.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{selectedChar.name}</h3>
                <p className="text-xs text-emerald-700 font-medium">{selectedChar.role}</p>
                <p className="text-[11px] text-slate-500 line-clamp-1">{selectedChar.passiveSkillName}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
              {PLAYABLE_CHARACTERS.map((char) => (
                <button
                  key={char.id}
                  onClick={() => {
                    setSelectedChar(char);
                    if (gameState === 'PLAYING') startNewGame();
                  }}
                  className={`flex-1 py-1 px-2 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                    selectedChar.id === char.id
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {char.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Power-Up Tray */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Power-Up Tray
              </span>
              {activePowerUp && (
                <span className="text-xs font-mono font-bold text-amber-600">
                  Aktif: {powerUpTimer}s
                </span>
              )}
            </div>

            <div className="space-y-2">
              {POWER_UPS.map((pu, idx) => {
                const isThisActive = activePowerUp?.id === pu.id;
                return (
                  <button
                    key={pu.id}
                    onClick={() => triggerPowerUp(pu)}
                    disabled={gameState !== 'PLAYING' || isThisActive}
                    className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isThisActive
                        ? 'bg-amber-50 border-amber-400 text-amber-900 ring-1 ring-amber-400'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>[{idx + 1}] {pu.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({pu.durationSeconds}s)</span>
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{pu.description}</div>
                    </div>
                    <Zap className={`w-4 h-4 shrink-0 ${isThisActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Keyboard Legend */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600">
            <div className="font-bold text-slate-800 mb-2">Petunjuk Kontrol Keyboard:</div>
            <ul className="space-y-1">
              <li><strong className="text-slate-900">WASD / Tombol Panah</strong>: Melompat Grid 4 Arah</li>
              <li><strong className="text-slate-900">Tombol E / Spasi</strong>: Sikap Santun ("Permisi / Tabe'")</li>
              <li><strong className="text-slate-900">Tahan Shift</strong>: Mode Langkah Tenang (Tempat Ibadah)</li>
              <li><strong className="text-slate-900">Tombol 1, 2, 3</strong>: Mengaktifkan Power-Up</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
