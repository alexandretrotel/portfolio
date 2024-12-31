import { Songs } from "@/types/about/songs";

const songsBasePath = "/songs";
const coverBasePath = `${songsBasePath}/cover`;
const assetsBasePath = `${songsBasePath}/assets`;

export const songs: Songs = [
  {
    slug: "feelings",
    title: "Feelings",
    authors: ["Alexandre Trotel"],
    status: "Finished",
    featured: true,
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=5J5e0T0YJ1g",
      },
      {
        platform: "SoundCloud",
        url: "https://soundcloud.com/alexandre-trotel/feelings",
      },
    ],
    cover: `${coverBasePath}/feelings.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/feelings.mp3`,
        version: 1,
      },
    ],
    styles: ["Future House"],
    date: new Date("2024-08-01"),
  },
];
