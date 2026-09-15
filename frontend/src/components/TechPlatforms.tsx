interface TechCategory {
  id: string;
  name: string;
  items: string[];
}

const techCapabilities: TechCategory[] = [
  {
    id: "01",
    name: "Mobile Development",
    items: [
      "iOS App",
      "Android App",
      "Flutter",
      "React Native",
      "Hybrid App",
      "Mobile Architecture",
      "Cross-Platform",
      "App Testing",
    ],
  },
  {
    id: "02",
    name: "Web Development",
    items: [
      "Next.js",
      "React.js",
      "Node.js",
      "Angular",
      "Vue.js",
      "Laravel",
      "Django",
      "Ruby on Rails",
    ],
  },
  {
    id: "03",
    name: "Core Languages",
    items: [
      "JavaScript",
      "Python",
      "Swift",
      "Java",
      "PHP",
      "C#",
      "C++",
      "Ruby",
    ],
  },
  {
    id: "04",
    name: "Platforms & Commerce",
    items: [
      "Shopify",
      "WordPress",
      "Magento",
      "WooCommerce",
      "Drupal",
      "Salesforce",
      "Squarespace",
      "BigCommerce",
    ],
  },
];

export default function TechPlatforms() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Technology Capabilities and Stacks",
    provider: {
      "@type": "Organization",
      name: "Maviimedia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Stacks",
      itemListElement: techCapabilities.map((category) => ({
        "@type": "OfferCatalog",
        name: category.name,
        itemListElement: category.items.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item,
          },
        })),
      })),
    },
  };

  return (
    <section className="bg-black text-white py-20 lg:py-28 px-6 lg:px-10 border-t border-white/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="mavii_wrap">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-12 border-b border-white/10">
          <h2 className="font-['HelveestiLabel'] text-xs tracking-[0.25em] uppercase text-[#777]">
            [ 03 / CAPABILITIES & TECH STACK ]
          </h2>
          <span className="font-['Helveesti'] text-sm text-[#888] font-light">
            GREAT FOR SPEED, SCALE & PERFORMANCE.
          </span>
        </div>

        <div className="divide-y divide-white/10">
          {techCapabilities.map((category) => (
            <div key={category.id} className="py-10 lg:py-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-['HelveestiLabel'] text-[11px] tracking-widest text-[#555]">
                  {category.id}
                </span>
                <h3 className="font-['HelveestiLabel'] text-xs tracking-[0.2em] uppercase text-[#888]">
                  {category.name}
                </h3>
              </div>

              <ul className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-3 sm:gap-y-4">
                {category.items.map((item, index) => (
                  <li key={item} className="inline-flex items-center gap-5 sm:gap-7">
                    <span className="font-['ArizonaFlare'] text-2xl sm:text-3xl lg:text-4xl text-[#d4d4d4] hover:text-white transition-colors duration-150 cursor-default font-light">
                      {item}
                    </span>
                    {index !== category.items.length - 1 && (
                      <span className="text-white/20 select-none text-xl sm:text-2xl font-light">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}