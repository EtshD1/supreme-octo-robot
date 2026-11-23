export default function SettingsPage() {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">settings/page.tsx</p>
      <p>
        <b>Click-navigate here:</b> the slots keep showing what they showed before.
        <br />
        <b>Hard-reload here:</b> the slots have no <code>settings</code> page, so Next.js renders their{" "}
        <code>default.tsx</code> instead.
      </p>
    </div>
  );
}
