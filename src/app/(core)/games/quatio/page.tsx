import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quatio",
  description: "A game to test your algebraic skills.",
  openGraph: {
    title: "Quatio",
    description: "A game to test your algebraic skills.",
  },
};

export default async function Quatio() {
  return <Quatio />;
}
