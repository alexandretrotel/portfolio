import { Roles } from "@/types/nonprofit";

const imageBasePath = "/nonprofit";
const readMoreBaseURL = "/nonprofit";

export const roles: Roles = [
  {
    association: "N7 Consulting",
    url: "https://www.n7consulting.fr",
    image: `${imageBasePath}/n7consulting.jpeg`,
    positions: [
      {
        title: "Consultant",
        date: "Jul. 2024 - Present",
      },
      {
        title: "Strategic Orientation Committee Member",
        date: "Apr. 2024 - Present",
      },
      {
        title: "Vice-President & Board Member",
        date: "Mar. 2023 - Mar. 2024",
      },
    ],
    readMore: `${readMoreBaseURL}/n7consulting`,
  },
  {
    association: "Crypto7",
    url: "https://www.linkedin.com/company/crypto7-n7",
    image: `${imageBasePath}/crypto7.jpeg`,
    positions: [
      {
        title: "President",
        date: "Sep. 2023 - Present",
      },
    ],
    readMore: `${readMoreBaseURL}/crypto7`,
  },
  {
    association: "Confédération Nationale des Junior-Entreprises",
    image: `${imageBasePath}/cnje.jpeg`,
    positions: [
      {
        title: "Trainer in Service Offerings",
        date: "Apr. 2024 - Present",
      },
    ],
    readMore: `${readMoreBaseURL}/cnje`,
  },
  {
    association: "n7beats",
    image: `${imageBasePath}/n7beats.jpeg`,
    positions: [
      {
        title: "Vice-President",
        date: "Nov. 2022 - Present",
      },
    ],
    readMore: `${readMoreBaseURL}/n7beats`,
  },
  {
    association: "Genius Ventures",
    image: `${imageBasePath}/genius7.jpeg`,
    positions: [
      {
        title: "Member",
        date: "Jan. 2024 - Jul. 2024",
      },
    ],
    readMore: `${readMoreBaseURL}/genius7`,
  },
  {
    association: "TECHO in Europe",
    image: `${imageBasePath}/techo.jpeg`,
    positions: [
      {
        title: "Volunteer",
        date: "Aug. 2023 - Aug. 2023",
      },
    ],
    readMore: `${readMoreBaseURL}/techo`,
  },
  {
    association: "Fundación Amigos del Mar",
    image: `${imageBasePath}/amigosdelmar.jpeg`,
    positions: [
      {
        title: "Volunteer",
        date: "Jul. 2023 - Jul. 2023",
      },
    ],
    readMore: `${readMoreBaseURL}/amigosdelmar`,
  },
];
