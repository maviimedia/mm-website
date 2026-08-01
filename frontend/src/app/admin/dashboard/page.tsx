import { supabase } from "../../../lib/supabase";
import ClientDashboard from "./ClientDashboard";

export default async function DashboardPage() {
  const { data: allWorks, error: fetchError } = await supabase.from("works").select("*");
  
  if (fetchError) {
    console.error(fetchError);
  }
  
  const formattedWorks = (allWorks || []).map((work: any) => ({
    id: work.id,
    slug: work.slug,
    title: work.title,
    clientName: work.client_name,
    clientType: work.client_type,
    services: work.services,
    brief: work.brief,
    bigIdea: work.big_idea,
    result: work.result,
    bannerUrl: work.banner_url,
    thumbnailUrl: work.thumbnail_url,
    pill: work.pill || "Case Study"
  }));
  
  return <ClientDashboard initialWorks={formattedWorks} fetchError={fetchError?.message || null} />;
}