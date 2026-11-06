export type NormaType = 'KESOPANAN' | 'KESUSILAAN' | 'HUKUM' | 'AGAMA';

export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  age: string;
  avatarUrl: string;
  passiveSkillName: string;
  passiveSkillDesc: string;
  moralBonusMultiplier: number;
  speedMultiplier: number;
  penaltyResistance: number; // percentage reduction in sanction fill
  bio: string;
}

export interface PowerUpItem {
  id: 'PAYUNG_TOLERANSI' | 'KARTU_TAAT_HUKUM' | 'SANTUN_BOOSTER';
  name: string;
  norma: NormaType;
  description: string;
  durationSeconds: number;
  icon: string;
}

export interface DilemmaChoice {
  id: string;
  text: string;
  isMoral: boolean;
  moralDelta: number;
  sanctionDelta: number;
  narrativeFeedback: string;
  normaRef: string;
}

export interface DilemmaScenario {
  id: string;
  title: string;
  norma: NormaType;
  contextText: string;
  locationName: string;
  timeLimitSec: number;
  choices: [DilemmaChoice, DilemmaChoice];
}

export type LaneType = 'SAFE_ZONE' | 'SIDEWALK' | 'RIVER' | 'ROAD_ZEBRA' | 'ROAD_HIGHWAY' | 'SANCTUARY';

export interface LaneConfig {
  id: number;
  type: LaneType;
  label: string;
  speed: number; // positive = right, negative = left, 0 = stationary
  density: number; // frequency of entities
  norma?: NormaType;
  trafficLightState?: 'GREEN' | 'RED' | 'YELLOW';
}

export interface Entity {
  id: string;
  x: number;
  yLane: number;
  width: number;
  height: number;
  speed: number;
  type: 'NPC_ELDER' | 'NPC_TEACHER' | 'LOG_HONEST' | 'LOG_TEMPT' | 'CAR' | 'ANGKOT' | 'MOTORCYCLE' | 'POLICE_CAR';
  name: string;
  isMoralTarget?: boolean;
  dilemmaId?: string;
  greeted?: boolean;
}

export type GameStatus = 'MENU' | 'PLAYING' | 'QTE_PAUSE' | 'VICTORY' | 'GAME_OVER';

export interface GameStats {
  moralScore: number; // 0 - 100+
  sanctionMeter: number; // 0 - 100 (100 = Game Over)
  blessingPoints: number; // Norma Agama points
  currentLevelIndex: number;
  stepsTaken: number;
  eldersGreeted: number;
  dilemmasSolved: number;
  powerUpsUsed: number;
  activePowerUp: PowerUpItem | null;
  powerUpTimeRemaining: number;
}
