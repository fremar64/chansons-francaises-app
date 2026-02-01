// Index for the 'Rouge' parcours. Exports the ordered sessions.
import sessionA2 from './session-a2';
import sessionB1 from './session-b1';
import sessionB2 from './session-b2';
import sessionC1 from './session-c1';

export const parcoursRouge = {
  slug: 'rouge',
  title: 'Parcours pédagogique — Rouge (Fredericks Goldman Jones)',
  description: 'Parcours CECRL CaSS-ready centré sur l\'analyse des idéaux collectifs, symbole du "rouge", utopie vs réalité, mémoire et transmission.',
  song: {
    title: 'Rouge',
    artist: 'Fredericks Goldman Jones',
    year: 1993
  },
  // Audio metadata: public files are served from '/audio/...'
  audio: {
    mp3: '/audio/chansons/jean-jacques-goldman/rouge.mp3'
  },
  sessions: [sessionA2, sessionB1, sessionB2, sessionC1]
};

export default parcoursRouge;
