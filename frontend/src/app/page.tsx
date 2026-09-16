import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";
import MediaGrid from "../components/MediaGrid";
import TechPlatforms from "../components/TechPlatforms";
import Testimonials from "../components/Testimonials";

export default async function Home() {
  const { data: allWorks } = await supabase
    .from("works")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <style>{`
        @keyframes arrowSlideHorizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }
        .animate-arrow-horizontal {
          animation: arrowSlideHorizontal 1.2s ease-in-out infinite;
        }
      `}</style>

      <section className="py-20 px-6 lg:px-10 text-white">
        <div className="mavii_wrap flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <p className="font-['ArizonaFlare'] text-xl md:text-3xl lg:text-3xl leading-none font-light">
              Hello, we work as your true partner to build your brand, websites, and software with clear communication and on-time delivery.
            </p>

            <div className="mt-8 md:mt-10">
              <Link
                href="https://calendly.com/maviimedia/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0022FF] px-6 py-2.5 text-base font-medium tracking-wider text-white uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
              >
                <span>Book Appointment</span>
                <span className="inline-flex items-center justify-center">
                  <ArrowRight
                    size={16}
                    className="animate-arrow-horizontal shrink-0 text-white"
                  />
                </span>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block font-['ArizonaFlare'] text-6xl md:text-6xl">100%</span>
                <span className="font-['HelveestiLabel'] text-[11px] tracking-[0.1em] uppercase text-[#7d7d7d]">ON-TIME DELIVERY</span>
              </div>
              <div>
                <span className="block font-['ArizonaFlare'] text-6xl md:text-6xl">24/7</span>
                <span className="font-['HelveestiLabel'] text-[11px] tracking-[0.1em] uppercase text-[#7d7d7d]">CLIENT SUPPORT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="media" className="media">
        <div className="mavii_wrap">
          <MediaGrid works={allWorks || []} />
        </div>
      </section>

      <TechPlatforms />

      <Testimonials />

      <section className="bg-black py-6 text-center">
        <div className="mavii_wrap px-6 lg:px-10">
          <h2 className="font-['HelveestiLabel'] text-[20px] tracking-[0.12em] uppercase text-[#7d7d7d] mb-12">
            #Beloved Clients
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