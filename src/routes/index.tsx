import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/site/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arshil Anwar — Full-Stack Developer Portfolio" },
      { name: "description", content: "Arshil Anwar — BCA student & full-stack developer in Prayagraj. React, Node, Java, and a love for the details that make software feel finished." },
      { property: "og:title", content: "Arshil Anwar — Full-Stack Developer Portfolio" },
      { property: "og:description", content: "Selected work, skills, journey, and contact." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});
