import { Roles } from "@/types/home/nonprofit";

const imageBasePath = "/nonprofit";

export const roles: Roles = [
  {
    association: "N7 Consulting",
    url: "https://www.n7consulting.fr",
    image: `${imageBasePath}/n7consulting.jpeg`,
    positions: [
      {
        title: "Consultant",
        description:
          "Made a website for AgroParisTech Service Etudes in partnership with Aurora.",
        date: "Jul. 2024 - Present",
      },
      {
        title: "Strategic Orientation Committee Member",
        description:
          "Participated in the strategic orientation of the association. Leveraged my experience to advise the board.",
        date: "Apr. 2024 - Present",
      },
      {
        title: "Vice-President & Board Member",
        description:
          "Developed and executed a sales strategy, increasing annual sales by 60% and missions by 78%, with a NPS of 57. Led efforts for awards like Prix d'Excellence and Alten's Best Engineering Study Award. Improved business processes for better efficiency. Created a newsletter for 25,000+ Junior-Entrepreneurs, achieving 5,000+ views, 60+ subscribers, and publishing 43 articles. Worked with 15+ Junior-Enterprises and built a custom CRM tool.",
        date: "Mar. 2023 - Mar. 2024",
      },
    ],
  },
  {
    association: "Crypto7",
    url: "https://www.linkedin.com/company/crypto7-n7",
    image: `${imageBasePath}/crypto7.jpeg`,
    positions: [
      {
        title: "President",
        description:
          "Promoted blockchain technology and cryptocurrencies. Organized workshops and conferences. Participated in dozens of events. Invited speakers from the industry such as the CTO of Stellar.",
        date: "Sep. 2023 - Present",
      },
    ],
  },
  {
    association: "CNJE",
    url: "https://junior-entreprises.com/",
    image: `${imageBasePath}/cnje.jpeg`,
    positions: [
      {
        title: "Trainer in Service Offerings",
        description:
          "Conducted training sessions at Junior Enterprise congresses with over 1,000 participants, and contributed to creating training resources for a community of 25,000 students. Became a trainer after successfully completing a rigorous two-step selection process, involving a technical report to address specific problems in my expertise area and a practical phase where I developed and presented a tailored development module, showcasing my ability to create action plans, adapt to situations, and apply theoretical and pedagogical skills.",
        date: "Apr. 2024 - Present",
      },
    ],
  },
  {
    association: "n7beats",
    url: "https://www.linkedin.com/company/n7beats",
    image: `${imageBasePath}/n7beats.jpeg`,
    positions: [
      {
        title: "Vice-President",
        description:
          "Shared knowledge and expertise in music production through workshops and tutorials. Actively engaged with club members by sharing original compositions and productions, encouraging constructive feedback, and promoting collaboration within n7beats.",
        date: "Nov. 2022 - Present",
      },
    ],
  },
  {
    association: "Genius Ventures",
    url: "https://www.linkedin.com/company/geniusn7",
    image: `${imageBasePath}/genius7.jpeg`,
    positions: [
      {
        title: "Member",
        description:
          "Collaborated within Genius Ventures as a group of student entrepreneurs, working on projects and developing entrepreneurial skills. Gained access to weekly information documents on business fundamentals paired with practical exercises. Regularly engaged with experienced entrepreneurs from startups and the X-HEC master's program.",
        date: "Jan. 2024 - Jul. 2024",
      },
    ],
  },
  {
    association: "TECHO in Europe",
    url: "https://www.techo.org",
    image: `${imageBasePath}/techo.jpeg`,
    positions: [
      {
        title: "Volunteer",
        description:
          "Co-constructed a house and a water sanitation system in the slums of Bogotá, Colombia for a family in need. Participated in a fundraising campaign to finance the construction of the house. Raised awareness about the living conditions in the slums and the importance of social inclusion.",
        date: "Aug. 2023 - Aug. 2023",
      },
    ],
  },
  {
    association: "Fundación Amigos del Mar",
    url: "https://www.amigosdelmar.org",
    image: `${imageBasePath}/amigosdelmar.jpeg`,
    positions: [
      {
        title: "Volunteer",
        description:
          "Engaged with children from the Tierra Bomba island in workshops such as english, technology, and even surf. Participated in a beach cleanup campaign in the coastal area of Cartagena, Colombia. Raised awareness about the importance of preserving marine ecosystems and the impact of pollution on marine life.",
        date: "Jul. 2023 - Jul. 2023",
      },
    ],
  },
];
