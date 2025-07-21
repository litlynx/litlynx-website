// SEO utility functions for Litlynx website

/**
 * Generates optimized meta title with brand consistency
 * @param {string} pageTitle - The specific page title
 * @param {boolean} includeBrand - Whether to include brand name
 * @returns {string} - Formatted title
 */
export function generateTitle(pageTitle, includeBrand = true) {
  const brandName = "Litlynx";
  const suffix = "Modern Frontend Web Development";
  
  if (!includeBrand) return pageTitle;
  
  if (pageTitle === brandName) {
    return `${brandName} - ${suffix}`;
  }
  
  return `${pageTitle} | ${brandName}`;
}

/**
 * Generates SEO-friendly descriptions with optimal length
 * @param {string} description - Base description
 * @param {number} maxLength - Maximum character length (default: 160)
 * @returns {string} - Truncated description
 */
export function generateDescription(description, maxLength = 160) {
  if (description.length <= maxLength) return description;
  
  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Generates comprehensive keywords array
 * @param {string[]} pageKeywords - Page-specific keywords
 * @param {string[]} globalKeywords - Site-wide keywords
 * @returns {string[]} - Combined unique keywords
 */
export function generateKeywords(pageKeywords = [], globalKeywords = []) {
  const defaultKeywords = [
    'frontend development',
    'web development',
    'React development',
    'Vue.js development',
    'Astro development',
    'JavaScript development',
    'TypeScript development',
    'responsive design',
    'performance optimization',
    'modern web applications'
  ];
  
  return [...new Set([...pageKeywords, ...globalKeywords, ...defaultKeywords])];
}

/**
 * Creates structured data for breadcrumbs
 * @param {Array} breadcrumbs - Array of breadcrumb objects {name, url}
 * @returns {string} - JSON-LD script tag
 */
export function generateBreadcrumbsLD(breadcrumbs) {
  const itemListElement = breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };

  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

/**
 * Generates FAQ structured data
 * @param {Array} faqs - Array of FAQ objects {question, answer}
 * @returns {string} - JSON-LD script tag
 */
export function generateFAQLD(faqs) {
  const mainEntity = faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity
  };

  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

/**
 * Optimizes Open Graph image URL
 * @param {string} imagePath - Relative or absolute image path
 * @param {string} baseUrl - Site base URL
 * @returns {string} - Absolute image URL
 */
export function generateOGImageURL(imagePath, baseUrl = 'https://www.litlynx.com') {
  if (imagePath.startsWith('http')) return imagePath;
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Validates and formats canonical URL
 * @param {string} url - URL to canonicalize
 * @param {string} baseUrl - Site base URL
 * @returns {string} - Canonical URL
 */
export function generateCanonicalURL(url, baseUrl = 'https://www.litlynx.com') {
  try {
    const urlObj = new URL(url, baseUrl);
    // Remove trailing slash except for root
    const pathname = urlObj.pathname === '/' ? '/' : urlObj.pathname.replace(/\/$/, '');
    return `${urlObj.protocol}//${urlObj.host}${pathname}`;
  } catch {
    return baseUrl;
  }
}

// Common SEO constants
export const SEO_CONSTANTS = {
  SITE_NAME: 'Litlynx',
  DEFAULT_TITLE_SUFFIX: 'Modern Frontend Web Development',
  DEFAULT_DESCRIPTION: 'Transform your business with cutting-edge frontend development. Litlynx delivers modern, fast, and scalable web applications using React, Vue, Astro, and the latest technologies.',
  DEFAULT_IMAGE: '/litlynx-og-image.jpg',
  DEFAULT_LOCALE: 'en_US',
  TWITTER_HANDLE: '@litlynx',
  MAX_TITLE_LENGTH: 60,
  MAX_DESCRIPTION_LENGTH: 160,
  THEME_COLOR: '#1e40af'
};
