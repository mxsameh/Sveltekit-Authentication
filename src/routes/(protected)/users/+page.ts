import type { Load } from "@sveltejs/kit";

export const load : Load = async ({ fetch, url }) =>
{
  const response = await fetch(`${url.origin}/api/users`)
  const users = await response.json()

  return {
    users
  }
}
