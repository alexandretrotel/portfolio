export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        {children}
      </div>
    </article>
  );
}
