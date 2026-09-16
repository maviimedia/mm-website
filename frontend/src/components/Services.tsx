import Image from "next/image";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  bgColor: string;
  textColor: string;
  pillBg: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "brand-strategy",
    title: "Branding",
    description:
      "It's the core of your company's identity. It guides all business decisions, ensuring a consistent and impactful presence in the market.",
    tags: [
      "Research & Insights",
      "Market Positioning",
      "Value Proposition",
      "Verbal Identity",
    ],
    image: "/branding-service.webp",
    bgColor: "bg-[#BFB5FF]",
    textColor: "text-[#111111]",
    pillBg: "bg-black/10 text-black border-black/10",
  },
  {
    id: "visual-identity",
    title: "Identity",
    description:
      "Visual identity is the unique visual language of your brand, creating memorable impressions and emotional connections with your audience.",
    tags: [
      "Art Direction",
      "Brand Guidelines",
      "Design Systems",
      "Packaging",
    ],
    image: "/identity-service.webp",
    bgColor: "bg-[#F4F4F4]",
    textColor: "text-[#111111]",
    pillBg: "bg-black/10 text-black border-black/10",
  },
  {
    id: "website",
    title: "Website",
    description:
      "Our website design services blend innovation and creativity to deliver user-centric solutions that elevate your brand and engage your audience.",
    tags: [
      "UI/UX Design",
      "Next.js Systems",
      "Creative Motion",
      "Web Applications",
    ],
    image: "/website-service.webp",
    bgColor: "bg-[#F7D378]",
    textColor: "text-[#111111]",
    pillBg: "bg-black/10 text-black border-black/10",
  },
  {
    id: "product",
    title: "Product",
    description:
      "Our product design services focus on creating intuitive and aesthetically pleasing products that resonate with your audience and stand out in the market.",
    tags: [
      "Product Strategy",
      "Mobile UI/UX",
      "Interactive Prototypes",
      "SaaS Architecture",
    ],
    image: "/product-service.webp",
    bgColor: "bg-[#161616]",
    textColor: "text-white",
    pillBg: "bg-white/10 text-white border-white/10",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 px-4 sm:px-6 lg:px-5">
      <div className="mavii_wrap flex flex-col gap-6 lg:gap-8">
        {servicesData.map((service) => (
          <article
            key={service.id}
            className={`w-full rounded-xs p-6 md:p-10 lg:p-6 ${service.bgColor} ${service.textColor} transition-transform duration-300`}
          >
            <div className="flex flex-col lg:flex-row lg:items-stretch justify-between gap-8 lg:gap-12">
              <div className="w-full lg:w-3/5 flex flex-col justify-between">
                <h3 className="font-['ArizonaFlare'] text-6xl sm:text-6xl lg:text-6xl font-light tracking-tight mb-6 lg:mb-12">
                  {service.title}
                </h3>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 items-start">
                  <p className="text-xs sm:text-sm leading-4 opacity-90">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-xs px-2.5 py-1 text-[10px] sm:text-xs font-medium border ${service.pillBg}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-2/5 flex items-center justify-center">
                <div className="relative w-full aspect-video rounded-xs overflow-hidden bg-black/10 shadow-sm">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain rounded-xs"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}