/**
 * next/image and next/font
 * Both are built-in optimizations: the image is resized, lazy-loaded and given
 * fixed dimensions. The font is downloaded at build time and served from your own domain.
 */
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import vercelLogo from "../../../../public/vercel.svg"; // static import: width and height are read for you
import { C, Code, Demo, Lesson, Note, Section } from "../_components/lesson";

export const metadata = { title: "Images & Fonts" };

// Fonts load at build time, so there's no request to Google from the browser and no layout shift.
// Create fonts at the top of the module (not inside a component).
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function Page() {
  return (
    <Lesson
      title="Images & Fonts"
      summary={
        <>
          <C>&lt;Image&gt;</C> from <C>next/image</C> serves images at the right size and format, lazy-loads
          them, and stops the page from jumping as they load. <C>next/font</C> hosts fonts on your own
          domain, with no layout shift and no requests to Google from the browser.
        </>
      }
      files={["src/app/learn/images-and-fonts/page.tsx", "src/app/layout.tsx (Geist fonts)", "public/"]}
    >
      <Section title="1. Images from /public">
        <p>
          Files in <C>public/</C> are served from the root of your site, so <C>public/next.svg</C> is at{" "}
          <C>/next.svg</C>. Give <C>width</C> and <C>height</C> so the browser can save space for the image
          before it loads.
        </p>
        <Code>{`<Image src="/next.svg" alt="Next.js logo" width={180} height={37} />`}</Code>
        <Demo>
          <Image src="/next.svg" alt="Next.js logo" width={180} height={37} className="dark:invert" />
        </Demo>
      </Section>

      <Section title="2. Static imports">
        <p>Import the file instead and Next.js reads its width and height for you.</p>
        <Code>{`
import vercelLogo from "../../public/vercel.svg";
<Image src={vercelLogo} alt="Vercel" height={40} />
`}</Code>
        <Demo>
          <Image src={vercelLogo} alt="Vercel logo" height={40} className="dark:invert" />
        </Demo>
      </Section>

      <Section title="3. fill: let the image size itself to its parent">
        <Code>{`
<div className="relative h-40 w-full">
  <Image src="/globe.svg" alt="Globe" fill className="object-contain" />
</div>
`}</Code>
        <Demo>
          <div className="relative h-40 w-full rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <Image src="/globe.svg" alt="Globe icon" fill className="object-contain p-4" />
          </div>
        </Demo>
        <Note>
          To load images from another site, add that domain to <C>images.remotePatterns</C> in{" "}
          <C>next.config.ts</C>. Add <C>preload</C> to the main image at the top of the page so it loads
          first.
        </Note>
      </Section>

      <Section title="4. Fonts with next/font">
        <Code>{`
import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

<h2 className={playfair.className}>Elegant heading</h2>
`}</Code>
        <Demo>
          <p className={`${playfair.className} text-4xl font-bold`}>The quick brown fox</p>
          <p className="mt-2 font-mono text-sm">This line uses Geist Mono, loaded in src/app/layout.tsx</p>
        </Demo>
        <p>
          For a font file you own, use <C>localFont</C> from <C>next/font/local</C> with{" "}
          <C>src: &quot;./my-font.woff2&quot;</C>.
        </p>
      </Section>
    </Lesson>
  );
}
