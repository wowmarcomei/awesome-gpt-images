import { Case } from './types';

export const cases: Case[] = [
  {
    id: "5",
    title: "Ghibli Style Mona Lisa",
    author: {
      name: "AnimeAI",
      twitter: "https://twitter.com/AnimeAI"
    },
    originalLink: "https://animeai.online/#demo-gallery",
    image: "/examples/example_flat_sticker_pearl_earring.jpeg",
    prompt: "Redraw this photo in Ghibli style",
    requiresReferenceImage: true,
    tags: ["ghibli", "mona lisa", "anime"]
  },
  {
    id: "11",
    title: "PS2 Game Cover",
    author: {
      name: "dotey",
      twitter: "https://x.com/dotey"
    },
    originalLink: "https://x.com/dotey/status/1904978767090524372",
    image: "/examples/example_ps2_gta_shrek.jpeg",
    prompt: "Create a PS2 video game case of \"Grand Theft Auto: Far Far Away\" a GTA based in the Shrek Universe.",
    requiresReferenceImage: false,
    tags: ["game", "cover", "crossover", "creative"]
  }
]; 