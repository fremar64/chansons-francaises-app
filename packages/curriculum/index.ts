export { DOMAINS, CYCLES, TRACKS } from "@/packages/curriculum/curriculum";
export {
  getActivityRoute,
  getCycleById,
  getCyclesByTrack,
  getDomainById,
  getLevelById,
  getLevelByIdGlobal,
  getLevelsByCycle,
  getLevelsByTrackAndCycle,
  getTrackById,
  getTracksByDomain
} from "@/packages/curriculum/navigation";
export type {
  Cycle,
  Domain,
  Level,
  NavigationSelection,
  Track
} from "@/packages/types/curriculum";
