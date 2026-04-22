const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://divelovers.com.br'

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Curso Open Water Diver',
  description:
    'Certificação SSI de mergulho em 3 dias. Teoria em e-learning, piscina exclusiva de 3m e 4 mergulhos no mar com instrutor. Válida mundialmente.',
  url: BASE_URL,
  provider: {
    '@type': 'Organization',
    name: 'DiveLovers',
    url: BASE_URL,
    sameAs: [
      'https://www.instagram.com/dive.lovers/',
      'https://www.instagram.com/casa_divelovers/',
    ],
  },
  offers: {
    '@type': 'Offer',
    price: '2600',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '2800',
      priceCurrency: 'BRL',
      billingDuration: 3,
      billingIncrement: 1,
    },
    priceCurrency: 'BRL',
    priceValidUntil: '2025-12-31',
    availability: 'https://schema.org/InStock',
    url: BASE_URL,
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'onsite',
    duration: 'P3D',
    courseWorkload: 'PT24H',
    location: {
      '@type': 'Place',
      name: 'DiveLovers — São Sebastião',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Alameda Santana, 135',
        addressLocality: 'São Sebastião',
        addressRegion: 'SP',
        addressCountry: 'BR',
      },
    },
  },
  coursePrerequisites: 'Nenhum. Aberto a iniciantes a partir de 10 anos.',
  educationalCredentialAwarded: 'Certificação SSI Open Water Diver (validade internacional)',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: 'DiveLovers',
  description:
    'Centro de mergulho e resort em São Sebastião/SP. Escola de mergulho SSI, piscina exclusiva de 3m, hospedagem própria e mergulhos em Ilhabela.',
  url: BASE_URL,
  telephone: '+5511982023600',
  priceRange: '$$',
  image: `${BASE_URL}/opengraph-image`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Alameda Santana, 135',
    addressLocality: 'São Sebastião',
    addressRegion: 'SP',
    // TODO: confirmar CEP real com o cliente
    postalCode: '11625-000',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -23.804,
    longitude: -45.413,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      // TODO: confirmar horários reais com o cliente
      opens: '08:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/dive.lovers/',
    'https://www.instagram.com/casa_divelovers/',
  ],
  hasMap: 'https://maps.google.com/?q=Alameda+Santana+135+Pontal+da+Cruz+São+Sebastião+SP',
}

export default function SchemaOrg() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}
