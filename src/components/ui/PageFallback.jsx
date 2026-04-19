/**
 * Shared loading fallback for lazy-loaded pages.
 */
export default function PageFallback() {
    return (
        <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
    );
}
