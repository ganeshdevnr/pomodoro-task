export function AnalyticsPage() {
  return (
    <main className="grid min-h-[calc(100svh-73px)] place-items-center bg-slate-50 px-4 py-10 text-slate-700 sm:px-6 dark:bg-slate-950 dark:text-slate-300">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-50">
          Analytics
        </h1>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-400">
          Your session statistics will appear here.
        </p>
      </section>
    </main>
  )
}
