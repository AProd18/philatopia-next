"use client";

import { useEffect, useState } from "react";

const facts = [
  <p key="fact1" className="text-sm text-text">
    The world&apos;s most expensive stamp is the{" "}
    <span className="font-semibold">British Guiana 1c magenta</span>, which was
    sold for over <span className="text-red-500 font-semibold">$9 million</span>
    .
    <br />
    Only one copy is known to exist, making it a true gem among collectors!
  </p>,
  <p key="fact2" className="text-sm text-text">
    The <span className="font-semibold">Penny Black</span> was the world&apos;s
    first stamp, issued in 1840 and featuring{" "}
    <span className="text-blue-600 font-semibold">Queen Victoria</span>.
    <br />
    It changed the way people sent mail forever!
  </p>,
  <p key="fact3" className="text-sm text-text">
    Some countries have issued stamps made of{" "}
    <span className="font-semibold">wood, fabric, or even chocolate</span> 🍫.
    <br />
    These unusual materials make stamps highly collectible!
  </p>,
  <p key="fact4" className="text-sm text-text">
    Stamp collecting is called <span className="font-semibold">philately</span>,
    one of the world&apos;s most beloved hobbies.
    <br />
    There are over{" "}
    <span className="text-green-600 font-semibold">60 million</span> stamp
    collectors worldwide!
  </p>,
  <p key="fact5" className="text-sm text-text">
    The <span className="font-semibold">Inverted Jenny</span> is a famous
    misprint stamp that features an upside-down airplane ✈️.
    <br />
    One copy was sold for over{" "}
    <span className="text-red-500 font-semibold">$1.5 million</span>!
  </p>,
];

export default function StampFact() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[50%] bg-card rounded shadow p-4 transition-opacity duration-500 ease-in-out mb-5">
      <h3 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
        📬 Did you know?
      </h3>
      {facts[index]}
    </div>
  );
}
