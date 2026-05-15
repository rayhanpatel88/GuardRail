"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const easeLuxury: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  {
    indicator: "01 / AUDIT",
    title: "Comprehensive AI Audits",
    summary: "Evaluating model safety and algorithmic drift across production AI systems.",
    detail:
      "A structured review of model behavior, governance controls, risk ownership, and failure modes, designed for boards, legal teams, and technical operators who need defensible evidence.",
    metric: "128",
    metricLabel: "control checks",
    rows: ["Model safety review", "Drift and bias analysis", "Board-ready audit trail"],
  },
  {
    indicator: "02 / PIPELINE",
    title: "Data Transparency Frameworks",
    summary: "Enforcing open, ethical, compliant data pipelines across the enterprise.",
    detail:
      "GUARDRAIL maps lineage, consent, retention, access, and transformation logic into a transparent operating model that makes data accountability inspectable.",
    metric: "94%",
    metricLabel: "lineage coverage",
    rows: ["Source-to-output lineage", "Consent and retention logic", "Explainability documentation"],
  },
  {
    indicator: "03 / REGULATORY",
    title: "Continuous Compliance Strategies",
    summary: "Adapting to evolving global AI regulations without slowing deployment.",
    detail:
      "A continuous governance cadence that translates emerging regulation into operating controls, executive reporting, and practical remediation plans.",
    metric: "72h",
    metricLabel: "readiness window",
    rows: ["Regulatory change monitoring", "Control refresh cadence", "Exception remediation workflows"],
  },
];

function ServiceBlock({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 28%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.45,
  });
  const opacity = useTransform(smoothProgress, [0, 0.38, 0.72, 1], [0.34, 1, 1, 0.46]);
  const y = useTransform(smoothProgress, [0, 0.45, 1], [36, 0, -18]);
  const lineScale = useTransform(smoothProgress, [0.1, 0.58, 1], [0, 1, 1]);
  const maskOpacity = useTransform(smoothProgress, [0, 0.44, 0.84, 1], [0, 0.11, 0.06, 0]);

  return (
    <motion.article
      ref={ref}
      style={{ opacity, y }}
      className="relative min-h-[72vh] transform-gpu border-t border-white/10 py-16 will-change-transform first:border-t-0 lg:min-h-[82vh] lg:py-24"
    >
      <motion.div
        aria-hidden="true"
        style={{ opacity: maskOpacity }}
        className="pointer-events-none absolute inset-0 transform-gpu bg-white will-change-opacity"
      />

      <div className="relative grid gap-10 lg:grid-cols-[9rem_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/[0.52]">
            {service.indicator}
          </p>
          <motion.div
            style={{ scaleX: lineScale }}
            className="mt-5 h-px origin-left bg-white/50"
          />
        </div>

        <div className="max-w-3xl">
          <div className="mb-10 flex items-start justify-between gap-8 border-b border-white/10 pb-8">
            <div>
              <h3 className="font-display text-[clamp(2rem,4.2vw,4.5rem)] leading-[0.95] tracking-[-0.045em] text-white">
                {service.title}
              </h3>
              <p className="mt-6 max-w-2xl text-xl leading-9 text-white/[0.72]">
                {service.summary}
              </p>
            </div>

            <div className="hidden shrink-0 border border-white/10 px-5 py-4 text-right md:block">
              <p className="font-display text-5xl leading-none tracking-[-0.05em] text-white">
                {service.metric}
              </p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-white/[0.42]">
                {service.metricLabel}
              </p>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(13rem,0.42fr)]">
            <p className="premium-copy text-base lg:text-lg">{service.detail}</p>

            <div className="space-y-0 border-t border-white/10 lg:border-t-0">
              {service.rows.map((row, rowIndex) => (
                <div
                  key={row}
                  className="flex items-center justify-between gap-6 border-b border-white/10 py-4"
                >
                  <span className="text-sm text-white/[0.72]">{row}</span>
                  <span className="font-mono text-xs text-white/[0.34]">
                    0{index + 1}.{rowIndex + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesAuditsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.32, 0.68, 1],
    ["#050B14", "#071224", "#0A1426", "#050B14"],
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor }}
      className="relative isolate overflow-clip border-t border-white/10 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:12rem_12rem] [mask-image:linear-gradient(90deg,black,transparent_72%)]" />
      <div className="vault-container relative grid gap-16 py-24 lg:grid-cols-[minmax(20rem,0.78fr)_minmax(0,1.22fr)] lg:gap-24 lg:py-32">
        <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-12rem)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-18% 0px" }}
            transition={{ duration: 0.9, ease: easeLuxury }}
            className="flex h-full flex-col justify-between border-t border-white/10 pt-8"
          >
            <div>
              <p className="eyebrow">Services & Audits</p>
              <h2 className="mt-8 max-w-[10ch] font-display text-[clamp(3rem,6vw,6.6rem)] leading-[0.88] tracking-[-0.052em] text-white">
                Our Governance Pillars: Moving from Ambiguity to Certainty.
              </h2>
            </div>

            <div className="mt-12 max-w-sm border-l border-white/10 pl-6">
              <p className="text-sm leading-7 text-white/[0.58]">
                Enterprise AI governance becomes durable when risk, data lineage, and
                regulatory change are translated into measurable operating controls.
              </p>
              <div className="mt-8 grid grid-cols-3 border-y border-white/10 py-5">
                <div>
                  <p className="font-display text-3xl leading-none text-white">3</p>
                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.12em] text-white/[0.36]">
                    pillars
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl leading-none text-white">24/7</p>
                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.12em] text-white/[0.36]">
                    monitoring
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl leading-none text-white">0</p>
                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.12em] text-white/[0.36]">
                    guesswork
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </aside>

        <div className="relative">
          {services.map((service, index) => (
            <ServiceBlock key={service.indicator} service={service} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
