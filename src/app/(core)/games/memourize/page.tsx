import type { Metadata } from "next";
import Memourize from "./memourize";

export const metadata: Metadata = {
  title: "Memourize",
  description: "A game to test your memory.",
  openGraph: {
    title: "Memourize",
    description: "A game to test your memory.",
  },
};

export default async function Page() {
  return <Memourize />;
}
