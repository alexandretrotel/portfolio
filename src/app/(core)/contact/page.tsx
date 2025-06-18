import SocialCard from "@/app/(core)/contact/social-card";
import { socials } from "@/data/contact/socials";

export default async function Contact() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">Contact me</h1>
        <p className="text-muted-foreground text-sm">
          Feel free to reach out to me on social media or by email.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {socials?.map((social) => {
          if (social?.disabled) {
            return null;
          }

          return <SocialCard key={social.title} {...social} />;
        })}
      </div>
    </div>
  );
}
