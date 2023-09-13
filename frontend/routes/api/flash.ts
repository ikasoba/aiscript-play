import { Handler, HandlerContext } from "$fresh/server.ts";
import { $object, $string, type Infer } from "lizod/";
import ms from "ms/";

// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
const JOKES = [
  "Why do Java developers often wear glasses? They can't C#.",
  "A SQL query walks into a bar, goes up to two tables and says “can I join you?”",
  "Wasn't hard to crack Forrest Gump's password. 1forrest1.",
  "I love pressing the F5 key. It's refreshing.",
  "Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”",
  "There are 10 types of people in the world. Those who understand binary and those who don't.",
  "Why are assembly programmers often wet? They work below C level.",
  "My favourite computer based band is the Black IPs.",
  "What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.",
  "An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.",
];

const validateGetFlashBody = $object({
  id: $string,
  instance: $string,
});

type GetFlashBody = Infer<typeof validateGetFlashBody>;

const kv = await Deno.openKv("api_cache");

export const handler: Handler = async (_req, _ctx) => {
  if (_req.method != "POST") {
    return new Response(null, {
      status: 405,
    });
  }

  const reqBody = await _req.json();
  if (!validateGetFlashBody(reqBody)) {
    return new Response(null, {
      status: 400,
    });
  }

  const instanceURL = reqBody.instance.replace(
    /^(?!https?:\/\/)/,
    "https://",
  );

  const apiReq = new Request(
    new URL("/api/flash/show", instanceURL),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ i: null, flashId: reqBody.id }),
    },
  );

  const res = await requestAndCache(kv, apiReq);

  return new Response(res.body, {
    headers: {
      "Content-Type": res.headers.get("Content-Type")!,
      "Content-Length": res.headers.get("Content-Length")!,
    },
    status: res.status,
    statusText: res.statusText,
  });
};

const requestAndCache = async (
  kv: Deno.Kv,
  req: Request,
  expiresIn: number = ms("3h"),
): Promise<Response> => {
  const key = await requestToKey(req.clone());

  let res = (await kv.get<CacheEntry>(key)).value;
  if (res == null) {
    console.log("fetch flash", key);

    res = await responseToCacheEntry(await fetch(req));

    await kv.set(key, res, {
      expireIn: expiresIn,
    });
  }

  return new Response(res.body, res);
};

const requestToKey = async (req: Request): Promise<Deno.KvKey> => {
  const body = await req.json();
  return [req.url, body.flashId];
};

const responseToCacheEntry = async (res: Response): Promise<CacheEntry> => {
  return {
    headers: Object.fromEntries(res.headers.entries()),
    status: res.status,
    statusText: res.statusText,
    body: await res.text(),
  };
};

interface CacheEntry {
  headers: Record<string, string>;
  status: number;
  statusText: string;
  body: string;
}
