interface EditorialHeaderProps {
  onNavigate: (sectionId: string) => void;
}

export function EditorialHeader({ onNavigate }: EditorialHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-rosegold/15 bg-obsidian/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-5 sm:px-8">
        <a
          href="#opening"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("opening");
          }}
          className="font-serif text-lg font-medium tracking-wide text-champagne whitespace-nowrap shrink-0 transition-colors hover:text-rosegold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
        >
          Somewhere Between Us
        </a>

        <nav
          aria-label="Primary sections"
          className="hidden items-center gap-7 text-xs font-medium tracking-wider text-parchment/80 md:flex"
        >
          <button
            type="button"
            onClick={() => onNavigate("confession")}
            className="cursor-pointer whitespace-nowrap shrink-0 py-1 transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
          >
            Confession
          </button>
          <button
            type="button"
            onClick={() => onNavigate("after-dark")}
            className="cursor-pointer whitespace-nowrap shrink-0 py-1 transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
          >
            After Dark
          </button>
          <button
            type="button"
            onClick={() => onNavigate("soundtrack")}
            className="cursor-pointer whitespace-nowrap shrink-0 py-1 transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
          >
            Soundtrack
          </button>
          <button
            type="button"
            onClick={() => onNavigate("quiz")}
            className="cursor-pointer whitespace-nowrap shrink-0 py-1 transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
          >
            The Quiz
          </button>
          <button
            type="button"
            onClick={() => onNavigate("unsaid")}
            className="cursor-pointer whitespace-nowrap shrink-0 py-1 transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
          >
            Unsaid
          </button>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigate("invitation")}
            className="cursor-pointer whitespace-nowrap shrink-0 border border-rosegold/40 bg-burgundy/70 px-4 py-1.5 text-xs font-medium tracking-wider text-champagne transition-all duration-200 hover:border-rosegold/70 hover:bg-blood focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rosegold"
          >
            The Invitation
          </button>
        </div>
      </div>
    </header>
  );
}
