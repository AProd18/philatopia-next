export const metadata = {
  title: "How to Spot Value – Getting Into Stamps | Philatopia",
  description:
    "Learn how to identify valuable stamps in your collection with this practical guide for beginners.",
};

export default function HowToSpotValuePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Table of Contents */}
      <nav className="mb-8 p-4 rounded-xl shadow-md bg-[--card] text-[--card-foreground] backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-2">On this page</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
          <li>
            <a href="#look-for" className="hover:underline">
              Key Features to Look For
            </a>
          </li>
          <li>
            <a href="#rarity" className="hover:underline">
              Rarity and Demand
            </a>
          </li>
          <li>
            <a href="#condition" className="hover:underline">
              Condition Matters
            </a>
          </li>
          <li>
            <a href="#tools" className="hover:underline">
              Tools for Evaluating
            </a>
          </li>
          <li>
            <a href="#final-notes" className="hover:underline">
              Final Notes
            </a>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="rounded-2xl p-6 shadow-lg bg-[--card] text-[--text] backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-4">How to Spot Value</h1>
        <p className="text-lg leading-relaxed mb-6">
          Discovering which stamps hold value is part art and part science.
          Here’s how to sharpen your eye and spot valuable finds.
        </p>

        <h2 id="look-for" className="text-2xl font-semibold mb-2">
          Key Features to Look For
        </h2>
        <ul className="list-disc list-inside text-lg leading-relaxed mb-6">
          <li>Unusual or limited-edition designs</li>
          <li>Errors or misprints</li>
          <li>Historical or political significance</li>
          <li>Classic or old issues no longer in circulation</li>
        </ul>

        <h2 id="rarity" className="text-2xl font-semibold mb-2">
          Rarity and Demand
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          A rare stamp doesn’t always equal value—demand plays a huge role.
          Research how many copies exist and if collectors are actively seeking
          it.
        </p>

        <h2 id="condition" className="text-2xl font-semibold mb-2">
          Condition Matters
        </h2>
        <ol className="list-decimal list-inside text-lg leading-relaxed mb-6">
          <li>Mint condition stamps are the most prized.</li>
          <li>Look for clean edges, centered design, and no creases.</li>
          <li>Used stamps can be valuable if well preserved.</li>
        </ol>

        <h2 id="tools" className="text-2xl font-semibold mb-2">
          Tools for Evaluating
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          A magnifying glass, watermark detector, and catalogues (like Scott or
          Stanley Gibbons) are your best friends when evaluating stamps.
        </p>

        <h2 id="final-notes" className="text-2xl font-semibold mb-2">
          Final Notes
        </h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Always verify with a reputable catalog or expert.</li>
          <li>Join forums to share and get feedback on potential finds.</li>
          <li>Keep exploring — the next gem might be in your collection!</li>
        </ul>
      </div>
    </div>
  );
}
