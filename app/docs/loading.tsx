export default function Loading() {
  return (
    <div className="animate-pulse space-y-4" aria-label="Yükleniyor">
      <div className="h-8 w-2/3 rounded-md bg-secondary/50" />
      <div className="h-4 w-1/3 rounded-md bg-secondary/40" />
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full rounded-md bg-secondary/40" />
        <div className="h-4 w-11/12 rounded-md bg-secondary/40" />
        <div className="h-4 w-10/12 rounded-md bg-secondary/40" />
        <div className="h-4 w-9/12 rounded-md bg-secondary/40" />
      </div>
      <div className="mt-8 h-40 w-full rounded-lg bg-secondary/30" />
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full rounded-md bg-secondary/40" />
        <div className="h-4 w-11/12 rounded-md bg-secondary/40" />
      </div>
    </div>
  )
}
