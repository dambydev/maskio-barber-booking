import { BUSINESS, canonicalUrl } from '@/config/business';
import { serializeJsonLd } from '@/lib/json-ld';

const businessId = `${BUSINESS.canonicalOrigin}/#localbusiness`;
const websiteId = `${BUSINESS.canonicalOrigin}/#website`;

const openingHoursSpecification = BUSINESS.hours.flatMap(({ schemaDay, periods }) =>
  periods.map(({ opens, closes }) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${schemaDay}`,
    opens,
    closes,
  })),
);

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['HairSalon', 'LocalBusiness'],
      '@id': businessId,
      name: BUSINESS.name,
      url: canonicalUrl('/'),
      description: 'Barbiere a San Giovanni Rotondo dedicato al taglio uomo e alla cura della barba.',
      foundingDate: String(BUSINESS.foundingYear),
      vatID: BUSINESS.vatNumber,
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      image: BUSINESS.images,
      logo: BUSINESS.images[0],
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address.street,
        postalCode: BUSINESS.address.postalCode,
        addressLocality: BUSINESS.address.locality,
        addressRegion: BUSINESS.address.region,
        addressCountry: BUSINESS.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.coordinates.latitude,
        longitude: BUSINESS.coordinates.longitude,
      },
      hasMap: BUSINESS.mapsUrl,
      sameAs: BUSINESS.socialProfiles,
      openingHoursSpecification,
      priceRange: '€€',
      areaServed: {
        '@type': 'City',
        name: BUSINESS.address.locality,
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: BUSINESS.name,
      url: canonicalUrl('/'),
      inLanguage: 'it-IT',
      publisher: { '@id': businessId },
    },
  ],
};

export default function JsonLdScript() {
  return (
    <>
      {/* nosemgrep: semgrep.nextjs-dangerous-html -- JSON-LD payload is escaped by serializeJsonLd. */}
      <script
        id="maskio-business-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
    </>
  );
}
