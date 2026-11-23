import { Suspense } from "react";

// With cacheComponents on, `params` is request-time data: await it inside <Suspense>.
// (See /learn/dynamic-routes for the full explanation.)
export default function SingleUserPage({ params }: PageProps<"/home/[userId]">) {
	return (
		<Suspense fallback={<div>Loading user...</div>}>
			{params.then(({ userId }) => (
				<div>User Page: {userId}</div>
			))}
		</Suspense>
	);
}
