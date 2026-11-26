import { milestoneItems } from "@/lib/journeyItems";

const HEADER_H = 3; // rem
const TOP_OFFSET = 5; // rem

export default function Journey() {
  return (
    <section className="w-full section-style horizontal-padding-style vertical-margin-style text-white">
      <ol className="flex w-full flex-col pr-1.5 md:pr-0">
        {milestoneItems.map((item, index) => (
          <li
            key={item.year}
            className="sticky"
            style={{ top: `${TOP_OFFSET + index * HEADER_H}rem` }}
          >
            <div className="relative overflow-y-clip">
              
              <div className="absolute inset-0 origin-bottom-left -skew-x-6 border-b-[0.15rem] border-l-[0.15rem] border-solid bg-black [border-image:linear-gradient(to_bottom_right,#3a3a3a,transparent)_1]" />

              <span className="absolute right-0 bottom-0 text-6xl tracking-tight leading-none font-thin text-right font-number italic-skew text-[#3a3a3a]/60">{index+1}</span>

              {/* content */}
              <div className="relative p-2.5">
                
                <div
                  className="flex items-center"
                  style={{ height: `${HEADER_H}rem` }}
                >
                  <div className="flex items-baseline gap-3.5 pl-2.5 pb-2.5">
                    <span className="text-white font-semibold text-nowrap leading-0 tracking-tight text-sm md:text-base lg:text-lg">
                      {item.year}
                    </span>
                    <h3 className="text-white/50 font-semibold text-nowrap leading-0 tracking-tight text-xs md:text-sm lg:text-base">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-3.5 w-[94%] max-w-md leading-snug tracking-tight text-white/50 text-xs md:text-sm lg:text-base pl-1.5">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}