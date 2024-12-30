import { Investments } from "@/types/about/investments";

const imageBasePath = "/investments";

export const investments: Investments = [
  {
    asset: "BlaBlaCar",
    description:
      "BlaBlaCar is a French online marketplace for carpooling. Its website and mobile apps connect drivers and passengers willing to travel together between cities and share the cost of the journey.",
    date: "2023 - Present",
    url: "https://www.blablacar.com/",
    image: `${imageBasePath}/blablacar.jpeg`,
  },
  {
    asset: "Ledger",
    description:
      "Ledger is a French company that develops security and infrastructure solutions for cryptocurrencies as well as blockchain applications for individuals and companies.",
    date: "2023 - Present",
    url: "https://www.ledger.com/",
    image: `${imageBasePath}/ledger.jpeg`,
  },
  {
    asset: "Bitcoin",
    description:
      "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    date: "2021 - Present",
    url: "https://bitcoin.org/",
    image: `${imageBasePath}/bitcoin.jpeg`,
  },
];
