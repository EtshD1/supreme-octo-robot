/**
 * INTERCEPTING ROUTES (+ a parallel @modal slot)
 *
 * photos/[id]/page.tsx              → the full photo page (direct visit or refresh)
 * @modal/(.)photos/[id]/page.tsx    → the SAME URL shown as a modal when you click from the grid
 * @modal/default.tsx                → renders nothing when no modal is open
 *
 * "(.)" means "intercept a route at the same level". (..) goes up one level, (...) starts from app/.
 */
import { C, Lesson } from "../_components/lesson";

export default function InterceptLayout({ children, modal }: LayoutProps<"/learn/intercepting-routes">) {
  return (
    <Lesson
      title="Intercepting Routes (Modal)"
      summary={
        <>
          Click a photo and it opens in a <b>modal</b>, but the URL still changes to <C>/photos/3</C>. Refresh
          the page or share the link and you get the full photo page instead. This is how photo feeds on
          social sites work.
        </>
      }
      files={[
        "src/app/learn/intercepting-routes/layout.tsx",
        "src/app/learn/intercepting-routes/photos/[id]/page.tsx",
        "src/app/learn/intercepting-routes/@modal/(.)photos/[id]/page.tsx",
        "src/app/learn/intercepting-routes/@modal/default.tsx",
      ]}
    >
      {children}
      {modal}
    </Lesson>
  );
}
