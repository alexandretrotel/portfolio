import { Songs } from "@/types/about/songs";
import { RiSpotifyFill, RiYoutubeFill } from "@remixicon/react";
import React from "react";

const songsBasePath: string = "/songs";
const coverBasePath: string = `${songsBasePath}/cover`;
const assetsBasePath: string = `${songsBasePath}/assets`;

const ICON_SIZE: number = 16;

export const songs: Songs = [
  {
    slug: "feelings",
    title: "Feelings",
    description:
      "Initially, a remix of Stereo Love, this song is a mix of Future House and Electro House.",
    authors: ["Alexandre Trotel"],
    status: "Finished",
    featured: true,
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=EIeDmL0yJO4",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/71CxMIzUNMNL430zsQ5DVE?si=bf666101da884e3e",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/feelings.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/feelings.mp3`,
        version: "Final",
      },
    ],
    styles: ["Future House", "EDM"],
    date: new Date("2022-09-14"),
    labels: [{ name: "Self Released", url: "https://www.alexandretrotel.org" }],
  },
];
