import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['navigation', 'footer', 'contact', 'about', 'homepage', 'howWeWork', 'portfolio', 'legalNotice', 'privacyPolicy'])
// Document types pinned explicitly below with their own (non-singleton) list
// item, so the generic auto-generated section at the bottom shouldn't
// duplicate them. Storytelling/AI Design are singletons too, but they're
// nested under the "Services" folder below rather than top-level, so they
// don't go in `singletonTypes` (that set only excludes items that still
// appear at the top level).
const customListTypes = new Set(['service', 'storytelling', 'aiDesign', 'templates', 'companyPresentations', 'presentationDesign', 'wordAndAdobePdf'])

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
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(S.document().schemaType('homepage').documentId('homepage')),
      S.listItem()
        .title('Legal Notice Page')
        .id('legalNotice')
        .child(S.document().schemaType('legalNotice').documentId('legalNotice')),
      S.listItem()
        .title('Privacy Policy Page')
        .id('privacyPolicy')
        .child(S.document().schemaType('privacyPolicy').documentId('privacyPolicy')),
      S.divider(),
      // Everything service-related lives in one folder: the generic Service
      // list plus each service's bespoke redesign (own singleton document).
      // "Storytelling", "Templates" and "AI Design" (slugs "storytelling" /
      // "templates" / "ai-support") got bespoke redesigns, so their old
      // service-template documents are filtered out of the generic list
      // below — not deleted, just hidden, since the real editable content
      // for those now lives in their own pinned documents in this folder.
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
