export const BLOG_POSTS = Object.entries(import.meta.glob('../blogs/*.js', { eager: true })).map(([path, mod]) => {
  const data = mod.default || mod, id = path.split('/').pop().replace(/\.[^/.]+$/, '')
  const sections = (data.sections || []).map((s) => `${s.title} ${s.content || ''} ${s.code || ''}`).join(' ')
  const searchText = `${data.title} ${data.category} ${data.description} ${(data.tags || []).join(' ')} ${data.overview || ''} ${sections}`.toLowerCase()
  return { ...data, slug: data.slug || id.replace(/_/g, '-'), searchText }
})

export const BLOG_CATEGORIES = ['All', ...new Set(BLOG_POSTS.map((b) => b.category))]
