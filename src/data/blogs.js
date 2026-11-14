export const HIGHLIGHTED_SLUGS = [
  'google-cloud-service-account-auth',
  'projectile-function-script',
  'ui-transition-state-machine-easing',
]

export const BLOG_POSTS = Object.entries(import.meta.glob('../blogs/*.js', { eager: true })).map(([path, mod]) => {
  const data = mod.default || mod, id = path.split('/').pop().replace(/\.[^/.]+$/, '')
  const slug = data.slug || id.replace(/_/g, '-')
  const highlight = Boolean(data.highlight || HIGHLIGHTED_SLUGS.includes(slug))
  const sections = (data.sections || []).map((s) => `${s.title} ${s.content || ''} ${s.code || ''}`).join(' ')
  const searchText = `${data.title} ${data.category} ${data.description} ${(data.tags || []).join(' ')} ${data.overview || ''} ${sections}`.toLowerCase()
  return { ...data, slug, highlight, searchText }
})

export const BLOG_CATEGORIES = ['All', ...new Set(BLOG_POSTS.map((b) => b.category))]
