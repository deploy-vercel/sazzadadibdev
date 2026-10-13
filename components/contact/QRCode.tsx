import QR from "qrcode";

/**
 * QR code rendered to an SVG path on the server — no client JavaScript, no image request.
 * A quiet zone is left in the middle when `logoGap` is set so a badge can sit on top.
 */
export function QRCode({
  value,
  label,
  className,
  logoGap = 0,
}: {
  value: string;
  label: string;
  className?: string;
  /** Modules to clear around the centre (for a logo badge). */
  logoGap?: number;
}) {
  const qr = QR.create(value, { errorCorrectionLevel: logoGap ? "H" : "M" });
  const size = qr.modules.size;
  const data = qr.modules.data;
  const mid = size / 2;
  let d = "";

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!data[y * size + x]) continue;
      if (logoGap && Math.abs(x + 0.5 - mid) < logoGap / 2 && Math.abs(y + 0.5 - mid) < logoGap / 2) continue;
      d += `M${x} ${y}h1v1h-1z`;
    }
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label} className={className} shapeRendering="crispEdges">
      <path d={d} fill="#000" />
    </svg>
  );
}
