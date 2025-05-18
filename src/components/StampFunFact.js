// src/components/StampFunFact.js

const funFacts = [
  "The world's first adhesive postage stamp was the Penny Black, issued in 1840.",
  "Some rare stamps have sold for millions of dollars at auctions.",
  "Switzerland and Brazil were the second countries to issue stamps after the UK.",
  "Stamps are sometimes printed with intentional errors that become valuable over time.",
  "Some stamps are made with unusual materials, like silk or wood.",
];

export default function StampFunFact() {
  const fact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <aside className="mt-3 p-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 rounded-xl shadow-inner">
      <h3 className="font-bold text-lg mb-2">Did You Know?</h3>
      <p>{fact}</p>
    </aside>
  );
}
