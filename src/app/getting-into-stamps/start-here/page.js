import StampFunFact from "@/components/StampFunFact";

export const metadata = {
  title: "Start Here – Getting Into Stamps | Philatopia",
  description:
    "Begin your stamp collecting journey with this simple guide covering the basics of philately.",
};

export default function StartHerePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-[color:var(--text)]">
      {/* Table of Contents */}
      <nav className="mb-8 bg-[color:var(--card)] p-4 rounded-xl shadow-md backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-2">On this page</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-300">
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
      <div className="bg-[color:var(--card)] backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Start Here</h1>
        <p className="text-lg leading-relaxed mb-2">
          Welcome! If you&apos;re new to stamp collecting, this guide will walk
          you through the basics and help you get started on your philatelic
          journey.
        </p>

        {/* Stamp Fun Fact Section */}
        <div className="mb-4">
          <StampFunFact />
        </div>

        <h2 id="what-is" className="text-2xl font-semibold mb-2">
          What is Stamp Collecting?
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Stamp collecting, or <strong>philately</strong>, is the hobby of
          collecting and studying postage stamps and related postal history
          materials. It&apos;s more than just saving old stamps — it&apos;s
          about appreciating their stories, designs, and cultural significance.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Philatelists often collect stamps based on specific <em>themes</em>{" "}
          (like birds, space, or sports), <em>countries</em>,{" "}
          <em>historical periods</em>, or even <em>printing errors</em> and rare
          editions. Some collectors focus on <strong>postmarks</strong>,{" "}
          <strong>envelopes (known as covers)</strong>, or full sets issued
          during specific events.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          The hobby began shortly after the release of the world&apos;s first
          postage stamp — the <strong>Penny Black</strong> — issued in{" "}
          <strong>1840</strong> in Great Britain. It featured Queen Victoria and
          revolutionized communication. The first known stamp collector was{" "}
          <strong>John Edward Gray</strong>, a British zoologist who began
          saving stamps in <strong>1841</strong>.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Since then, stamp collecting has evolved into a global hobby with
          millions of enthusiasts. It combines history, geography, design, and
          storytelling — all through tiny, fascinating windows into the past and
          present.
        </p>

        <h2 id="why-start" className="text-2xl font-semibold mb-2">
          Why Start Collecting Stamps?
        </h2>
        <ul className="list-disc list-inside mb-6 text-lg leading-relaxed">
          <li>
            It&apos;s a relaxing and rewarding hobby that encourages
            mindfulness.
          </li>
          <li>
            You learn about different countries, cultures, events, and famous
            people.
          </li>
          <li>
            Stamps are miniature works of art, often beautifully designed.
          </li>
          <li>
            You can build a personal collection that reflects your own interests
            or passions.
          </li>
          <li>
            It connects you to a global community of collectors — both online
            and offline.
          </li>
        </ul>

        <h2 id="how-to-begin" className="text-2xl font-semibold mb-2">
          How to Begin
        </h2>
        <ol className="list-decimal list-inside mb-6 text-lg leading-relaxed space-y-2">
          <li>
            <strong>Start simple:</strong> Begin by saving stamps from letters
            and packages you receive at home. Ask family and friends to save
            theirs for you too.
          </li>
          <li>
            <strong>Choose a theme or focus:</strong> Animals, space
            exploration, famous leaders, historical events, or stamps from your
            own country are all great starting points.
          </li>
          <li>
            <strong>Gather basic tools:</strong> Invest in a stamp album or
            stock book, stamp tongs (tweezers), a magnifying glass, and possibly
            a perforation gauge. These tools help you organize and safely handle
            your stamps.
          </li>
          <li>
            <strong>Join a community:</strong> Look for local stamp clubs or
            join online forums like Reddit&apos;s r/philately, Stamp Community
            Forum, or even Facebook groups. You&apos;ll learn faster by
            connecting with others.
          </li>
        </ol>

        <h2 id="where-to-find" className="text-2xl font-semibold mb-2">
          Where to Find Stamps
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Stamps are everywhere once you start looking! Here are some common
          sources:
        </p>
        <ul className="list-disc list-inside mb-6 text-lg leading-relaxed">
          <li>Save stamps from your incoming mail and packages.</li>
          <li>Visit local flea markets, antique shops, or garage sales.</li>
          <li>
            Ask friends or relatives if they have old letters or collections.
          </li>
          <li>
            Purchase beginner lots from trusted sellers on eBay, Etsy, or
            Delcampe.
          </li>
          <li>
            Contact local philatelic societies or attend stamp fairs and expos.
          </li>
          <li>
            Trade duplicates with other collectors in forums or on hobby
            platforms.
          </li>
        </ul>

        <h2 id="final-tips" className="text-2xl font-semibold mb-2">
          Final Tips
        </h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>
            Handle stamps with care — always use tongs to avoid damage from oils
            on your fingers.
          </li>
          <li>
            Store stamps in a dry, cool place to protect them from moisture and
            sunlight.
          </li>
          <li>
            Stay curious — research the history and meaning behind each stamp
            you collect.
          </li>
          <li>
            Keep a record of your collection: date, source, condition, and
            catalog number if available.
          </li>
          <li>Most importantly, have fun and make the hobby your own!</li>
        </ul>
      </div>
    </div>
  );
}
