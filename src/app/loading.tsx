export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="relative w-20 h-20">
        {/* Animated loading spinner */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-foreground/60 text-sm font-mono animate-pulse">
        Loading portfolio...
      </p>
    </div>
  );
}
