"use client";

import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

type Quote = {
  text: string;
  author: string | null;
};

function iconFor(platform: string) {
  const value = platform.toLowerCase();
  if (value.includes("github")) return <FaGithub className="w-5 h-5" />;
  if (value.includes("linkedin")) return <FaLinkedin className="w-5 h-5" />;
  if (value.includes("twitter") || value.includes("x")) return <FaTwitter className="w-5 h-5" />;
  if (value.includes("instagram")) return <FaInstagram className="w-5 h-5" />;
  if (value.includes("youtube")) return <FaYoutube className="w-5 h-5" />;
  if (value.includes("facebook")) return <FaFacebook className="w-5 h-5" />;
  if (value.includes("email") || value.includes("mail")) return <FaEnvelope className="w-5 h-5" />;
  return <FaGlobe className="w-5 h-5" />;
}

export default function Footer({
  socialLinks,
  quote,
}: {
  socialLinks: SocialLink[];
  quote: Quote | null;
}) {
  return (
    <footer className="bg-footerGreen text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {socialLinks.map((link) => {
            const isEmail =
              link.platform.toLowerCase().includes("email") ||
              link.platform.toLowerCase().includes("mail");

            const href =
              isEmail && !link.url.startsWith("mailto:")
                ? `mailto:${link.url}`
                : link.url;

            return (
              <a
                key={link.id}
                href={href}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className="flex items-center gap-2 text-green-100 hover:text-white transition-colors break-all"
              >
                {iconFor(link.platform)}
                <span className="text-sm">{link.platform}</span>
              </a>
            );
          })}
        </div>

        {socialLinks.length === 0 && (
          <p className="text-center text-green-200 mb-8 text-sm">
            No social links added yet.
          </p>
        )}

        <div className="h-px w-full bg-green-700 mb-8" />

        {quote && (
          <div className="text-center">
            <p className="italic text-green-50 break-words">&ldquo;{quote.text}&rdquo;</p>
            {quote.author && (
              <p className="text-sm text-green-200 mt-2">— {quote.author}</p>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
