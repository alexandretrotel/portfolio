import { Donations } from "@/types/footer";
import { Links } from "@/types/navigation";

export const donations: Donations = [
  {
    title: "Bitcoin",
    address: "bc1qdl3e2ljqhrawvsq9dj7rtjz4ms989uf72c3gq6",
    type: "bitcoin",
  },
  {
    title: "Ethereum",
    address: "0x8333c1B5131CC694c3A238E41e50cbc236e73DbC",
    type: "ethereum",
  },
];

export const secondaryLinks: Links = [
  {
    title: "Who Am I",
    href: "/whoami",
  },
  {
    title: "Songs",
    href: "/songs",
  },
  {
    title: "Games",
    href: "/games",
  },
];
