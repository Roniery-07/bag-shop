import {BRL} from "@/lib/utils/BRL"

export function MobileStickyBar({ total, onCheckout }: { total: number; onCheckout?: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">Total</span>
          <div className="text-base font-semibold">{BRL(total)}</div>
        </div>
        <button
          onClick={onCheckout}
          className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}