import { reviewItems, type ReviewItem } from "@/lib/reviewItems";

type Props = {
  items?: ReviewItem[];
};

const COLUMN_COUNT = 4;
const REPEAT = 2;
const VISIBLE = 3;

const columnOffsets = ["mt-0", "mt-16", "mt-4", "mt-24"];

export function HeroReview({ items = reviewItems }: Props) {
  const columns = Array.from({ length: COLUMN_COUNT }, (_, c) => {
    if (items.length === 0) return [];
    const shift = (c * VISIBLE) % items.length;
    const base = [...items.slice(shift), ...items.slice(0, shift)];

    return Array.from({ length: REPEAT }, () => base).flat();
  });

  return (
    <section className="section-style horizontal-padding-style vertical-margin-style">
      <div className="relative h-[80svh] overflow-hidden [-webkit-mask-composite:source-in] mask-intersect [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent),linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent),linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="absolute left-1/2 top-1/2 flex h-[160%] w-[130%] -translate-x-1/2 -translate-y-1/2 -rotate-12 justify-center gap-4">
          {columns.map((column, c) => (
            <div
              key={c}
              className={`flex w-full max-w-72 flex-col gap-4 ${columnOffsets[c]} ${
                c >= 2 ? "hidden md:flex" : ""
              }`}
            >
              {column.map((review, index) => (
                <figure
                  key={`${review.id}-${index}`}
                  className="rounded-2xl bg-white/7.5 p-4 text-white"
                >
                  <blockquote className="text-sm leading-tight tracking-tight opacity-50">
                    {review.text}
                  </blockquote>
                  <figcaption className="mt-12.5">
                    <p className="font-semibold leading-none tracking-tighter">
                      {review.name}
                    </p>
                    <p className="mt-1 text-xs leading-none opacity-70">
                      {review.role}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
