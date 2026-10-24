import { MONOGRAM } from "./paths";

export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox={MONOGRAM.viewBox} className={className} aria-hidden="true" focusable="false">
      <path fill="currentColor" fillRule="evenodd" d={MONOGRAM.d} />
    </svg>
  );
}
