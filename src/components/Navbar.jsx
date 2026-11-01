export default function Navbar({ onHomeClick }) {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <button
          type="button"
          onClick={onHomeClick}
          className="text-base font-bold text-white hover:text-slate-300"
        >
          GMS2Lab
        </button>

        <nav>
          <a
            href="#directory"
            className="text-sm text-slate-300 hover:text-white"
          >
            Directory
          </a>
        </nav>
      </div>
    </header>
  )
}