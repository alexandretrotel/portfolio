import { RecordLabelItem, Songs } from "@/types/songs";
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
  LandersRecords: {
    name: "Landers Records",
    url: "https://soundcloud.com/landersrecords",
  },
  GottaRecords: {
    name: "GOTTA RCRDS",
    url: "https://gottarcrds.com",
  },
  ConnectedSounds: {
    name: "Connected Sounds",
    url: "https://www.connectedsounds.org",
  },
  NoiseplexRecords: {
    name: "Noiseplex Records",
    url: "https://noiseplex.com",
  },
};

export const songs: Songs = [
  {
    slug: "feelings",
    title: "Feelings",
    description:
      "Initially, a remix of Stereo Love, this song is a mix of Future House and Electro House.",
    authors: ["Alexandre Trotel"],
    status: "Released",
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
    status: "Released",
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
    status: "Released",
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
  {
    slug: "heaven",
    title: "Heaven",
    description:
      "I don't know why I called this song Heaven, but still, I called it like that.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/xVS4iSd9dfc",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/2FRYoN0K4izV1zn5sX2Loj?si=657ecde7b2744142",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/heaven.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/heaven.mp3`,
        version: "Final",
      },
    ],
    styles: ["Progressive House", "Future House", "EDM"],
    date: new Date("2022-08-02"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "another-world",
    title: "Another World",
    description:
      "Another World is a song that is the continuation of Angelic Soul.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/yd1hMjfIRsI?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/1z9IrR5WoqQs08lnacm5wp?si=ffa5dc94be5342f4",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/another-world.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/another-world.mp3`,
        version: "Final",
      },
    ],
    styles: ["Trance", "EDM"],
    date: new Date("2022-08-02"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "river-flows-in-you",
    title: "River Flows in You",
    description:
      "A remix of River Flows in You, a song by Yiruma. This song reminds me a lot of memories. I also used to play this song on the piano.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/fOF0VBqdtdY?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/5eoz9VNG8z2TuZ5NRVXiqg?si=e82eef6ce6d34c35",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/river-flows-in-you.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/river-flows-in-you.mp3`,
        version: "Final",
      },
    ],
    styles: ["Chill House", "EDM"],
    date: new Date("2022-08-16"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "BASSLINE",
    title: "BASSLINE",
    description:
      "I tried to make a song that's good for a party. I think I did it. Really happy with the samples used in the drop.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    featured: true,
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/CRVallh1YyE?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/4BZqN8voULUEd0gCHZgWyj?si=7a75723073814953",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/BASSLINE.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/BASSLINE.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM"],
    date: new Date("2022-09-22"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "fight",
    title: "Fight",
    description:
      "Using big bouncy basses, I was inspired by usual Brazilian Bass songs and Melbourne Bounce songs.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/-olxilzj8gg?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/2HCMf1hdCFOOh0P4qeWQr6?si=6aa09dd17706469b",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/fight.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/fight.mp3`,
        version: "Final",
      },
    ],
    styles: ["Brazilian Bass", "EDM"],
    date: new Date("2022-09-22"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "memories",
    title: "Memories",
    description:
      "I was inspired by my past relationships to make this song. I think it's a good song to listen to when you're feeling down but still want to dance.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/NclXuVFTFGM?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/2vtmUBrr0EbqLM6Gq5gebT?si=fe534fd12f06444a",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/memories.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/memories.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM"],
    date: new Date("2022-09-22"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "mon-univers",
    title: "Mon Univers",
    description:
      "I love this song. I wanted to express the way I feel when I'm solo. I think that's a good song to understand me.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    featured: true,
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/0upbY_FstZo?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/6NwxSNnsaH4un5is1j0maZ?si=b3e1306566264249",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/mon-univers.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/mon-univers.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM"],
    date: new Date("2022-09-22"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "ton-regard",
    title: "Ton Regard",
    description:
      "That's the most personal song I've ever made. I wanted to express the way I feel. The song talks itself.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    featured: true,
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/J4FS8Za0aMg?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/4oFBO3dt17TWDhedE9Z7Yk?si=67ff45dd101f4b31",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/ton-regard.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/ton-regard.mp3`,
        version: "Final",
      },
    ],
    styles: ["Electro Pop"],
    date: new Date("2022-09-21"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "paradox",
    title: "Paradox",
    description:
      "One of the best song I've made during my years at ENSEEIHT. I was so inspired this evening that I was finishing the song at school during the breaks.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    featured: true,
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/3Oxmq5zAJq0?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/2KBbA1Lu8CslYTlFuR97uV?si=d2366d559a304106",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/paradox.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/paradox-v2.mp3`,
        version: "v2",
      },
      {
        type: "Audio",
        url: `${assetsBasePath}/paradox.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2022-10-31"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "phoenix",
    title: "Phoenix",
    description:
      "I was inspired by the mythological bird, the Phoenix. For that, I used weird vsts effects to achieve an original sound. There's a melodic part and a more EDM-like part.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/nBGenx8Jzy4?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/4eYctqPNPWmJwyihKMPgKl?si=da62c0390d0f41e0",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/phoenix.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/phoenix.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM"],
    date: new Date("2022-11-24"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "melancolie",
    title: "Mélancolie",
    description:
      "I wanted to make a full piano song but I'm not that proud of the result. I decided to release it anyway.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/w9Kpp0L1lOs?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/3J1Sb6zLattdFqrIJZWwd1?si=940f1fcfd3d146ab",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/melancolie.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/melancolie.mp3`,
        version: "Final",
      },
    ],
    styles: ["Piano"],
    date: new Date("2023-01-12"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "bitcoin",
    title: "Bitcoin",
    description:
      "I wanted to give some support to Bitcoin through a song. It's a good song for a party.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/gN6Kv_JjPFw?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/0Nq9mX5iVKtFC5LjxxqGcv?si=eca62665bcad4dc7",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/bitcoin.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/bitcoin.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Moombahton", "Trap"],
    date: new Date("2023-05-30"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "astral",
    title: "Astral",
    description:
      "One of the two songs I made inspired by Future Rave. I love how the sub bass sounds in this song.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/vLQ88gjqmGg?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/6cey65l9AWyVdHHVaDm6Iy?si=365789c25d054b3c",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/astral.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/astral.mp3`,
        version: "Final",
      },
    ],
    styles: ["Future Rave", "EDM"],
    date: new Date("2023-06-20"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "chaos",
    title: "Chaos",
    description:
      "The second song inspired by Future Rave. I love the melody in the drop.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/hZLxrtZqwIw?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/2NHZS6W8SDSmNvsxM21UZT?si=e221ffdf080f4705",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/chaos.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/chaos.mp3`,
        version: "Final",
      },
    ],
    styles: ["Future Rave", "EDM"],
    date: new Date("2023-06-20"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "another-day",
    title: "Another Day",
    description:
      "A song I made during some holidays. This song remember me the good times I had, it feels like a summer song, it's also calm and inspiring. Pay attention to the background elements.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    featured: true,
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/C3WeawUIJZI?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/6jLbfxdGMWijev64R0Kh3R?si=45d3e9983aa1402a",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/another-day.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/another-day.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "House"],
    date: new Date("2024-01-12"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "love",
    title: "Love",
    description:
      "Love is one of the most important things in life. I wanted to express the way I feel when I'm in love. Something hard and soft at the same time.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/icxmWm7yX10?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/5mKWZCivVrCEMFMh14w982?si=73256cdaefe34f62",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/love.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/love.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Happy Hardcore", "Trance"],
    date: new Date("2023-02-27"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "nothing",
    title: "Nothing",
    description:
      "An exotic sound but I'm not satisfied with the drop that I didn't work enough. However, really like the vibes that the song gives.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/Rmf962olp-U?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/5JnzHqzdGTTM2FflQCA5vw?si=2b4751dec595458c",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/nothing.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/nothing.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2024-01-12"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "what-you-feel",
    title: "What You Feel",
    description:
      "Inspired by Gareth Emery when he collabs with LSR/City, I wanted to make a trance song that feels emotional.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/fIe8JplWtss?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/4MUgsk81q8lyiIkBhXg5qP?si=a0ee08606bd6450f",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/what-you-feel.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/what-you-feel.mp3`,
        version: "Final",
      },
    ],
    styles: ["Trance", "EDM"],
    date: new Date("2024-01-12"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "paris",
    title: "Paris",
    description:
      "This song contains all my memories of Paris with my girlfriend. One of the best weekend I had in my life.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    featured: true,
    links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/5Oa8Dk7EmTWCDrAZN1sLsr?si=8365b80e6148450a",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/paris.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/paris.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Trance"],
    date: new Date("2024-10-23"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "impossible",
    title: "Impossible",
    description:
      "The continuation of What You Feel, always inspired by Gareth Emery. Impossible refers to the fact that I will never be able to solve the mystery of life.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    featured: true,
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=1MHDLswCyCU",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/impossible.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/impossible.mp3`,
        version: "Final",
      },
    ],
    styles: ["Trance", "EDM"],
    date: new Date("2024-12-11"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "poulet",
    title: "Poulet",
    description: "I tried to make an electro basic bass house drop.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=gg1Rb2T561s",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/poulet.mp3`,
        version: "v1",
      },
    ],
    styles: ["Bass House", "EDM"],
    date: new Date("2023-07-19"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "tchu-tcha-tcha-remix",
    title: "Flavel & Neto - Tchu Tcha Tcha (Alexandre Trotel Remix)",
    description:
      "I wanted to make a remix of this song because we had a lot of fun with my friends in Columbia on this song.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/0z1289Ke7R4?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/tchu-tcha-tcha-remix.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Tropical House"],
    date: new Date("2023-07-23"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "poulet-2",
    title: "Poulet 2",
    description: "I wanted to make a second version of Poulet.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    links: [
      {
        platform: "YouTube",
        url: "https://youtu.be/v6ncmHQvPTQ?feature=shared",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/poulet-2.mp3`,
        version: "v1",
      },
    ],
    styles: ["Tropical House", "EDM", "House"],
    date: new Date("2023-07-30"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "metaphysique",
    title: "Métaphysique",
    description: "I really like the drop of this song. Felt inspired.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=QC-KIf8LVdY",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/metaphysique.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "House"],
    date: new Date("2023-08-09"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "my-world",
    title: "My World",
    description:
      "I wanted to make a song that represents my world. Really like the vibes of this song.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=cAjYWKhtlas",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/my-world.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "House"],
    date: new Date("2023-08-11"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "sensational-remix",
    title: "Atef - Sensational (Alexandre Trotel Remix)",
    description:
      "I really loved the original song of Atef and when I was on his Discord, I downloaded the midi and made a remix of it.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=XkM9PN8YqX8",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/sensational-remix.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Trance"],
    date: new Date("2023-08-13"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "stereo",
    title: "Stereo",
    description:
      "I think I made that during some winter vibes. I love the way I made everything sorted out while keeping saturation.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=n2xurq4tlZ8",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/stereo.mp3`,
        version: "Final",
      },
      {
        type: "Audio",
        url: `${assetsBasePath}/stereo-v2.mp3`,
        version: "v2",
      },
      {
        type: "Audio",
        url: `${assetsBasePath}/stereo-v1.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Future Bass"],
    date: new Date("2023-08-22"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "we-could-be-together-remix",
    title: "Gabry Ponte - We Could Be Together (Alexandre Trotel Remix)",
    description: "Another remix when I love the original song.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=jQD8z_WMpqY",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/we-could-be-together-remix.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2023-08-24"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "bouge",
    title: "Bouge",
    description: "A draft of a future house song that makes you want to dance.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/bouge.mp3`,
        version: "v1",
      },
    ],
    styles: ["Future House", "EDM"],
    date: new Date("2023-10-18"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "house",
    title: "House",
    description: "A draft of a progressive emotional house song.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/house.mp3`,
        version: "v1",
      },
    ],
    styles: ["Progressive House", "EDM"],
    date: new Date("2022-10-29"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "end-of-the-night",
    title: "End of the Night",
    description:
      "A big party banger never Released. Tried something sensual and powerful.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/end-of-the-night.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Bass House"],
    date: new Date("2022-11-27"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "hyperpop-fucked-up",
    title: "Hyperpop Fucked Up",
    description:
      "A weird song that I made one evening trying to make a hyperpop song.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/hyperpop-fucked-up-v2.mp3`,
        version: "v2",
      },
      {
        type: "Audio",
        url: `${assetsBasePath}/hyperpop-fucked-up.mp3`,
        version: "v1",
      },
    ],
    styles: ["Hyperpop"],
    date: new Date("2022-11-30"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "progressive",
    title: "Progressive",
    description: "A draft of a progressive house song.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/progressive.mp3`,
        version: "v1",
      },
    ],
    styles: ["Progressive House", "EDM"],
    date: new Date("2022-08-12"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "i-got-it",
    title: "I Got It",
    description:
      "Someone told me that this song would be played at Ibiza. I don't think so but I like the vibes of this song.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/i-got-it.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM"],
    date: new Date("2022-12-18"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "christmas-love",
    title: "Christmas Love",
    description:
      "A tropical house kind of song that I made during the Christmas holidays.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/christmas-love.mp3`,
        version: "v1",
      },
    ],
    styles: ["Tropical House", "EDM"],
    date: new Date("2022-12-24"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "chill",
    title: "Chill",
    description:
      "I tried to make a classic electro song to get out of my comfort zone.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/chill.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM"],
    date: new Date("2023-01-04"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "funky",
    title: "Funky",
    description: "Some funky electro vibes.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/funky.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM"],
    date: new Date("2023-01-07"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "reversed",
    title: "Reversed",
    description:
      "The goal was to make a song that could be played at the school's party so I needed to talk about alcohol. Stepping back, I don't think it was a good idea haha.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/reversed.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM"],
    date: new Date("2023-02-19"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "dancing-under-the-moon",
    title: "Dancing Under the Moon",
    description:
      "Some nostalgic vibes with this song. The first version is completely different from the second one.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/dancing-under-the-moon-v2.mp3`,
        version: "v2",
      },
      {
        type: "Audio",
        url: `${assetsBasePath}/dancing-under-the-moon.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM"],
    date: new Date("2023-03-05"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "make-me-feel",
    title: "Make Me Feel",
    description: "Another try of innovative house music.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/make-me-feel.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM"],
    date: new Date("2023-04-17"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "drums",
    title: "Drums",
    description: "A big bass house drop.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/drums-v2.mp3`,
        version: "v2",
      },
      {
        type: "Audio",
        url: `${assetsBasePath}/drums.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM"],
    date: new Date("2023-07-31"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "outerspace",
    title: "Outerspace",
    description:
      "A song that I made during the holidays. Another try to remix Stereo Love.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/outerspace-v2.mp3`,
        version: "v2",
      },
      {
        type: "Audio",
        url: `${assetsBasePath}/outerspace.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2023-08-08"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "erosion",
    title: "Erosion",
    description:
      "I don't know how to describe this song but could be mixed better.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/erosion.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM"],
    date: new Date("2023-09-18"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "future-bouncy",
    title: "Future Bouncy",
    description:
      "A future house song that I made. I really like the vibes, it reminds an old song I used to like from a friend of mine when playing video games.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/future-bouncy-v2.mp3`,
        version: "v2",
      },
      {
        type: "Audio",
        url: `${assetsBasePath}/future-bouncy.mp3`,
        version: "v1",
      },
    ],
    styles: ["Future House", "EDM"],
    date: new Date("2023-10-29"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "close-to-you",
    title: "Close to You",
    description: "A song for my girlfriend again haha.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/close-to-you.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Happy Hardcore", "Trance"],
    date: new Date("2023-11-20"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "roses-are-red",
    title: "Roses Are Red",
    description: "Tried to remix Roses Are Red, Violets Are Blue.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/roses-are-red.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Progressive House"],
    date: new Date("2024-03-25"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "losing-you",
    title: "Losing You",
    description: "A future house song; again.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/losing-you.mp3`,
        version: "v1",
      },
    ],
    styles: ["Future House", "EDM"],
    date: new Date("2024-04-24"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "i-dont-wanna-wait",
    title: "I Don't Wanna Wait",
    description: "A remix of David Guetta's song, I Don't Wanna Wait.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/i-dont-wanna-wait.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Future House", "House"],
    date: new Date("2024-04-25"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "big-rave",
    title: "Big Rave",
    description: "I wanted to make a banger, so I tried.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/big-rave.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Big Room"],
    date: new Date("2024-12-16"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "mamamia",
    title: "Mamamia",
    description: "Still wanted to make an ultra super banger.",
    authors: ["Alexandre Trotel"],
    status: "Dropped",
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/mamamia.mp3`,
        version: "v1",
      },
    ],
    styles: ["EDM", "Big Room"],
    date: new Date("2024-12-17"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "flashback-story-deluxe-edition",
    title: "Flashback Story (Deluxe Edition)",
    description:
      "The first song I've made under the name of Alex Lander. I worked more than 70+ hours on this song.",
    authors: ["Alex Lander"],
    status: "Released",
    featured: true,
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=I7LFaZiIc6Q",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/71kcPdSiAGr7WFJuluh54y?si=e4a4ea27436d4cc9",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/flashback-story-deluxe-edition.png`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/flashback-story-deluxe-edition.mp3`,
        version: "Deluxe Edition",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2018-05-14"),
    labels: [recordLabels["LandersRecords"]],
  },
  {
    slug: "rave",
    title: "Rave",
    description:
      "One of the collab that I really liked with Allan Adams. This song was played in nightclubs.",
    authors: ["Alex Lander", "Allan Adams"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=1V4XeBkcXZM",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/1FkGhj8E28QAu08JYX2P7r?si=d77b0b321b24429e",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/rave.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/rave.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Big Room"],
    date: new Date("2020-01-22"),
    labels: [recordLabels["LandersRecords"]],
  },
  {
    slug: "far-away",
    title: "Far Away",
    description:
      "One of the fav song I've made. I remember trying to put short delay on the vocals and it gave an interesting result.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=d9d_7fEvWAs",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/79mRPZ17zZ4N9JJ4vEFyxW?si=a8d3acb558b64781",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/far-away.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/far-away.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Progressive House"],
    date: new Date("2020-05-08"),
    labels: [recordLabels["LandersRecords"]],
  },
  {
    slug: "feel",
    title: "Feel",
    description: "A very emotional song that you can listen when you feel bad.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=Tq8C7as5TY0",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/2vfu26Jx1SaQV7ss120Tjk?si=221c723853f84ff7",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/feel.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/feel.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future Bass"],
    date: new Date("2020-06-12"),
    labels: [recordLabels["LandersRecords"]],
  },
  {
    slug: "untouchable",
    title: "Untouchable",
    description:
      "I tried to do some original stuff with this song and ended up kind of happy with the result.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=DRY4pr1FFVY",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/6IhRsGUxtFu37HBnd5ka4W?si=c030a35edd714f1e",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/untouchable.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/untouchable.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House", "House"],
    date: new Date("2020-07-04"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "factory",
    title: "Factory",
    description:
      "One of the best Future House song I've made. Really proud of this one, the structure is almost perfect. I remember that I played it during holidays to some people and they loved it.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=2PRhLjS-vXs",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/7uo78lRJ5gOza7NkEnol7N?si=d5292b57a36744f9",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/factory.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2020-08-20"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "complicated",
    title: "Complicated",
    description:
      "A song that was approved by a DJ. I remember that I was really happy when he told me that he liked it.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=3PHmu0oHEeM",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/0kPupObUngJ6orGwhKwBYS?si=caae89fcef6845c2",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/complicated.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2020-08-27"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "amandine",
    title: "Amandine",
    description:
      "A song for an old girlfriend. It's a cringe song thinking it now haha. I never understood how it became my most popular song under the Alex Lander name. It was added in playlist of some other people.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=HwzfIYxv1bM",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/5nCQdZf4us9goaJGlfgSJi?si=4b1ff0a04e1d4840",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/amandine.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/amandine.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Electro Pop"],
    date: new Date("2020-04-22"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "forever",
    title: "Forever",
    description:
      "I was finding my music style back during this period. One of the good song I've made during it even if it sounds cheap since I used the default FL Studio plugins and samples.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=ZIH6XzJwyfc",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/3O4QjdkylusPgsQPmgaCN7?si=b7694c0350cf4cd0",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/forever.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/forever.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM"],
    date: new Date("2021-04-27"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "you-cant-stop-me",
    title: "You Can't Stop Me",
    description:
      "An original Future House song that has been released on GOTTA RCRDS.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=wBlZk1mo59I",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/1pYu1D6bQLiMwX7l4Dsv4D?si=def4dfd2364b4d88",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/you-cant-stop-me.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2021-09-21"),
    labels: [recordLabels["GottaRecords"]],
  },
  {
    slug: "i-love-you",
    title: "I Love You",
    description: "A classic melodic Progressive House summer song.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=oHcBZgcCMAk",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/2NF3jf56Ca7lOgVVgh16az?si=2e8a343804474ae7",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/i-love-you.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/i-love-you.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Progressive House"],
    date: new Date("2020-06-28"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "chaos",
    title: "Chaos",
    description: "A classic well executed Future House song.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=kdvWIkxAsu0",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/chaos-alex-lander.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/chaos-alex-lander.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2020-06-05"),
    labels: [recordLabels["LandersRecords"]],
  },
  {
    slug: "get-funky",
    title: "Get Funky",
    description: "Anoter Future House song mixed with some Trap vibes.",
    authors: ["Alex Lander"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=nqCU0bYm3gY",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/5ZW4ZsfMgZ7CpMHRlqRSil?si=ee1d3c16b6d34021",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/get-funky.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/get-funky.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House", "Trap"],
    date: new Date("2020-05-11"),
    labels: [recordLabels["LandersRecords"]],
  },

  {
    slug: "a-new-era",
    title: "A New Era",
    description:
      "A song that marks the beginning of a new chapter in my music journey.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=hzdNNQ62l4E",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/65MzBzYKr5DhgHUibMwlL6?si=0f52d6ce8ccf4dff",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/a-new-era.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2024-04-04"),
    labels: [recordLabels["SelfReleased"]],
  },
  {
    slug: "mystery",
    title: "Mystery",
    description: "A Future House released on Connected Sounds.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=zEVwg9azdrk",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/0GlloYHI2KFv4ATevVimw7?si=fa87b7f15c864ffa",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/mystery.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/mystery.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2020-02-08"),
    labels: [recordLabels["ConnectedSounds"]],
  },
  {
    slug: "la-castafiore",
    title: "La Castafiore",
    description:
      "I think it's the most iconic song I've made. Just listen to it, and you'll understand.",
    authors: ["Alexandre Trotel"],
    status: "Released",
    links: [
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=ybAMoy7gYP4",
        icon: React.createElement(RiYoutubeFill, { size: ICON_SIZE }),
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/4VcgoTecXFpX9IkIVkgxm9?si=046bb902fd2b456e",
        icon: React.createElement(RiSpotifyFill, { size: ICON_SIZE }),
      },
    ],
    cover: `${coverBasePath}/la-castafiore.jpg`,
    assets: [
      {
        type: "Audio",
        url: `${assetsBasePath}/la-castafiore.mp3`,
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2020-05-01"),
    labels: [recordLabels["NoiseplexRecords"]],
  },
];
