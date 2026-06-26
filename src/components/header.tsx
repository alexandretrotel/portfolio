export const Header = () => (
  <div className="sticky top-0 z-50 h-16 w-full border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
    <div className="mx-auto flex h-14 max-w-152 items-center justify-between py-8">
      <div className="flex items-center gap-6">
        <a
          aria-label="Go to homepage"
          className="flex items-center gap-4 active:opacity-70"
          href="/"
        >
          <img
            alt="Logo"
            className="h-8 w-8 hover:opacity-80"
            height={128}
            src="/logo.png"
            width={128}
          />
        </a>
      </div>
      <span className="hidden text-sm text-muted-foreground sm:block">
        Alexandre Trotel
      </span>
    </div>
  </div>
);
