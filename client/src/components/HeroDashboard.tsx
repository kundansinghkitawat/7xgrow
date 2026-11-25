import {
  dashboardItems,
  industryAverage,
  yAxisTicks,
  yearlyGrowth,
} from "@/lib/dashboardItems";

const cardStyle = "rounded-4xl p-5";

const hatch = {
  backgroundImage:
    "linear-gradient(135deg, transparent calc(50% - 0.03125rem), rgba(255,255,255,0.14) calc(50% - 0.03125rem), rgba(255,255,255,0.14) calc(50% + 0.03125rem), transparent calc(50% + 0.03125rem))",
  backgroundSize: "0.62rem 0.62rem",
  backgroundRepeat: "repeat",
} as const;

function StatNumber({ value, big }: { value: string; big?: boolean }) {
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const [, prefix = "", number = value, suffix = ""] = match ?? [];

  const small = big ? "text-3xl" : "text-2xl";

  return (
    <span className="font-number flex items-baseline gap-0.5 leading-none tracking-tighter tabular-nums">
      {prefix && (
        <span className={`${small} italic-skew font-semibold text-white/35`}>
          {prefix}
        </span>
      )}
      <span
        className={`${big ? "text-6xl" : "text-4xl"} italic-skew font-medium text-white`}
      >
        {number}
      </span>
      {suffix && (
        <span className={`${small} italic-skew font-semibold text-white/35`}>
          {suffix}
        </span>
      )}
    </span>
  );
}

export default function HeroDashboard() {
  const peak = yearlyGrowth.reduce((a, b) => (b.value > a.value ? b : a));
  const lift = peak.value - industryAverage;

  return (
    <section
      aria-label="Growth overview"
      className="section-style horizontal-padding-style vertical-margin-style grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
    >
      <article
        className={`${cardStyle} flex h-[65svh] min-h-105 flex-col gap-5 sm:col-span-2 lg:row-span-2`}
      >
        <header className="flex items-start justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-semibold leading-none tracking-tighter text-white">
              Client growth by year
            </h2>
            <p className="mt-1.5 text-sm leading-none tracking-tight text-white/50">
              Average performance lift across all campaigns
            </p>
          </div>

          <div className="hidden items-center gap-1 text-xs leading-none tracking-tight text-neutral-400 sm:flex">
            <span
              aria-hidden
              className="block h-0 w-5 border-t-2 border-dashed border-white/25"
            />
            Industry average
          </div>
        </header>

        <div className="flex items-baseline justify-start gap-1.5">
          <StatNumber value={`${peak.value}%`} big />
          <p className="text-sm leading-tight tracking-tight text-neutral-400">
            in {peak.year}, {lift} pts above industry average
          </p>
        </div>

        <div
          role="img"
          aria-label={`Bar chart of growth by year. ${yearlyGrowth
            .map((d) => `${d.year}: ${d.value}%`)
            .join(", ")}. Industry average is ${industryAverage}%.`}
          className="grid min-h-0 flex-1 grid-cols-[2rem_1fr] grid-rows-[1fr_auto] gap-y-2 pt-2 sm:grid-cols-[2.5rem_1fr]"
        >
          <div className="relative">
            {yAxisTicks.map((t) => (
              <span
                key={t}
                className="absolute left-0 -translate-y-1/2 text-xs font-semibold leading-none tracking-tighter text-white/25 tabular-nums"
                style={{ bottom: `${t}%` }}
              >
                {t}%
              </span>
            ))}
          </div>

          <div className="relative">
            {yAxisTicks.map((t) => (
              <div
                key={t}
                aria-hidden
                className="absolute inset-x-0 border-t-2 border-white/12.5"
                style={{ bottom: `${t}%` }}
              />
            ))}

            <div className="absolute inset-0 flex items-end gap-1.5 sm:gap-3">
              {yearlyGrowth.map((d) => {
                const isPeak = d.year === peak.year;
                return (
                  <div
                    key={d.year}
                    tabIndex={0}
                    className="group relative flex h-full flex-1 items-end outline-none"
                  >
                    <div
                      className={`relative w-full rounded-2xl transition-colors duration-150 ${
                        isPeak
                          ? "bg-brand-pink"
                          : "border-2 border-white/7 bg-[#1c1c1c] group-hover:border-white/20 group-focus-visible:border-white/20"
                      }`}
                      style={{
                        height: `${d.value}%`,
                        ...(isPeak ? {} : hatch),
                      }}
                    >
                      {!isPeak && (
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-2.5 h-0.5 w-3 -translate-x-1/2 bg-white/40 transition-opacity duration-150 group-hover:opacity-0 group-focus-visible:opacity-0"
                        />
                      )}

                      <span
                        className={`absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-white px-1 py-0.5 md:px-1.5 md:py-1 text-[10px] md:text-xs font-medium leading-none tracking-tighter flex items-center justify-center text-center text-black tabular-nums transition-opacity duration-150 ${
                          isPeak
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                        }`}
                      >
                        {d.value}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 z-10 border-t-2 border-dashed border-white/25"
              style={{ bottom: `${industryAverage}%` }}
            >
              <span className="absolute left-0 top-0 -translate-y-1/2 rounded-full bg-white px-1 md:px-1.5 text-xs text-[10px] md:text-xs leading-5 tracking-tighter flex justify-center items-center text-center font-medium text-black tabular-nums">
                Avg {industryAverage}%
              </span>
            </div>
          </div>

          <div aria-hidden />
          <div className="flex gap-1.5 sm:gap-3">
            {yearlyGrowth.map((d) => (
              <span
                key={d.year}
                className={`flex-1 text-center text-xs font-semibold leading-none tracking-tighter tabular-nums ${
                  d.year === peak.year ? "text-white" : "text-white/25"
                }`}
              >
                {d.year}
              </span>
            ))}
          </div>
        </div>
      </article>

      {dashboardItems.map((item) => {
        const stat = item.stats[0];
        return (
          <article
            key={item.id}
            className="flex min-h-40 flex-col justify-between gap-6 rounded-4xl bg-white/8 p-5"
          >
            <div>
              <h3 className="text-base font-semibold leading-none tracking-tighter text-white/75">
                {item.menu}
              </h3>
              <p className="mt-1 text-xs leading-none text-white/40">
                {item.category}
              </p>
            </div>

            <div className="flex justify-start items-baseline">
              <StatNumber value={stat.value} />
              <p className="ml-1.5 text-xs leading-none tracking-tight text-white/50 font font-medium">
                {stat.label}, {stat.note}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
