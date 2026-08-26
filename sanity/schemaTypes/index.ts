import { type SchemaTypeDefinition } from 'sanity'
import homepage from './homepage'
import navigation from './navigation'
import hero from './hero'
import textAndPicture from './textAndPicture'
import textAndPictureBullets from './textAndPictureBullets'
import textAndImageSlider from './textAndImageSlider'
import textAndImageSliderServices from './textAndImageSliderServices'
import threePillars from './threePillars'
import fourPillars from './fourPillars'
import processSection from './process'
import features from './features'
import tools from './tools'
import service from './service'
import servicesSection from './servicesSection'
import logoWall from './logoWall'
import videoSection from './videoSection'
import caseStudy from './caseStudy'
import featuredWork from './featuredWork'
import finalCta from './finalCta'
import footer from './footer'
import localeString from './localeString'
import localeText from './localeText'
import localeRichText from './localeRichText'
import seo from './seo'
import faq from './faq'
import contact from './contact'
import about from './about'
import howWeWork from './howWeWork'
import portfolio from './portfolio'
import legalNotice from './legalNotice'
import privacyPolicy from './privacyPolicy'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homepage,
    navigation,
    hero,
    textAndPicture,
    textAndPictureBullets,
    textAndImageSlider,
    textAndImageSliderServices,
    threePillars,
    fourPillars,
    processSection,
    features,
    tools,
    service,
    servicesSection,
    logoWall,
    videoSection,
    caseStudy,
    featuredWork,
    finalCta,
    footer,
    localeString,
    localeText,
    localeRichText,
    seo,
    faq,
    contact,
    about,
    howWeWork,
    portfolio,
    legalNotice,
    privacyPolicy,
  ],
}