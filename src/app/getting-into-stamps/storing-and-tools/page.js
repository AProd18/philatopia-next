export const metadata = {
  title: "Storing and Tools – Getting Into Stamps | Philatopia",
  description:
    "Learn how to properly store your stamps and what essential tools every collector needs.",
};

export default function StoringAndToolsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Table of Contents */}
      <nav className="mb-8 bg-black/50 p-4 rounded-xl shadow-md backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-white mb-2">On this page</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-300">
          <li>
            <a href="#why-store" className="hover:underline">
              Why Proper Storage Matters
            </a>
          </li>
          <li>
            <a href="#storage-options" className="hover:underline">
              Storage Options
            </a>
          </li>
          <li>
            <a href="#essential-tools" className="hover:underline">
              Essential Tools for Collectors
            </a>
          </li>
          <li>
            <a href="#caring-for-stamps" className="hover:underline">
              Caring for Your Stamps
            </a>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Storing and Tools
        </h1>
        <p className="text-lg text-gray-200 leading-relaxed mb-6">
          Proper storage and the right tools are key to preserving the quality
          and value of your stamps. In this guide, we’ll go over what you need
          to know.
        </p>

        <h2 id="why-store" className="text-2xl font-semibold text-white mb-2">
          Why Proper Storage Matters
        </h2>
        <p className="text-lg text-gray-200 leading-relaxed mb-6">
          Stamps are delicate and can be easily damaged by moisture, sunlight,
          and improper handling. Good storage protects their condition and value
          over time.
        </p>

        <h2
          id="storage-options"
          className="text-2xl font-semibold text-white mb-2"
        >
          Storage Options
        </h2>
        <ul className="list-disc list-inside text-gray-200 mb-6 text-lg leading-relaxed">
          <li>
            <strong>Stock books:</strong> Great for flexible and safe storage.
          </li>
          <li>
            <strong>Stamp albums:</strong> Organized pages, good for displaying
            your collection.
          </li>
          <li>
            <strong>Glassine envelopes:</strong> Protects single stamps or small
            groups.
          </li>
          <li>
            <strong>Plastic sleeves:</strong> For added protection and archival
            safety.
          </li>
        </ul>

        <h2
          id="essential-tools"
          className="text-2xl font-semibold text-white mb-2"
        >
          Essential Tools for Collectors
        </h2>
        <ol className="list-decimal list-inside text-gray-200 mb-6 text-lg leading-relaxed">
          <li>
            <strong>Stamp tongs:</strong> Special tweezers that prevent damage
            from handling.
          </li>
          <li>
            <strong>Magnifying glass:</strong> For inspecting fine details and
            quality.
          </li>
          <li>
            <strong>Perforation gauge:</strong> Helps identify different
            printings.
          </li>
          <li>
            <strong>Watermark detector:</strong> Useful for spotting hidden
            stamp features.
          </li>
        </ol>

        <h2
          id="caring-for-stamps"
          className="text-2xl font-semibold text-white mb-2"
        >
          Caring for Your Stamps
        </h2>
        <p className="text-lg text-gray-200 leading-relaxed">
          Keep your stamps in a dry, cool place away from direct sunlight.
          Always use tools when handling, and avoid adhesives or writing near
          them. Regularly check your collection for any signs of damage or
          pests.
        </p>
      </div>
    </div>
  );
}
