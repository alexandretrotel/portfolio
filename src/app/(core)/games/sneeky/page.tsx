import type { Metadata } from "next";
import Sneeky from "./sneeky";

export const metadata: Metadata = {
  title: "Sneeky",
  description: "Sneeky is a remaster of the classic Snake game.",
  openGraph: {
    title: "Sneeky",
    description: "Sneeky is a remaster of the classic Snake game.",
  },
};

export default async function Page() {
  return (
    <div className="relative w-full h-full">
      <Sneeky />
    </div>
  );
}
