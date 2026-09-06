/**
 * Type definitions for SenangWebs Deck (SWD)
 */

export interface SWDState {
  initialized: boolean;
  slides: SlideData[];
  currentSlide: number;
  isPlaying: boolean;
  isFullscreen: boolean;
  isOverview: boolean;
}

export interface SlideData {
  index: number;
  layout: string;
  content: string;
  attributes: Record<string, string>;
  background?: string;
  overlay?: string;
  left?: string;
  right?: string;
  columns?: string[];
  quote?: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  imageContent?: string;
  textContent?: string;
}

export interface A11yConfig {
  enabled?: boolean;
  announceSlideChanges?: boolean;
  focusVisible?: boolean;
}

export interface ExportConfig {
  pdf?: boolean;
  html?: boolean;
  json?: boolean;
}

export interface SWDConfig {
  source?: 'html' | 'markdown' | 'json';
  markdownUrl?: string;
  jsonUrl?: string;
  data?: { slides: Partial<SlideData>[] };
  theme?:
    | 'light'
    | 'dark'
    | 'gradient'
    | 'minimal'
    | 'corporate'
    | 'creative'
    | 'academic'
    | 'ocean'
    | 'forest'
    | 'mono'
    | string;
  transition?: 'slide' | 'fade' | 'zoom' | 'flip' | 'none';
  transitionSpeed?: 'fast' | 'normal' | 'slow' | number;
  aspectRatio?: '16:9' | '4:3' | '16:10';
  rtl?: boolean;
  controls?: boolean;
  controlsPosition?: 'bottom-right' | 'bottom-left' | 'edges';
  progress?: boolean;
  progressPosition?: 'bottom' | 'top';
  slideNumbers?: boolean;
  slideNumberFormat?: 'h/v' | 'h.v' | 'c/t' | 'c';
  keyboard?: boolean;
  keyboardShortcuts?: Record<string, string>;
  touch?: boolean;
  mouseWheel?: boolean;
  loop?: boolean;
  autoSlide?: number;
  autoSlideStoppable?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  fragments?: boolean;
  fragmentStyle?: 'fade-in' | 'slide-in' | 'zoom-in';
  hash?: boolean;
  history?: boolean;
  autoInit?: boolean;
  overview?: boolean;
  fullscreen?: boolean;
  a11y?: A11yConfig;
  export?: ExportConfig;
  dev?: boolean;
}

export interface SlideChangeData {
  from: number;
  to: number;
}

export interface SwipeData {
  direction: 'left' | 'right' | 'up' | 'down';
  distance: number;
  velocity: number;
}

export declare class SWD {
  container: HTMLElement;
  config: SWDConfig;
  state: SWDState;

  constructor(container: string | HTMLElement, options?: SWDConfig);

  init(): Promise<void>;
  destroy(): void;

  next(): void;
  prev(): void;
  goTo(index: number): Promise<void> | undefined;
  goToFirst(): void;
  goToLast(): void;

  start(): void;
  stop(): void;

  toggleFullscreen(): Promise<void> | undefined;
  enterFullscreen(): Promise<void> | undefined;
  exitFullscreen(): Promise<void> | undefined;

  toggleOverview(): void;

  setTransition(type: SWDConfig['transition']): void;
  setTransitionSpeed(speed: SWDConfig['transitionSpeed']): void;

  exportPDF(): void;
  exportHTML(): string | null;
  exportJSON(): object | null;
  downloadHTML(): string | null;
  downloadJSON(): void;

  getCurrentSlide(): number;
  getTotalSlides(): number;
  getState(): SWDState;

  on(event: string, handler: (data?: unknown) => void): SWD;
  once(event: string, handler: (data?: unknown) => void): SWD;
  off(event: string, handler?: (data?: unknown) => void): SWD;
  offAll(event?: string): SWD;

  static autoInit(
    selector?: string,
    options?: SWDConfig
  ): SWD[];
  static readDataAttributes(element: HTMLElement): SWDConfig;
}

export default SWD;
