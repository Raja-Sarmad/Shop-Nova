import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="font-display text-5xl">Privacy</h1>
      <div className="mt-8 space-y-5 text-sm leading-8 text-ink-soft">
        <p>
          This frontend stores cart, wishlist, mock account, and orders in your browser
          only. No personal data is sent to a server until the backend exists.
        </p>
        <p>
          When the API is connected, we will collect only what fulfilment needs: name,
          email, address, and order history. We will not sell lists.
        </p>
      </div>
    </div>
  );
}
