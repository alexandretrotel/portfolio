import { RecordLabelItem, Songs } from "@/types/about/songs";
import { RiSpotifyFill, RiYoutubeFill } from "@remixicon/react";
import React from "react";

const songsBasePath: string = "/songs";
const coverBasePath: string = `${songsBasePath}/cover`;
const assetsBasePath: string = `${songsBasePath}/assets`;

const ICON_SIZE: number = 16;

export const recordLabels: { [key: string]: RecordLabelItem } = {
  SelfReleased: {
    name: "Self Released",
    url: "https://www.alexandretrotel.org",
  },
};

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
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "journey",
    title: "Journey",
    description:
      "My first song under the name of Alexandre Trotel. Journey symbolizes the beginning of a new chapter in my life.",
    authors: ["Alexandre Trotel"],
    status: "Finished",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=FUR1ea1ilUU",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/4jEHcBr18knr95OLpcMvaK?si=b991b87d2e6b47d9",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/journey.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/journey.mp3`,
        version: "Final",
      },
    ],
    styles: ["Progressive House", "EDM"],
    date: new Date("2022-10-05"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "angelic-soul",
    title: "Angelic Soul",
    description:
      "A song that I made for my girlfriend, Angelic Soul is some kind of Trance and Happy Hardcore mix.",
    authors: ["Alexandre Trotel"],
    status: "Finished",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=ig70lvXT9nI",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/5UQ7A0ydTGJeMaGOVTJlmQ?si=cdecfe2d46c249de",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/angelic-soul.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/angelic-soul.mp3`,
        version: "Final",
      },
    ],
    styles: ["Trance", "Happy Hardcore"],
    date: new Date("2022-08-02"),
    labels: [recordLabels["SelfReleased"]],
  },
];
