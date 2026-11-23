import type { Photo } from "@/lib/data";

export function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <div className="space-y-3">
      <div className="aspect-video rounded-xl" style={{ background: photo.color }} />
      <h2 className="text-2xl font-bold">{photo.title}</h2>
      <p className="font-mono text-xs text-zinc-500">color: {photo.color}</p>
    </div>
  );
}
