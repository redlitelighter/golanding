const navLinks = [
  { id: "hero", title: "Home" },
  { id: "words", title: "Features" },
  { id: "beta", title: "Beta" },
  { id: "download", title: "Download" },
];
// Put your images in /public/coins/ with these file names (PNG or SVG, square, transparent background).
// Edit the descriptions freely; the ones I'm less sure about are kept neutral on purpose.
const coins = [
  {
    symbol: "HBAR",
    name: "Hedera",
    description: "The native coin of Hedera. It pays network fees.",
    image: "/coins/hbar.png",
  },
  {
    symbol: "USDT0",
    name: "Tether USD",
    description: "A dollar stablecoin, handy as a calm base to trade from.",
    image: "/coins/usdt0.png",
  },
  {
    symbol: "SAUCE",
    name: "SaucerSwap",
    description: "The SaucerSwap token. Stake it to get xSAUCE.",
    image: "/coins/sauce.png",
  },
  {
    symbol: "xSAUCE",
    name: "Staked SAUCE",
    description: "What you receive when you stake SAUCE in NBX-go.",
    image: "/coins/xsauce.png",
  },
  {
    symbol: "KARATE",
    name: "Karate",
    description: "Swap it on SaucerSwap straight from your wallet.",
    image: "/coins/karate.png",
  },
  {
    symbol: "DAVINCI",
    name: "Davinci",
    description: "Swap it on SaucerSwap straight from your wallet.",
    image: "/coins/davinci.png",
  },
  {
    symbol: "DOVU",
    name: "DOVU",
    description: "Swap it on SaucerSwap straight from your wallet.",
    image: "/coins/dovu.png",
  },
  {
    symbol: "PLEX",
    name: "Plex",
    description: "Swap it on SaucerSwap straight from your wallet.",
    image: "/coins/plex.png",
  },
];
export { navLinks, coins };
