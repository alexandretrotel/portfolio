import { Experience } from "@/types/experiences";

const imageBasePath = "/experiences";
const readMoreBaseURL = "/experiences";

export const experiences: Experience = [
  {
    company: "Mindify",
    url: "https://www.mindify.fr",
    image: `${imageBasePath}/mindify.jpeg`,
    positions: [
      {
        title: "Co-Founder & CTO",
        date: "Aug. 2024 - Present",
        readMore: `${readMoreBaseURL}/mindify`,
      },
    ],
  },
  {
    company: "N7 Consulting",
    url: "https://www.n7consulting.fr",
    image: `${imageBasePath}/n7consulting.jpeg`,
    positions: [
      {
        title: "Consultant",
        date: "Jul. 2024 - Present",
        readMore: `${readMoreBaseURL}/n7consulting`,
      },
      {
        title: "Strategic Orientation Committee Member",
        date: "Apr. 2024 - Present",
        readMore: `${readMoreBaseURL}/n7consulting`,
      },
      {
        title: "Vice-President & Board Member",
        date: "Mar. 2023 - Mar. 2024",
        readMore: `${readMoreBaseURL}/n7consulting`,
      },
    ],
  },
  {
    company: "SiBorg",
    url: "https://www.siborg.io",
    image: `${imageBasePath}/siborg.jpeg`,
    positions: [
      {
        title: "Full Stack Developer Intern",
        date: "Jun. 2024 - Sep. 2024",
        readMore: `${readMoreBaseURL}/siborg`,
      },
    ],
  },
  {
    company: "TrotelCoin",
    url: "https://www.trotelcoin.com",
    image: `${imageBasePath}/trotelcoin.jpeg`,
    positions: [
      {
        title: "Founder",
        date: "Jul. 2023 - Jul. 2024",
        readMore: `${readMoreBaseURL}/trotelcoin`,
      },
    ],
  },
];
