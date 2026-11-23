// Folder "first" + page.tsx = the URL /learn/pages-and-layouts/first
export default function Page() {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">first/page.tsx</p>
      <p>This is the first child page. It&apos;s rendered where the layout puts {"{children}"}.</p>
    </div>
  );
}
