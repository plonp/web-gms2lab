import { VERIFIED_GUIDES } from '../data/guidesData'
import GuideCard from '../components/GuideCard'

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="border-b border-gm-border pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-white">Verified Guides</h1>
          <span className="inline-flex items-center rounded bg-gm-green/10 px-2.5 py-0.5 text-xs font-semibold text-gm-green border border-gm-green/30">Working Solutions</span>
        </div>
        <p className="mt-2 text-sm text-gm-muted">Strictly tested, production-ready resources and solutions &mdash; unlike Blogs, where articles are experimental and require manual testing before use.</p>
      </div>

      <div className="space-y-8">
        {VERIFIED_GUIDES.map((guide) => <GuideCard key={guide.title} guide={guide} />)}
      </div>
    </div>
  )
}
