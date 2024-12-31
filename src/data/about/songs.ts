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
  {
    slug: "heaven",
    title: "Heaven",
    description:
      "I don't know why I called this song Heaven, but still, I called it like that.",
    authors: ["Alexandre Trotel"],
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
    status: "Finished",
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
        version: "Final",
      },
    ],
    styles: ["Bass House", "EDM"],
    date: new Date("2023-07-19"),
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
        version: "Final",
      },
    ],
    styles: ["EDM", "Tropical House"],
    date: new Date("2023-07-23"),
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
        version: "Final",
      },
    ],
    styles: ["Tropical House", "EDM", "House"],
    date: new Date("2023-07-30"),
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
        version: "Final",
      },
    ],
    styles: ["EDM", "House"],
    date: new Date("2023-08-09"),
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
        version: "Final",
      },
    ],
    styles: ["EDM", "House"],
    date: new Date("2023-08-11"),
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
        version: "Final",
      },
    ],
    styles: ["EDM", "Trance"],
    date: new Date("2023-08-13"),
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
    ],
    styles: ["EDM", "Future Bass"],
    date: new Date("2023-08-22"),
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
        version: "Final",
      },
    ],
    styles: ["EDM", "Future House"],
    date: new Date("2023-08-24"),
  },
];
