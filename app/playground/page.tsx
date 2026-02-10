import { redirect } from "next/navigation";

export default function PlaygroundRedirect(): never {
    redirect("/components");
}
