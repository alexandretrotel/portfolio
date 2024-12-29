import { Education } from "@/types/education";

const imageBasePath = "/education";

export const education: Education = [
  {
    school: "Georgia Institute of Technology",
    topic: "Electrical and Computer Engineering",
    date: "2025 - Present",
    url: "https://www.gatech.edu/",
    image: `${imageBasePath}/georgia-tech.jpeg`,
  },
  {
    school: "ENSEEIHT",
    topic: "Computer Science (IBDIoT)",
    date: "2022 - 2025",
    url: "https://www.enseeiht.fr/",
    image: `${imageBasePath}/enseeiht.jpeg`,
  },
  {
    school: "Lycée Chateaubriand",
    topic: "PCSI - PSI*",
    date: "2020 - 2022",
    url: "https://www.lycee-chateaubriand.fr/",
    image: `${imageBasePath}/chateaubriand.jpeg`,
  },
  {
    school: "Lycée Saint-Joseph",
    topic: "Scientific Baccalaureate",
    date: "2016 - 2020",
    url: "https://www.lycee-saintjoseph-lamballe.net/",
    image: "",
    disabled: true,
  },
];
