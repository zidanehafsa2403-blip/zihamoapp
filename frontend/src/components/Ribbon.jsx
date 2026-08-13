import Marquee from "react-fast-marquee";

const WORDS = [
  "Stationery", "Drinkware", "Audio", "Tech Accessories", "Desk Accessories",
  "Wellness", "Bags & Luggage", "Apparel", "Trophies", "Gift Hampers",
];

const Diamond = () => (
  <span className="mx-8 inline-block h-2 w-2 rotate-45 bg-[#153328]/60 align-middle" />
);

export const Ribbon = () => (
  <div data-testid="marquee" className="border-y border-[#153328]/15 bg-[#D5CDBF] py-6">
    <Marquee speed={38} gradient={false} autoFill>
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className="font-serif-z text-3xl md:text-4xl italic font-light text-[#153328]">{w}</span>
          <Diamond />
        </span>
      ))}
    </Marquee>
  </div>
);
