import { supabase } from "../lib/supabase";
import MediaGrid from "../components/MediaGrid";

export default async function Home() {
  const { data: allWorks } = await supabase.from("works").select("*");

  return (
    <section id="media" className="media">
      <div className="mavii_wrap">
        <MediaGrid works={allWorks || []} />
      </div>
    </section>
  );
}