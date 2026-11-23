// The INTERCEPTED version: shown as a modal when you navigate here from the gallery.
import { notFound } from "next/navigation";
import { getPhoto, photos } from "@/lib/data";
import { Modal } from "../../../_components/modal";
import { PhotoCard } from "../../../_components/photo-card";

export function generateStaticParams() {
  return photos.map((p) => ({ id: p.id }));
}

export default async function PhotoModal({ params }: PageProps<"/learn/intercepting-routes/photos/[id]">) {
  const { id } = await params;
  const photo = await getCachedPhoto(id);
  if (!photo) notFound();
  return (
    <Modal>
      <p className="mb-3 rounded bg-zinc-100 p-2 text-sm dark:bg-zinc-800">🪟 Intercepted (@modal/(.)photos/[id])</p>
      <PhotoCard photo={photo} />
    </Modal>
  );
}

async function getCachedPhoto(id: string) {
  "use cache";
  return getPhoto(id);
}
