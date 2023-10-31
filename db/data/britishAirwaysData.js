module.exports = [
  {
    zone: 1,
    destinations: [{ country: "Scotland", cities: ["Aberdeen"] }],
    cost: {
      economy: { peak: 9750, "off-peak": 9250 },
      business: { peak: 16250, "off-peak": 15000 },
    },
  },
  {
    zone: 2,
    destinations: [
      "Algiers",
      "Alicante",
      "Almeria",
      "Barcelona",
      "Bari",
      "Bastia",
      "Bologna",
      "Brindisi",
      "Budapest",
      "Cagliari",
      "Dubrovnik",
      "Faro",
      "Figari",
      "Florence",
      "Gibraltar",
      "Granada",
    ],
    cost: {
      economy: { peak: 12750, "off-peak": 11750 },
      business: { peak: 22250, "off-peak": 20000 },
    },
  },
];
