// The full page: what you see on a direct visit or a refresh of /learn/intercepting-routes/photos/[id]
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhoto, photos } from "@/lib/data";
import { PhotoCard } from "../../_components/photo-card";

export function generateStaticParams() {
  return photos.map((p) => ({ id: p.id }));
}

export default async function PhotoPage({ params }: PageProps<"/learn/intercepting-routes/photos/[id]">) {
  const { id } = await params;
  const photo = await getCachedPhoto(id);
  if (!photo) notFound();
  return (
    <div className="space-y-4">
      <p className="rounded bg-zinc-100 p-2 text-sm dark:bg-zinc-900">📄 Full page (photos/[id]/page.tsx)</p>
      <PhotoCard photo={photo} />
      <Link href="/learn/intercepting-routes" className="text-sm text-blue-600 underline">← Back to gallery</Link>
    </div>
  );
}

async function getCachedPhoto(id: string) {
  "use cache";
  return getPhoto(id);
}
