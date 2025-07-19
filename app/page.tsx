import { PAGES } from "@/utils/constant";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(`/${PAGES.LOGIN}`);
}
