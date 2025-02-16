import SocialCard from "@/app/(core)/contact/social-card";
import { socials } from "@/data/contact/socials";
import Animation from "@/components/core/animation";
import { ANIMATION_DELAY } from "@/data/animation";

export default async function Contact() {
  return (
    <Animation>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">Contact me</h1>
          <p className="text-sm text-muted-foreground">
            Feel free to reach out to me on social media or by email.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {socials?.map((social, index) => {
            if (social?.disabled) {
              return null;
            }

            return (
              <Animation key={social.title} delay={index * ANIMATION_DELAY}>
                <SocialCard {...social} />
              </Animation>
            );
          })}
        </div>
      </div>
    </Animation>
  );
}
