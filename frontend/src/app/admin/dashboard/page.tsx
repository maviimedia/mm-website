import { supabase } from "../../../lib/supabase";
import ClientDashboard from "./ClientDashboard";

interface WorkData {
  id: number;
  slug: string;
  title: string;
  clientName: string;
  clientType: string;
  services: string;
  brief: string;
  bigIdea: string;
  result: string;
  bannerUrl: string | null;
  thumbnailUrl: string | null;
  pill: string;
}

export default async function DashboardPage() {
  let formattedWorks: WorkData[] = [];
  let errorMessage = null;

  try {
    const { data: allWorks, error: fetchError } = await supabase.from("works").select("*").order("id", { ascending: false });
    
    if (fetchError) {
      throw new Error(fetchError.message);
    }

    if (allWorks) {
      formattedWorks = allWorks.map((work: any) => ({
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
    }
  } catch (error: any) {
    errorMessage = error.message || "An unexpected error occurred while fetching works";
  }
  
  return <ClientDashboard initialWorks={formattedWorks} fetchError={errorMessage} />;
}