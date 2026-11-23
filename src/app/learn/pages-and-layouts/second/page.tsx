// Folder "second" + page.tsx = the URL /learn/pages-and-layouts/second
export default function Page() {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">second/page.tsx</p>
      <p>This is the second child page. It&apos;s rendered where the layout puts {"{children}"}.</p>
    </div>
  );
}
