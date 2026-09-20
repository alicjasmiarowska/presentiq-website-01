import { client } from './client'

export async function getNavigation() {
  return client.fetch(`*[_type == "navigation"][0]{
    ...,
    navLinks[]{
      ...,
      "pageSlug": page->slug.current
    }
  }`)
}

export async function getHero(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "hero"][0]{
    ...,
    buttonPage1->{ "type": _type, "slug": slug.current },
    buttonPage2->{ "type": _type, "slug": slug.current }
  }`)
}

export async function getTextAndPicture(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "textAndPicture"][0]{
    ...,
    "videoUrl": video.asset->url,
    buttonPage->{ "type": _type, "slug": slug.current }
  }`)
}

export async function getTextAndPictureBullets(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "textAndPictureBullets"][0]{
    ...,
    "videoUrl": video.asset->url,
    buttonPage->{ "type": _type, "slug": slug.current }
  }`)
}

export async function getTextAndImageSlider(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "textAndImageSlider"][0]{
    ...,
    buttonPage->{ "type": _type, "slug": slug.current }
  }`)
}

export async function getThreePillars(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "pillars"][0]`)
}

export async function getFourPillars(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "fourPillars"][0]`)
}

export async function getProcess(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "process"][0]`)
}

export async function getFeatures(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "features"][0]`)
}

export async function getTools(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "tools"][0]`)
}

export async function getServicesSection(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "servicesSection"][0]{
    ...,
    services[]->
  }`)
}

export async function getServiceSlugs() {
  return client.fetch(`*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`)
}

export async function getServiceBySlug(slug: string) {
  return client.fetch(
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
  return client.fetch(`*[_type == "logoWall"][0]`)
}

export async function getVideoSection() {
  return client.fetch(`*[_type == "videoSection"][0]{
    ...,
    "videoUrl": video.asset->url
  }`)
}

export async function getFeaturedWork(locale: 'en' | 'de') {
  return client.fetch(`*[_type == "featuredWork"][0]{
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
  return client.fetch(`*[_type == "finalCta"][0]{
    ...,
    buttonPage->{ "type": _type, "slug": slug.current }
  }`)
}

export async function getFaq(page: 'home' | 'services' | 'howWeWork') {
  return client.fetch(`*[_type == "faq" && page == $page][0]`, { page })
}

export async function getFooter() {
  return client.fetch(`*[_type == "footer"][0]{
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
  return client.fetch(`*[_type == "contact"][0]`)
}

export async function getAbout() {
  return client.fetch(`*[_type == "about"][0]{
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
    }
  }`)
}

export async function getHowWeWork() {
  return client.fetch(`*[_type == "howWeWork"][0]{
    ...,
    hero->{
      ...,
      buttonPage1->{ "type": _type, "slug": slug.current },
      buttonPage2->{ "type": _type, "slug": slug.current }
    },
    textAndPictureBullets->{
      ...,
      "videoUrl": video.asset->url,
      buttonPage->{ "type": _type, "slug": slug.current }
    }
  }`)
}

export async function getPortfolio() {
  return client.fetch(`*[_type == "portfolio"][0]{
    ...,
    hero->{
      ...,
      buttonPage1->{ "type": _type, "slug": slug.current },
      buttonPage2->{ "type": _type, "slug": slug.current }
    }
  }`)
}

export async function getCaseStudies() {
  return client.fetch(`*[_type == "caseStudy"]{
    _id,
    title,
    category,
    mainImage
  }`)
}

export async function getLegalNotice() {
  return client.fetch(`*[_type == "legalNotice"][0]`)
}

export async function getPrivacyPolicy() {
  return client.fetch(`*[_type == "privacyPolicy"][0]`)
}

export async function getHomepage() {
  return client.fetch(`*[_type == "homepage"][0]{
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