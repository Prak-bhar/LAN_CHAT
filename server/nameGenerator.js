const adjectives = [
  'Silent', 'Crimson', 'Phantom', 'Neon', 'Hollow', 'Frosted', 'Obsidian',
  'Velvet', 'Stealthy', 'Gilded', 'Arcane', 'Blazing', 'Cosmic', 'Drifting',
  'Echoing', 'Fading', 'Ghostly', 'Hidden', 'Iron', 'Jade', 'Lunar', 'Mystic',
  'Nocturnal', 'Onyx', 'Pale', 'Quantum', 'Rustic', 'Shadow', 'Twisted',
  'Umbral', 'Vivid', 'Wandering', 'Xenon', 'Yellow', 'Zeroed'
];

const nouns = [
  'Fox', 'Raven', 'Wolf', 'Specter', 'Cipher', 'Nexus', 'Phantom', 'Glitch',
  'Drone', 'Vortex', 'Storm', 'Node', 'Vector', 'Signal', 'Pulse', 'Echo',
  'Hawk', 'Lynx', 'Mamba', 'Nebula', 'Orbit', 'Prism', 'Quasar', 'Rogue',
  'Serpent', 'Titan', 'Umbra', 'Vertex', 'Wraith', 'Xenon', 'Yeti', 'Zephyr'
];

const usedNames = new Set();

function generateName() {
  let name;
  let attempts = 0;
  do {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 99) + 1;
    name = `${adj}${noun}${num}`;
    attempts++;
  } while (usedNames.has(name) && attempts < 100);

  usedNames.add(name);
  return name;
}

function releaseName(name) {
  usedNames.delete(name);
}

module.exports = { generateName, releaseName };
