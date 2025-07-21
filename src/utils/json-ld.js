import siteData from "../data/site-data.json";

export default function jsonLDGenerator(pageData = {}) {
  const {
    title = siteData.title,
    description = siteData.description,
    url = siteData.url,
    image = siteData.image.src,
    type = "website",
    publishedTime,
    modifiedTime,
  } = pageData;

  // Base Organization schema
  const organization = {
    "@type": "Organization",
    name: siteData.company.name,
    url: siteData.url,
    description: siteData.company.description,
    foundingDate: siteData.company.founded,
    logo: {
      "@type": "ImageObject",
      url: `${siteData.url}/litlynx_logo.webp`,
      width: 400,
      height: 400,
    },
    sameAs: [
      siteData.social.linkedin,
      siteData.social.github,
      siteData.social.xolo,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "English",
    },
    areaServed: "Worldwide",
    serviceType: siteData.company.services,
  };

  // Base WebSite schema
  const website = {
    "@type": "WebSite",
    name: title,
    description: description,
    url: url,
    publisher: organization,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteData.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Professional Service schema for services
  const professionalService = {
    "@type": "ProfessionalService",
    name: siteData.company.name,
    description: siteData.company.description,
    url: siteData.url,
    serviceType: siteData.company.services,
    provider: organization,
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: siteData.company.services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
          description: `Professional ${service.toLowerCase()} services by Litlynx`,
        },
      })),
    },
  };

  // Breadcrumb schema
  const breadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteData.url,
      },
    ],
  };

  // Combine all schemas
  const schemas = [
    {
      "@context": "https://schema.org",
      "@graph": [organization, website, professionalService, breadcrumbList],
    },
  ];

  // Add article schema if it's an article type
  if (type === "article" && publishedTime) {
    const article = {
      "@type": "Article",
      headline: title,
      description: description,
      image: image,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: organization,
      publisher: organization,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    };
    schemas[0]["@graph"].push(article);
  }

  return `<script type="application/ld+json">
    ${JSON.stringify(schemas[0], null, 2)}
  </script>`;
}
