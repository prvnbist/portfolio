import { motion } from "framer-motion";

import { cn } from "@/utils";

import classes from "./header.module.css";

const SOCIALS = [
  { title: "👨‍💻 Github", url: "https://www.github.com/prvnbist" },
  { title: "🤝🏼 LinkedIn", url: "https://www.linkedin.com/in/prvnbist" },
  { title: "👨‍💻 Codepen", url: "https://www.codepen.io/prvnbist" },
  {
    title: "🖼️ Instagram",
    url: "https://www.instagram.com/prvnbist",
  },
  { title: "🐤 Twitter", url: "https://www.twitter.com/prvnbist" },
  { title: "🎨 Dribbble", url: "https://www.dribbble.com/prvnbist" },
];

const ANIMATE_PROPS = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export default function Header() {
  return (
    <header className={classes.header}>
      <div>
        <motion.h2
          {...ANIMATE_PROPS}
          className={cn(classes.name, "text-yellow-300")}
        >
          Praveen Bisht
        </motion.h2>
        <motion.h1 {...ANIMATE_PROPS} className={classes.tagline}>
          I design{" "}
          <span role="img" aria-label="paint board">
            🎨
          </span>{" "}
          & code{" "}
          <span role="img" aria-label="computer">
            👨‍💻
          </span>
        </motion.h1>
        <motion.p {...ANIMATE_PROPS} className={classes.about}>
          Hello! 👋 I&apos;m a{" "}
          <span className="text-yellow-300">frontend engineer</span>, who
          specializes in bringing ideas to life with{" "}
          <span className="text-yellow-300">pixel perfect precision.</span> My
          background in design allows me to seamlessly bridge the gap between
          design and development team.
        </motion.p>
        <motion.ul {...ANIMATE_PROPS} className={classes.socials}>
          {SOCIALS.map((social) => (
            <li key={social.url} className={classes.social}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.title}
                className="text-indigo-400"
              >
                {social.title}
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </header>
  );
}
