import Link from "next/link";
import { photos } from "@/lib/data";

export default function Gallery() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {photos.map((p) => (
        <Link
          key={p.id}
          href={`/learn/intercepting-routes/photos/${p.id}`}
          className="flex aspect-square items-end rounded-xl p-3 font-semibold text-white shadow transition hover:scale-[1.03]"
          style={{ background: p.color }}
        >
          {p.title}
        </Link>
      ))}
    </div>
  );
}
