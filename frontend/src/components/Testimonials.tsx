import { ArrowUpRight } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  handle: string;
  quote: string;
  image: string;
  mobileImage: string;
  bg: string;
  link: string;
}

const testimonials: Testimonial[] = [
  {
    id: "01",
    name: "APNA EDU ™",
    handle: "@apnaedu",
    quote:
      "In education no one trusts you early on, but Maviimedia fixed that day 1. The crm and 4k university portal cut counseling time in half, we worked twice as fast and actually made profit in our first quarter.",
    image: "/apna-edu.webp",
    mobileImage: "/apna-edu-mobile.webp",
    bg: "bg-[#FBF8F5]",
    link: "https://www.maviimedia.com/works/apna-education",
  },
  {
    id: "02",
    name: "LAPTOP STUDIO ®",
    handle: "@mylaptopstudio",
    quote:
      "Selling used laptops online was tough, people was always doubting us and trying to bargain. Mavii Media made our site look legit, now big companies actually buys in bulk full price.",
    image: "/laptop-studio.webp",
    mobileImage: "/laptop-studio-mobile.webp",
    bg: "bg-[#F0F3EF]",
    link: "https://www.maviimedia.com/works/laptop-studio",
  },
  {
    id: "03",
    name: "EDFORCE ™",
    handle: "@edforce",
    quote:
      "We was losing so much leads across our branches before Maviimedia. They made Ed-Force, cut reply time by 60% and we dont lose sales no more.",
    image: "/ed-force.webp",
    mobileImage: "/ed-force-mobile.webp",
    bg: "bg-[#F5F1EC]",
    link: "https://www.maviimedia.com/works/edforce",
  },
  {
    id: "04",
    name: "SOUL SOIL ®",
    handle: "@soulsoil",
    quote:
      "Soul was pretty much just a generic product before Mavii. The packaging got us straight onto store shelves and we sell at full price without discounting anything. They design stuff that sells, not just looks good.",
    image: "/soul-soil.webp",
    mobileImage: "/soul-soil-mobile.webp",
    bg: "bg-[#F5F1EC]",
    link: "https://www.maviimedia.com/works/soul",
  },
];

export default function Testimonials() {
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Maviimedia",
    review: testimonials.map((item) => ({
      "@type": "Review",
      reviewBody: item.quote,
      author: {
        "@type": "Person",
        name: item.name,
      },
    })),
  };

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-10 border-t border-white/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />

      <div className="mavii_wrap">
        <div className="pb-8 border-b border-white/10">
          <h2 className="font-['ArizonaFlare'] text-xl sm:text-2xl lg:text-3xl text-[#d4d4d4] hover:text-white transition-colors duration-150 cursor-default font-light">
            [ 04 / CLIENTS TESTIMONIALS ]
          </h2>
        </div>

        <div className="space-y-8 mt-10">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className={`${item.bg} text-[#111] p-0 rounded-xs sm:rounded-xs overflow-hidden flex flex-col md:flex-row items-stretch`}
            >
              <div className="relative w-full md:w-[320px] lg:w-[380px] shrink-0 aspect-square md:aspect-auto overflow-hidden">
                <picture className="w-full h-full block">
                  <source media="(max-width: 767px)" srcSet={item.mobileImage} />
                  <img
                    src={item.image}
                    alt={`${item.name} portrait`}
                    className="w-full h-full object-cover block"
                    loading="lazy"
                  />
                </picture>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${item.name}`}
                  title={`Visit ${item.name}`}
                  className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-1.5 bg-white text-[#111] px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide shadow-sm hover:bg-neutral-100 transition-colors"
                >
                  <span>Open</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex flex-col justify-between flex-1 p-6 sm:p-10 lg:p-14">
                <div>
                  <span className="font-['Helveesti'] font-medium text-sm sm:text-sm md:text-lg text-[#555] block mb-6 sm:mb-8">
                    {item.name.split(" ")[0]} REVIEW
                  </span>
                  <blockquote className="font-['ArizonaFlare'] font-[300] text-xl sm:text-2xl lg:text-[28px] xl:text-[30px] leading-[1.35] text-[#141414] tracking-normal">
                    "{item.quote}"
                  </blockquote>
                </div>

                <figcaption className="pt-8 sm:pt-10">
                  <div className="font-['Helveesti'] font-medium text-base sm:text-lg md:text-xl text-[#0a0a0a] leading-tight">
                    {item.name}
                  </div>
                  <div className="font-['Helveesti'] text-sm sm:text-base text-[#666] mt-1">
                    {item.handle}
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}