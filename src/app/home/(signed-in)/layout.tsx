


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
	<div>
		<p>Signed In</p>
	{children}
		</div>
	</>
  );
}
