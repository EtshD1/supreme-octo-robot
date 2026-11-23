


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
	<div>
		<p>Not Signed in</p>
	{children}
		</div>
	</>
  );
}
