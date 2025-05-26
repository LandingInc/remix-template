import type { Route } from './+types/test';

export async function loader({}: Route.LoaderArgs) {
  const response = await fetch('http://localhost:3000/api/test');
  if (!response.ok) {
    throw new Error('Failed to fetch test');
  }

  const data = await response.json();
  console.log('Test server loader data', data);
  return { data };
}

export async function clientLoader({
  context,
  params,
  request,
  serverLoader,
}: Route.ClientLoaderArgs) {
  console.log('Test client loader', context, params, request);

  const serverData = await serverLoader();
  console.log('Test client loader server data', serverData);

  const response = await fetch('/api/test');
  if (!response.ok) {
    throw new Error('Failed to fetch test');
  }

  const data = await response.json();
  console.log('Test client loader data', data);
  return { data };
}

clientLoader.hydrate = true as const;

export default function Test({}: Route.ComponentProps) {
  return <div>Test</div>;
}
