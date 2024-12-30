import { Experiences } from "@/types/experiences";

const imageBasePath = "/experiences";
const readMoreBaseURL = "/experiences";

export const experiences: Experiences = [
  {
    company: "Mindify",
    url: "https://www.mindify.fr",
    image: `${imageBasePath}/mindify.jpeg`,
    positions: [
      {
        title: "Co-Founder & CTO",
        date: "Aug. 2024 - Present",
      },
    ],
    readMore: `${readMoreBaseURL}/mindify`,
  },
  {
    company: "Aurora",
    image: `${imageBasePath}/aurora.jpeg`,
    positions: [
      {
        title: "Co-Founder & Consultant",
        date: "Apr. 2024 - Present",
      },
    ],
    readMore: `${readMoreBaseURL}/aurora`,
  },
  {
    company: "SiBorg",
    url: "https://www.siborg.io",
    image: `${imageBasePath}/siborg.jpeg`,
    positions: [
      {
        title: "Full Stack Developer Intern",
        date: "Jun. 2024 - Sep. 2024",
      },
    ],
    readMore: `${readMoreBaseURL}/siborg`,
  },
  {
    company: "TrotelCoin",
    url: "https://www.trotelcoin.com",
    image: `${imageBasePath}/trotelcoin.jpeg`,
    positions: [
      {
        title: "Founder",
        date: "Jul. 2023 - Jul. 2024",
      },
    ],
    readMore: `${readMoreBaseURL}/trotelcoin`,
  },
];
