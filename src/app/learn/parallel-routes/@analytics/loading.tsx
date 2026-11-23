// loading.tsx inside a slot only covers THAT slot.
export default function Loading() {
  return <p className="animate-pulse text-sm text-zinc-400">⏳ Crunching numbers (2s)...</p>;
}
