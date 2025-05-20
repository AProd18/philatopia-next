export const metadata = {
  title: "Storing and Tools – Getting Into Stamps | Philatopia",
  description:
    "Learn how to safely store your stamps and which tools can help you build a better collection.",
  keywords: [
    "stamp collecting",
    "stamp storage",
    "philately tools",
    "stamp preservation",
    "stamp albums",
    "stamp maintenance",
    "collecting stamps",
    "stamp tweezers",
    "stamp storage methods",
    "stamp care",
  ],
};

export default function StoringAndToolsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Table of Contents */}
      <nav className="mb-8 bg-[var(--card)] p-4 rounded-xl shadow-md backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-[var(--card-foreground)] mb-2">
          On this page
        </h2>
        <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-300">
          <li>
            <a href="#why-store" className="hover:underline">
              Why Proper Storage Matters
            </a>
          </li>
          <li>
            <a href="#basic-tools" className="hover:underline">
              Basic Tools
            </a>
          </li>
          <li>
            <a href="#storage-methods" className="hover:underline">
              Storage Methods
            </a>
          </li>
          <li>
            <a href="#maintenance" className="hover:underline">
              Maintenance Tips
            </a>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="bg-[var(--card)] backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-[var(--text)]">
          Storing and Tools
        </h1>
        <p className="text-lg text-[var(--text)] leading-relaxed mb-6">
          Building a stamp collection is just the beginning. To preserve the
          beauty and value of your stamps, proper storage and the right tools
          are essential. Whether you&apos;re a beginner or an experienced
          collector, following best practices ensures your collection lasts for
          decades.
        </p>

        <h2
          id="why-store"
          className="text-2xl font-semibold text-[var(--text)] mb-2"
        >
          Why Proper Storage Matters
        </h2>
        <p className="text-lg text-[var(--text)] leading-relaxed mb-6">
          Stamps are made of paper, which makes them vulnerable to environmental
          factors such as humidity, sunlight, dust, and air pollutants. Even
          minor damage — like curling edges or faded ink — can significantly
          reduce a stamp&apos;s value. By storing your stamps correctly, you not
          only preserve their physical condition but also safeguard their
          historical and personal significance.
        </p>

        <h2
          id="basic-tools"
          className="text-2xl font-semibold text-[var(--text)] mb-2"
        >
          Basic Tools
        </h2>
        <ul className="list-disc list-inside text-[var(--text)] mb-6 text-lg leading-relaxed">
          <li>
            <strong>Tweezers (stamp tongs):</strong> These prevent the oils and
            dirt from your fingers from damaging stamps. Always choose tweezers
            with rounded tips to avoid tearing.
          </li>
          <li>
            <strong>Magnifying glass:</strong> Essential for examining fine
            details, hidden watermarks, and minor print variations that can
            increase a stamp&apos;s value.
          </li>
          <li>
            <strong>Perforation gauge:</strong> A tool to measure the number of
            perforations (holes) around a stamp. This is often key to
            identifying similar-looking stamps with different values.
          </li>
          <li>
            <strong>UV lamp:</strong> Useful for detecting paper fluorescence
            and invisible markings, particularly for modern stamps and
            authentication.
          </li>
        </ul>

        <h2
          id="storage-methods"
          className="text-2xl font-semibold text-[var(--text)] mb-2"
        >
          Storage Methods
        </h2>
        <ol className="list-decimal list-inside text-[var(--text)] mb-6 text-lg leading-relaxed">
          <li>
            <strong>Stock books:</strong> These have rows of horizontal pockets
            and are perfect for organizing stamps without adhesives.
            They&apos;re ideal for temporary storage and viewing.
          </li>
          <li>
            <strong>Stamp albums:</strong> Provide a structured and thematic way
            of presenting your collection. You can use printed album pages or
            customize your own layouts.
          </li>
          <li>
            <strong>Glassine envelopes:</strong> Thin, semi-transparent
            envelopes for temporary storage or transport. They&apos;re acid-free
            and help prevent sticking or curling.
          </li>
          <li>
            <strong>Hinges and mounts:</strong> Hinges are small pieces of
            gummed paper used to attach stamps to album pages. For mint
            condition stamps, mounts are a better choice, as they do not damage
            the stamp&apos;s gum.
          </li>
          <li>
            <strong>Archival boxes:</strong> For large-scale or long-term
            storage, acid-free archival boxes and folders offer protection
            against light, dust, and pests.
          </li>
        </ol>

        <h2
          id="maintenance"
          className="text-2xl font-semibold text-[var(--text)] mb-2"
        >
          Maintenance Tips
        </h2>
        <ul className="list-disc list-inside text-[var(--text)] text-lg leading-relaxed">
          <li>
            <strong>Control temperature and humidity:</strong> Store your
            collection in a dry room with stable temperatures. Use silica gel
            packets in boxes to reduce moisture.
          </li>
          <li>
            <strong>Avoid direct sunlight:</strong> UV rays can fade inks and
            damage paper over time. Keep albums and storage boxes away from
            windows.
          </li>
          <li>
            <strong>Use tools consistently:</strong> Avoid handling stamps with
            bare hands. Tweezers and magnifiers help maintain condition and aid
            in inspection.
          </li>
          <li>
            <strong>Check regularly:</strong> Inspect your stamps every few
            months to catch mold, insects, or any deterioration early.
          </li>
          <li>
            <strong>Label and organize:</strong> Keep a record of your
            collection. Digital cataloging tools can help track values, origins,
            and condition.
          </li>
        </ul>
      </div>
    </div>
  );
}
