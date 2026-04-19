import Navbar from './Navbar';

/**
 * MainLayout — wraps all pages with the shared Navbar and <main> content area.
 * Responsible for the global mesh gradient background and consistent spacing.
 */
export default function MainLayout({ children, showNavbar, navProps }) {
    return (
        <div className="min-h-screen font-sans selection:bg-cyan-500/20 relative">
            {/* Global mesh gradient background */}
            <div className="fixed inset-0 mesh-gradient pointer-events-none z-0"></div>

            {showNavbar && <Navbar {...navProps} />}

            <main className="max-w-7xl mx-auto px-4 md:px-6 pb-24 pt-24 md:pt-28 relative z-10">
                {children}
            </main>
        </div>
    );
}
