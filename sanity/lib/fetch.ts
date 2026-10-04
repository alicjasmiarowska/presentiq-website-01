import { client } from './client'
import { hyphenateLocalized } from '@/src/lib/hyphenate'

// Every query goes through here so all localized CMS text arrives with
// dictionary-correct soft hyphens (see src/lib/hyphenate.ts) — long German
// words then wrap on phones instead of pushing the page sideways.
async function fetchContent(query: string, params: Record<string, unknown> = {}) {
  return hyphenateLocalized(await client.fetch(query, params))
}

export async function getNavigation() {
  return fetchContent(`*[_type == "navigation"][0]{
    ...,
    navLinks[]{
      ...,
      "pageSlug": page->slug.current
    }
  }`)
}

export async function getHero(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "hero"][0]{
    ...,
    buttonPage1->{ "type": _type, "slug": slug.current },
    buttonPage2->{ "type": _type, "slug": slug.current }
  }`)
}

export async function getTextAndPicture(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "textAndPicture"][0]{
    ...,
    "videoUrl": video.asset->url,
    buttonPage->{ "type": _type, "slug": slug.current }
  }`)
}

export async function getTextAndPictureBullets(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "textAndPictureBullets"][0]{
    ...,
    "videoUrl": video.asset->url,
    buttonPage->{ "type": _type, "slug": slug.current }
  }`)
}

export async function getTextAndImageSlider(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "textAndImageSlider"][0]{
    ...,
    buttonPage->{ "type": _type, "slug": slug.current }
  }`)
}

export async function getThreePillars(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "pillars"][0]`)
}

export async function getFourPillars(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "fourPillars"][0]`)
}

export async function getFourColumns() {
  return fetchContent(`*[_type == "fourColumns"][0]{
    ...,
    columns[]{
      ...,
      buttonPage->{ "type": _type, "slug": slug.current }
    }
  }`)
}

export async function getProcess(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "process"][0]`)
}

export async function getFeatures(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "features"][0]`)
}

export async function getTools(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "tools"][0]`)
}

export async function getServicesSection(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "servicesSection"][0]{
    ...,
    services[]->
  }`)
}

export async function getServiceSlugs() {
  return fetchContent(`*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`)
}

export async function getCaseStudySlugs() {
  return fetchContent(`*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`)
}

export async function getServiceBySlug(slug: string) {
  return fetchContent(
    `*[_type == "service" && slug.current == $slug][0]{
      ...,
      hero->{
        ...,
        buttonPage1->{ "type": _type, "slug": slug.current },
        buttonPage2->{ "type": _type, "slug": slug.current }
      },
      textAndPicture->{
        ...,
        "videoUrl": video.asset->url,
        buttonPage->{ "type": _type, "slug": slug.current }
      },
      fourPillars->,
      features->,
      textAndImageSliderServices->{
        ...,
        services[]->{ _id, title, "slug": slug.current }
      },
      faq->
    }`,
    { slug }
  )
}

export async function getLogoWall(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "logoWall"][0]`)
}

export async function getVideoSection() {
  return fetchContent(`*[_type == "videoSection"][0]{
    ...,
    "videoUrl": video.asset->url
  }`)
}

export async function getFeaturedWork(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "featuredWork"][0]{
    ...,
    buttonPage->{ "type": _type, "slug": slug.current },
    projects[]->{
      _id,
      title,
      category,
      mainImage
    }
  }`)
}

export async function getFinalCta(locale: 'en' | 'de') {
  return fetchContent(`*[_type == "finalCta"][0]{
    ...,
    buttonPage->{ "type": _type, "slug": slug.current }
  }`)
}

export async function getFaq(page: 'home' | 'services' | 'howWeWork') {
  return fetchContent(`*[_type == "faq" && page == $page][0]`, { page })
}

export async function getFooter() {
  return fetchContent(`*[_type == "footer"][0]{
    ...,
    columns[]{
      ...,
      links[]{
        ...,
        "pageSlug": page->slug.current
      }
    }
  }`)
}

export async function getContact() {
  return fetchContent(`*[_type == "contact"][0]`)
}

// Shared query shape for every "same layout as Storytelling" page — see
// simpleServicePageSchema.ts for why these are separate singleton types
// that all happen to look identical.
function fetchSimpleServicePage(type: string) {
  return fetchContent(`*[_type == "${type}"][0]{
    ...,
    collaboration{
      ...,
      items[]{ _key, ...@->{ title, "slug": slug.current } }
    }
  }`)
}

export async function getStorytelling() {
  return fetchSimpleServicePage('storytelling')
}

export async function getTemplates() {
  return fetchSimpleServicePage('templates')
}

export async function getCompanyPresentations() {
  return fetchSimpleServicePage('companyPresentations')
}

export async function getPresentationDesign() {
  return fetchSimpleServicePage('presentationDesign')
}

export async function getWordAndAdobePdf() {
  return fetchSimpleServicePage('wordAndAdobePdf')
}

export async function getAiDesign() {
  return fetchContent(`*[_type == "aiDesign"][0]{
    ...,
    hero->{
      ...,
      buttonPage1->{ "type": _type, "slug": slug.current },
      buttonPage2->{ "type": _type, "slug": slug.current }
    },
    intro->{
      ...,
      buttonPage->{ "type": _type, "slug": slug.current }
    },
    videoSection->{
      ...,
      "videoUrl": video.asset->url,
      buttonPage->{ "type": _type, "slug": slug.current }
    },
    collaboration{
      ...,
      items[]{ _key, ...@->{ title, "slug": slug.current } }
    }
  }`)
}

export async function getAbout() {
  return fetchContent(`*[_type == "about"][0]{
    ...,
    intro->{
      ...,
      buttonPage->{ "type": _type, "slug": slug.current }
    },
    principles->,
    hero->{
      ...,
      buttonPage1->{ "type": _type, "slug": slug.current },
      buttonPage2->{ "type": _type, "slug": slug.current }
    }
  }`)
}

export async function getHowWeWork() {
  return fetchContent(`*[_type == "howWeWork"][0]{
    ...,
    hero->{
      ...,
      buttonPage1->{ "type": _type, "slug": slug.current },
      buttonPage2->{ "type": _type, "slug": slug.current }
    }
  }`)
}

export async function getPortfolio() {
  return fetchContent(`*[_type == "portfolio"][0]{
    ...,
    hero->{
      ...,
      buttonPage1->{ "type": _type, "slug": slug.current },
      buttonPage2->{ "type": _type, "slug": slug.current }
    }
  }`)
}

export async function getCaseStudies() {
  return fetchContent(`*[_type == "caseStudy"]{
    _id,
    title,
    category,
    mainImage,
    "slug": slug.current
  }`)
}

export async function getCaseStudyBySlug(slug: string) {
  return fetchContent(`*[_type == "caseStudy" && slug.current == $slug][0]`, { slug })
}

export async function getLegalNotice() {
  return fetchContent(`*[_type == "legalNotice"][0]`)
}

export async function getPrivacyPolicy() {
  return fetchContent(`*[_type == "privacyPolicy"][0]`)
}

export async function getHomepage() {
  return fetchContent(`*[_type == "homepage"][0]{
    ...,
    hero->{
      ...,
      buttonPage1->{ "type": _type, "slug": slug.current },
      buttonPage2->{ "type": _type, "slug": slug.current }
    },
    textAndPicture->{
      ...,
      "videoUrl": video.asset->url,
      buttonPage->{ "type": _type, "slug": slug.current }
    },
    twoColumnSection->{
      ...,
      buttonPage->{ "type": _type, "slug": slug.current }
    }
  }`)
}