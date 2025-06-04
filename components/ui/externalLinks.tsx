import React, { useMemo } from "react";
import type { ExternalIds, ExtenalLinksTypes } from "@/types";
import { IconIMDB } from "@/components";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ExternalLinks({links}: {links: ExternalIds}) {
  const imdbType = useMemo(() => links.imdb_id?.startsWith("nm") ? 'name' : 'title', [links]);

  type Socials = {
    key: keyof ExtenalLinksTypes;
    title: string;
    link: string;
    icon: React.ReactNode;
    aria: string
  };

  const socials = useMemo(() => links ? [
    { key: "twitter_id", title: "Twitter", link: `https://twitter.com/${links.twitter_id}`, icon: <Icon icon="ph:twitter-logo" />, aria: "Link to Twitter account" },
    { key: "facebook_id", title: "Facebook", link: `https://www.facebook.com/${links.facebook_id}`, icon: <Icon icon="ph:facebook-logo" />, aria: "Link to Facebook account" },
    { key: "instagram_id", title: "Instagram", link: `https://instagram.com/${links.instagram_id}`, icon: <Icon icon="ph:instagram-logo" />, aria: "Link to Instagram account" },
    { key: "imdb_id", title: "IMDB", link: `https://www.imdb.com/${imdbType}/${links.imdb_id}`, icon: <IconIMDB className="w-[1.5rem] h-[1.5rem]" />, aria: "Link to IMDb account" },
    { key: "github_id", title: "Github", link: `https://github.com/${links.github_id}`, icon: <Icon icon="ph:github-logo" />, aria: "Link to GitHub account" },
    { key: "linkedin_id", title: "LinkedIn", link: `https://www.linkedin.com/in/${links.linkedin_id}`, icon: <Icon icon="ph:linkedin-logo" />, aria: "Link to LinkedIn account" },
    { key: "email", title: "Email", link: links.email, icon: <Icon icon="ph:envelope-simple" />, aria: "Link to Email" },
    { key: "homepage", title: "Homepage", link: links.homepage, icon: <Icon icon="ph:link-simple" />, aria: "Link to Homepage" },
  ] as Socials[] : [], [links, imdbType]);

  return (
    <div className="flex gap-5 items-center text-lg mt-5">
      {
        socials?.filter(({ key }) => links[key as keyof ExtenalLinksTypes])
        .map(({key, link, aria, icon}) => (
            <a
              key={key}
              className="mh__link text-[1.5rem]"
              href={link}
              target="_blank"
              rel="noopener"
              aria-label={aria}
          >
              {icon}
          </a>
        ))
      }
    </div>
  )
}
