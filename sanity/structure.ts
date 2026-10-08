import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['navigation', 'footer', 'contact', 'about', 'howWeWork', 'portfolio', 'legalNotice', 'privacyPolicy'])
// Document types pinned explicitly below with their own (non-singleton) list
// item, so the generic auto-generated section at the bottom shouldn't
// duplicate them. Storytelling/AI Design are singletons too, but they're
// nested under the "Services" folder below rather than top-level, so they
// don't go in `singletonTypes` (that set only excludes items that still
// appear at the top level).
const customListTypes = new Set([
  'service', 'storytelling', 'aiDesign', 'templates', 'companyPresentations', 'presentationDesign', 'wordAndAdobePdf',
  'homepage', 'pillars', 'servicesSection', 'logoWall', 'fourColumns', 'featuredWork', 'videoSection',
])

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Navigation (global)')
        .id('navigation')
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('Footer (global)')
        .id('footer')
        .child(S.document().schemaType('footer').documentId('footer')),
      S.listItem()
        .title('Contact Page')
        .id('contact')
        .child(S.document().schemaType('contact').documentId('contact')),
      S.listItem()
        .title('About Us Page')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('How We Work Page')
        .id('howWeWork')
        .child(S.document().schemaType('howWeWork').documentId('howWeWork')),
      S.listItem()
        .title('Portfolio Page')
        .id('portfolio')
        .child(S.document().schemaType('portfolio').documentId('portfolio')),
      // The Homepage document itself only holds the Hero + intro references
      // and SEO — every other section you see on the live homepage (pillars,
      // services, logo wall, stats, four columns, FAQ) is its own separate
      // singleton document, fetched independently by the page. Grouped here
      // in one folder so editing "the homepage" means everything on it, not
      // just the one sparse document.
      S.listItem()
        .title('Homepage')
        .child(
          S.list()
            .title('Homepage')
            .items([
              S.listItem()
                .title('Homepage (Hero + Intro + SEO)')
                .id('homepage')
                .child(S.document().schemaType('homepage').documentId('homepage')),
              S.listItem()
                .title('Three Pillars')
                .id('pillars')
                .child(S.document().schemaType('pillars').documentId('8d900208-8874-46f0-ac46-ffc9bd2703de')),
              S.listItem()
                .title('Our Services')
                .id('servicesSection')
                .child(S.document().schemaType('servicesSection').documentId('bd0294f8-9f69-451e-afea-927cdda00c5c')),
              S.listItem()
                .title('Logo Wall & Stats')
                .id('logoWall')
                .child(S.document().schemaType('logoWall').documentId('6f83705c-3e4e-4ca7-bbe6-def53e3bcf79')),
              S.listItem()
                .title('Four Columns')
                .id('fourColumns')
                .child(S.document().schemaType('fourColumns').documentId('f76fb767-adb5-469e-a2bf-77833527a5b8')),
              S.listItem()
                .title('FAQ (Homepage)')
                .id('faqHome')
                .child(S.document().schemaType('faq').documentId('832d86e0-3358-497f-8b64-a512e1f587fb')),
              S.divider(),
              S.listItem()
                .title('Featured Work (currently hidden on the live site)')
                .id('featuredWork')
                .child(S.document().schemaType('featuredWork').documentId('8c068740-e953-477c-9b5d-83bf0d58a2d9')),
              S.listItem()
                .title('Video Section (currently hidden on the live site)')
                .id('videoSection')
                .child(S.document().schemaType('videoSection').documentId('98be61ca-e076-4d06-8ab1-7f24d98aa85f')),
            ])
        ),
      S.listItem()
        .title('Legal Notice Page')
        .id('legalNotice')
        .child(S.document().schemaType('legalNotice').documentId('legalNotice')),
      S.listItem()
        .title('Privacy Policy Page')
        .id('privacyPolicy')
        .child(S.document().schemaType('privacyPolicy').documentId('privacyPolicy')),
      S.divider(),
      // All service content in one folder: the generic Service list plus the
      // services with their own singleton documents. Storytelling, Templates
      // and AI Design (slugs "storytelling", "templates", "ai-support") are
      // edited in those documents, so their generic Service entries are
      // filtered out of the list below; the entries are kept, not deleted.
      S.listItem()
        .title('Services')
        .child(
          S.list()
            .title('Services')
            .items([
              S.listItem()
                .title('All Services (generic template)')
                .child(
                  S.documentTypeList('service')
                    .title('All Services')
                    .filter('_type == "service" && !(slug.current in ["storytelling", "templates", "ai-support", "company-presentations", "presentation-design", "word-and-adobe-pdf"])')
                ),
              S.divider(),
              S.listItem()
                .title('Storytelling Page')
                .id('storytelling')
                .child(S.document().schemaType('storytelling').documentId('storytelling')),
              S.listItem()
                .title('Templates Page')
                .id('templates')
                .child(S.document().schemaType('templates').documentId('templates')),
              S.listItem()
                .title('Company Presentations Page')
                .id('companyPresentations')
                .child(S.document().schemaType('companyPresentations').documentId('companyPresentations')),
              S.listItem()
                .title('Presentation Design Support Page')
                .id('presentationDesign')
                .child(S.document().schemaType('presentationDesign').documentId('presentationDesign')),
              S.listItem()
                .title('Word & Adobe PDF Page')
                .id('wordAndAdobePdf')
                .child(S.document().schemaType('wordAndAdobePdf').documentId('wordAndAdobePdf')),
              S.listItem()
                .title('AI Design Page')
                .id('aiDesign')
                .child(S.document().schemaType('aiDesign').documentId('aiDesign')),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() as string) && !customListTypes.has(item.getId() as string)
      ),
    ])
