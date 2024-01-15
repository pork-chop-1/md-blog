import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { getTagMap } from "@/lib/api";

export default function TagsPage() {
  const tagMap = getTagMap()
  return <>
    <Header></Header>
    
    <div>{JSON.stringify(tagMap)}</div>
    <Footer />
  </>
}