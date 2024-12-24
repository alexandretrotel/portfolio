import type { Metadata } from "next";
import Quatio from "./quatio";

export const metadata: Metadata = {
  title: "Quatio",
  description: "A game to test your algebraic skills.",
  openGraph: {
    title: "Quatio",
    description: "A game to test your algebraic skills.",
  },
};

export default async function Page() {
  return <Quatio />;
}
