import { Link } from 'react-router-dom'

export default function BlogCard({ post, starred, onToggle }) {
  return (
    <article className={`rounded-lg border bg-gm-card p-6 flex flex-col justify-between transition-colors ${starred ? 'border-yellow-400/40 hover:border-yellow-400/70' : 'border-gm-border hover:border-gm-border-light'}`}>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2.5">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${post.categoryColor || 'text-gm-orange'}`}>{post.category}</span>
            {starred && <span className="inline-flex items-center gap-1 rounded bg-yellow-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-400 border border-yellow-400/30">★ Starred</span>}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 text-gm-muted font-mono"><span>{post.readTime}</span><span>&bull;</span><span>{post.date}</span></div>
            <button type="button" onClick={onToggle} title={starred ? 'Remove from favorites' : 'Add to favorites'} className={`rounded p-1 text-base leading-none transition-colors ${starred ? 'text-yellow-400 hover:text-yellow-300' : 'text-neutral-500 hover:text-neutral-300'}`}>{starred ? '★' : '☆'}</button>
          </div>
        </div>
        <Link to={`/blogs/${post.slug}`} className="group block"><h2 className="text-xl font-bold text-white group-hover:text-gm-green transition-colors">{post.title}</h2></Link>
        <p className="mt-2.5 text-xs sm:text-sm text-gm-text leading-relaxed">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{post.tags.map((tag) => <span key={tag} className="rounded bg-gm-code px-2 py-0.5 text-[11px] text-gm-muted border border-gm-border">#{tag}</span>)}</div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-gm-border pt-4 text-xs">
        <span className="text-gm-muted">By {post.author}</span>
        <Link to={`/blogs/${post.slug}`} className="inline-flex items-center gap-1 font-semibold text-gm-green hover:underline">Read Tutorial &rarr;</Link>
      </div>
    </article>
  )
}
