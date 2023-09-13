import { asset, Head } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { SiteHeader } from "../components/SiteHeader.tsx";
import { Storage } from "../storage/index.ts";
import { LoginForm } from "../islands/LoginForm.tsx";

export default function CallBack() {
  return <LoginForm />;
}
