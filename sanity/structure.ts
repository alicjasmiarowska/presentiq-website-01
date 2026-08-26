import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['navigation', 'footer', 'contact', 'about', 'homepage', 'howWeWork', 'portfolio', 'legalNotice', 'privacyPolicy'])

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Navigation (globalna)')
        .id('navigation')
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('Footer (globalny)')
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
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() as string)
      ),
    ])
