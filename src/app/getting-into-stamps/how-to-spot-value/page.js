export const metadata = {
  title: "How to Spot Value – Getting Into Stamps | Philatopia",
  description:
    "Learn how to identify valuable stamps with tips on rarity, condition, errors, and historical context.",
};

export default function HowToSpotValuePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Table of Contents */}
      <nav className="mb-8 bg-black/50 p-4 rounded-xl shadow-md backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-white mb-2">On this page</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-300">
          <li>
            <a href="#factors" className="hover:underline">
              Key Value Factors
            </a>
          </li>
          <li>
            <a href="#rarity" className="hover:underline">
              Understanding Rarity
            </a>
          </li>
          <li>
            <a href="#condition" className="hover:underline">
              Importance of Condition
            </a>
          </li>
          <li>
            <a href="#errors" className="hover:underline">
              Watch for Errors & Misprints
            </a>
          </li>
          <li>
            <a href="#authentication" className="hover:underline">
              Authentication & Expert Opinion
            </a>
          </li>
        </ul>
      </nav>

      {/* Main content block */}
      <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-white">
          How to Spot Value
        </h1>
        <p className="text-lg text-gray-200 leading-relaxed mb-6">
          Not all stamps are created equal. This guide will help you understand
          the key elements that make certain stamps more valuable than others.
        </p>

        <h2 id="factors" className="text-2xl font-semibold text-white mb-2">
          Key Value Factors
        </h2>
        <p className="text-lg text-gray-200 leading-relaxed mb-6">
          Stamp value is influenced by several factors working together. These
          include rarity, condition, demand, historical significance, and more.
        </p>

        <h2 id="rarity" className="text-2xl font-semibold text-white mb-2">
          Understanding Rarity
        </h2>
        <ul className="list-disc list-inside text-gray-200 mb-6 text-lg leading-relaxed">
          <li>Limited production runs increase rarity.</li>
          <li>Withdrawn or error stamps are often more scarce.</li>
          <li>Older stamps in good condition are harder to find.</li>
        </ul>

        <h2 id="condition" className="text-2xl font-semibold text-white mb-2">
          Importance of Condition
        </h2>
        <ol className="list-decimal list-inside text-gray-200 mb-6 text-lg leading-relaxed">
          <li>
            <strong>Centering:</strong> Well-centered stamps are more desirable.
          </li>
          <li>
            <strong>Gum condition:</strong> Mint stamps with original gum fetch
            higher prices.
          </li>
          <li>
            <strong>Perforations:</strong> Clean, undamaged edges are a must.
          </li>
          <li>
            <strong>Color:</strong> Bright, unfaded ink indicates good
            preservation.
          </li>
        </ol>

        <h2 id="errors" className="text-2xl font-semibold text-white mb-2">
          Watch for Errors & Misprints
        </h2>
        <p className="text-lg text-gray-200 leading-relaxed mb-6">
          Stamps with printing errors, inverted designs, or color misalignments
          can be extremely valuable to collectors due to their rarity and
          uniqueness.
        </p>

        <h2
          id="authentication"
          className="text-2xl font-semibold text-white mb-2"
        >
          Authentication & Expert Opinion
        </h2>
        <ul className="list-disc list-inside text-gray-200 text-lg leading-relaxed">
          <li>Seek certificates of authenticity for high-value stamps.</li>
          <li>Consult with philatelic societies or professional appraisers.</li>
          <li>
            Use catalogs like Scott, Stanley Gibbons, or Michel for reference.
          </li>
        </ul>
      </div>
    </div>
  );
}
