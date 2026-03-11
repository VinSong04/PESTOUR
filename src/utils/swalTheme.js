/**
 * Shared SweetAlert2 dark theme config.
 * Extracted from RegisterView where it was defined inline 6 times.
 */
export const swalDarkTheme = {
    background: '#131A2B',
    color: '#fff',
    backdrop: 'rgba(10, 13, 20, 0.85)',
    timer: 3500,
    timerProgressBar: true,
    showConfirmButton: true,
    customClass: {
        popup: 'border border-white/10 rounded-[32px] shadow-2xl',
        confirmButton: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-outfit font-black uppercase tracking-widest rounded-2xl px-10 py-4 transition-all outline-none focus:ring-4 focus:ring-blue-500/50',
        title: 'font-outfit font-black text-3xl tracking-wide',
        htmlContainer: 'font-medium text-slate-300 text-lg'
    },
    buttonsStyling: false
};
