import type { Route } from "./+types/home";

export function loader({ context }: Route.LoaderArgs) {
  return { name: context.cloudflare.env.HELLO_NAME ?? "world" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <h1>Hello, {loaderData.name}!</h1>;
}
