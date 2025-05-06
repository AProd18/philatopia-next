export default function StartHerePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Table of Contents */}
      <nav className="mb-8 bg-black/50 p-4 rounded-xl shadow-md backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-white mb-2">On this page</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-300">
          <li>
            <a href="#what-is" className="hover:underline">
              What is Stamp Collecting?
            </a>
          </li>
          <li>
            <a href="#why-start" className="hover:underline">
              Why Start Collecting?
            </a>
          </li>
          <li>
            <a href="#how-to-begin" className="hover:underline">
              How to Begin
            </a>
          </li>
          <li>
            <a href="#where-to-find" className="hover:underline">
              Where to Find Stamps
            </a>
          </li>
          <li>
            <a href="#final-tips" className="hover:underline">
              Final Tips
            </a>
          </li>
        </ul>
      </nav>

      {/* Main content block */}
      <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-white">Start Here</h1>
        <p className="text-lg text-gray-200 leading-relaxed mb-6">
          Welcome! If you&apos;re new to stamp collecting, this guide will walk
          you through the basics and help you get started on your philatelic
          journey.
        </p>

        <h2 id="what-is" className="text-2xl font-semibold text-white mb-2">
          What is Stamp Collecting?
        </h2>
        <p className="text-lg text-gray-200 leading-relaxed mb-6">
          Stamp collecting, or philately, is the hobby of collecting and
          studying postage stamps and related materials...
        </p>

        <h2 id="why-start" className="text-2xl font-semibold text-white mb-2">
          Why Start Collecting Stamps?
        </h2>
        <ul className="list-disc list-inside text-gray-200 mb-6 text-lg leading-relaxed">
          <li>It&apos;s a relaxing and rewarding hobby.</li>
          <li>You learn about countries, events, and famous people.</li>
          <li>Stamps are miniature works of art.</li>
          <li>
            You can build a personal collection that reflects your interests.
          </li>
        </ul>

        <h2
          id="how-to-begin"
          className="text-2xl font-semibold text-white mb-2"
        >
          How to Begin
        </h2>
        <ol className="list-decimal list-inside text-gray-200 mb-6 text-lg leading-relaxed">
          <li>
            <strong>Start simple:</strong> Collect stamps from your own mail...
          </li>
          <li>
            <strong>Choose a theme:</strong> Animals, space, history...
          </li>
          <li>
            <strong>Get basic tools:</strong> Album, tweezers, magnifier...
          </li>
          <li>
            <strong>Join a community:</strong> Local clubs or online forums.
          </li>
        </ol>

        <h2
          id="where-to-find"
          className="text-2xl font-semibold text-white mb-2"
        >
          Where to Find Stamps
        </h2>
        <p className="text-lg text-gray-200 leading-relaxed mb-6">
          You can find stamps in your mailbox, flea markets, online
          marketplaces...
        </p>

        <h2 id="final-tips" className="text-2xl font-semibold text-white mb-2">
          Final Tips
        </h2>
        <ul className="list-disc list-inside text-gray-200 text-lg leading-relaxed">
          <li>Handle stamps with care.</li>
          <li>Stay curious – research the stories.</li>
          <li>Make the hobby your own!</li>
        </ul>
      </div>
    </div>
  );
}
