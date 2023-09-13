import { values } from "@syuilo/aiscript";

const dummyUser = {
  id: "dummy",
  name: "dummy",
  username: "dummy",
};

export async function createPlayStdLib(
  token: string | null,
  instance: string | null,
) {
  const user = (token && instance)
    ? await fetch(new URL("/api/i", instance), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        i: token,
      }),
    }).then((x) => x.json())
    : dummyUser;

  return {
    "USER_ID": values.STR(user.id),
    "USER_NAME": values.STR(user.name),
    "USER_USERNAME": values.STR(user.username),
    "CURRENT_URL": values.STR(location.href),
    "Mk:url": values.FN_NATIVE(() => {
      return values.STR(location.href);
    }),
    "THIS_URL": values.STR(location.href),
  };
}
