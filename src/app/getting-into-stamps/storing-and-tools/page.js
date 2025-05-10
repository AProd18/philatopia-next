export const metadata = {
  title: "Storing and Tools – Getting Into Stamps | Philatopia",
  description:
    "Learn how to safely store your stamps and which tools can help you build a better collection.",
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
          Protecting your stamp collection and using the right tools are
          essential parts of the hobby. Here’s how to get started.
        </p>

        <h2
          id="why-store"
          className="text-2xl font-semibold text-[var(--text)] mb-2"
        >
          Why Proper Storage Matters
        </h2>
        <p className="text-lg text-[var(--text)] leading-relaxed mb-6">
          Stamps are delicate. Humidity, sunlight, and improper handling can
          cause damage. Proper storage ensures longevity and maintains value.
        </p>

        <h2
          id="basic-tools"
          className="text-2xl font-semibold text-[var(--text)] mb-2"
        >
          Basic Tools
        </h2>
        <ul className="list-disc list-inside text-[var(--text)] mb-6 text-lg leading-relaxed">
          <li>
            <strong>Tweezers:</strong> To handle stamps without touching them
            directly.
          </li>
          <li>
            <strong>Magnifying glass:</strong> For inspecting fine details.
          </li>
          <li>
            <strong>Perforation gauge:</strong> To measure perforations.
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
            <strong>Stock books:</strong> Easy to use and portable.
          </li>
          <li>
            <strong>Stamp albums:</strong> For more structured collections.
          </li>
          <li>
            <strong>Glassine envelopes:</strong> Temporary safe storage.
          </li>
        </ol>

        <h2
          id="maintenance"
          className="text-2xl font-semibold text-[var(--text)] mb-2"
        >
          Maintenance Tips
        </h2>
        <ul className="list-disc list-inside text-[var(--text)] text-lg leading-relaxed">
          <li>Keep stamps in a dry, cool place.</li>
          <li>Avoid direct sunlight.</li>
          <li>Handle with tools, not fingers.</li>
        </ul>
      </div>
    </div>
  );
}
