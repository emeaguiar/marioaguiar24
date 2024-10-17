export interface DebounceFunction {
  (callback: (...args: any[]) => void, delay: number): (...args: any[]) => void;
}
