"use client";
import { useEffect, useState } from "react";
import {
  faLinkedin,
  faXTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ShareButton() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    facebook: `http://www.facebook.com/share.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
  };

  return (
    <ul className="flex space-x-4">
      <li>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center border-2 border-gray-500 rounded-full hover:border-white transition"
        >
          <FontAwesomeIcon
            icon={faXTwitter}
            className="w-5 h-5 text-gray-500 hover:text-white transition"
          />
        </a>
      </li>
      <li>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center border-2 border-gray-500 rounded-full hover:border-white transition"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            className="w-5 h-5 text-gray-500 hover:text-white transition"
          />
        </a>
      </li>
      <li>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center border-2 border-gray-500 rounded-full hover:border-white transition"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="w-5 h-5 text-gray-500 hover:text-white transition"
          />
        </a>
      </li>
    </ul>
  );
}
