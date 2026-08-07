import { supabase } from "../lib/supabase";
import MediaGrid from "../components/MediaGrid";

export default async function Home() {
  const { data: allWorks } = await supabase.from("works").select("*");

  return (
    <>
      <section id="media" className="media">
        <div className="mavii_wrap">
          <MediaGrid works={allWorks || []} />
        </div>
      </section>

      <section className="bg-[#000000] py-6 text-center">
        <div className="mavii_wrap px-6 lg:px-10">
          <h2 className="font-['HelveestiLabel'] text-[12px] tracking-[0.12em] uppercase text-[#7d7d7d] mb-6">
            Our Clients
          </h2>
          
          <div className="relative w-full flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_15%,_black_85%,transparent_100%)]">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-100%); }
              }
              .animate-marquee {
                display: flex;
                animation: marquee 35s linear infinite;
                min-width: 100%;
                flex-shrink: 0;
                align-items: center;
              }
              .client-logo {
                flex-shrink: 0;
                width: calc((100vw - 7rem) / 8);
                height: auto;
                object-fit: contain;
                padding: 0 2rem;
              }
              @media (max-width: 1024px) {
                .client-logo {
                  width: calc((100vw - 3rem) / 3);
                  padding: 0 0.5rem;
                }
              }
            `}</style>
            
            <div className="animate-marquee">
              <img src="/clients/APNA.png" alt="APNA" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/EDFORCE.png" alt="EDFORCE" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/GODREJ.png" alt="GODREJ" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/KLONOO.png" alt="KLONOO" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/KYROS.png" alt="KYROS" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/LAPTOP%20STUDIO.png" alt="LAPTOP STUDIO" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/LOCOLAYER.png" alt="LOCOLAYER" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/RETRO%20STATION.png" alt="RETRO STATION" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/SOUL.png" alt="SOUL" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/XTL.png" alt="XTL" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
            </div>
            
            <div className="animate-marquee" aria-hidden="true">
              <img src="/clients/APNA.png" alt="APNA" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/EDFORCE.png" alt="EDFORCE" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/GODREJ.png" alt="GODREJ" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/KLONOO.png" alt="KLONOO" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/KYROS.png" alt="KYROS" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/LAPTOP%20STUDIO.png" alt="LAPTOP STUDIO" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/LOCOLAYER.png" alt="LOCOLAYER" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/RETRO%20STATION.png" alt="RETRO STATION" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/SOUL.png" alt="SOUL" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
              <img src="/clients/XTL.png" alt="XTL" className="client-logo opacity-50 hover:opacity-100 transition-opacity duration-250" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}