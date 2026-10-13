import { channels } from "@/data/contact";
import { ChannelSelector } from "./ChannelSelector";
import { QRCode } from "./QRCode";

/** Server wrapper: renders the QR codes once on the server and hands them to the client selector. */
export function ContactChannels() {
  const qrCodes = Object.fromEntries(
    channels
      .filter((c) => c.qr)
      .map((c) => [c.id, <QRCode key={c.id} value={c.qr!} label={c.qrLabel ?? `${c.name} QR code`} className="h-[150px] w-[150px]" />]),
  );
  return <ChannelSelector channels={channels} qrCodes={qrCodes} />;
}
