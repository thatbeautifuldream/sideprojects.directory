import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Side Projects Directory | Showcase Your Developer Projects",
  description:
    "Discover and showcase side projects from developers around the world. A platform for developers to highlight their personal projects, experiments, and open-source contributions.",
  keywords: [
    "side projects",
    "developer portfolio",
    "project showcase",
    "open source projects",
    "developer projects",
    "coding projects",
    "software projects",
    "GitHub projects",
    "developer showcase",
    "project directory",
  ],
  openGraph: {
    title: "Side Projects Directory",
    description:
      "Showcase your developer side projects and discover what others are building",
    url: "https://sideprojects.directory",
    siteName: "Side Projects Directory",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Side Projects Directory Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Side Projects Directory",
    description:
      "Showcase your developer side projects and discover what others are building",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sideprojects.directory",
  },
};
