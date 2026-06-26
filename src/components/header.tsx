export const Header = () => (
  <div className="h-16 w-full">
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
      <nav className="flex items-center text-sm text-foreground">
        <a className="hover:underline" href="/essays">
          Essays
        </a>
      </nav>
    </div>
  </div>
);
