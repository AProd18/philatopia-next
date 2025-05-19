export default function Glossary() {
  const terms = [
    {
      term: "Philately",
      definition:
        "The study and collection of postage stamps and related postal history.",
    },
    {
      term: "Cover",
      definition:
        "An envelope or package that has been sent through the mail with stamps and postmarks.",
    },
    {
      term: "Postmark",
      definition:
        "A postal marking indicating the date and place of mailing, often of interest to collectors.",
    },
    {
      term: "Perforation Gauge",
      definition:
        "A tool used to measure the number of holes (perforations) between stamps.",
    },
  ];

  return (
    <section className="mt-12 bg-[color:var(--card)] p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Philately Glossary</h2>
      <ul className="space-y-3 text-lg">
        {terms.map(({ term, definition }) => (
          <li key={term}>
            <strong>{term}:</strong> {definition}
          </li>
        ))}
      </ul>
    </section>
  );
}
