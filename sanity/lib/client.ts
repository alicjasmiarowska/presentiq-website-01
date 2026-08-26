import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // App renders dynamically per-request, so always fetch fresh data (CDN cache can lag ~30-60s behind Studio edits)
})
