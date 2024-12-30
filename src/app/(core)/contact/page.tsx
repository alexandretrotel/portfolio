import SocialCard from "@/app/(core)/contact/social-card";
import { socials } from "@/data/contact/socials";
import Animation from "@/components/core/animation";

export default async function Contact() {
  return (
    <Animation>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">Contact me</h1>
          <p className="text-sm text-muted-foreground">
            I always asked myself how to send all my social media links at once,
            so I decided to make my own page.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {socials?.map((social, index) => (
            <Animation key={social.title} delay={index * 0.25}>
              <SocialCard {...social} />
            </Animation>
          ))}
        </div>
      </div>
    </Animation>
  );
}
