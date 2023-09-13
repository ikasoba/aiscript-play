import localforage from "localforage";
import { Emojis } from "../utils/storage.ts";
declare const localforage:
  (typeof import("../@types/localforage.ts"))["default"];

export class Storage {
  static async token(): Promise<string | null> {
    return await localforage.getItem("misskeyToken");
  }

  static async setToken(newToken: string | null): Promise<void> {
    await localforage.setItem("misskeyToken", newToken);
  }

  static async instance(): Promise<string | null> {
    return await localforage.getItem("myInstance");
  }

  static async setInstance(newInstance: string | null): Promise<void> {
    await localforage.setItem("myInstance", newInstance);
  }

  static async emojis(): Promise<Emojis | null> {
    return await localforage.getItem("emojis");
  }

  static async setEmojis(newEmojis: Emojis): Promise<void> {
    await localforage.setItem("emojis", newEmojis);
  }
}
