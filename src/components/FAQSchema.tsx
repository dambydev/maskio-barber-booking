import { BUSINESS, formatBusinessHours } from '@/config/business';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  pageName?: string;
}

export default function FAQSchema({ faqs, pageName = 'FAQ' }: FAQSchemaProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: `${pageName} - ${BUSINESS.name}`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      data-page={pageName}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

// FAQ predefinite per i servizi
export const barberFAQs: FAQItem[] = [
  {
    question: "Quanto costa un taglio di capelli da Maskio Barber Concept?",
    answer: "I nostri tagli partono da €15 per un taglio base. Offriamo anche pacchetti combinati taglio + barba a prezzi vantaggiosi."
  },
  {
    question: "È necessario prenotare un appuntamento?",
    answer: "Consigliamo sempre di prenotare tramite il nostro sistema online per garantire la disponibilità. Accettiamo anche clienti senza appuntamento quando possibile."
  },
  {
    question: "Quali metodi di pagamento accettate?",
    answer: "Accettiamo contanti e carte di credito/debito. Non accettiamo assegni."
  },
  {
    question: "Fate anche trattamenti per la barba?",
    answer: "Sì, siamo specializzati in rasatura tradizionale, styling barba e trattamenti specifici per la cura della barba."
  },
  {
    question: "Quali sono gli orari di apertura?",
    answer: BUSINESS.hours
      .map(({ day, periods }) => `${day}: ${formatBusinessHours(periods)}`)
      .join('; '),
  },
  {
    question: "Dove si trova il negozio?",
    answer: `Ci troviamo in ${BUSINESS.address.formatted}.`
  }
];
