"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useRef, useState } from "react";

const easeLuxury: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headlineLines = [
  "Govtelligence",
  "for AI",
  "Oversight.",
];

const navItems = ["Services", "Insights", "Frameworks"];

function useMagneticMotion<T extends HTMLElement>(strength: number) {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.35 });

  function handleMove(event: MouseEvent<T>) {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: { x: springX, y: springY },
  };
}

function MagneticLink({
  children,
  className = "",
  strength = 0.22,
}: {
  children: string;
  className?: string;
  strength?: number;
}) {
  const magnetic = useMagneticMotion<HTMLAnchorElement>(strength);

  return (
    <motion.a href="#" className={className} {...magnetic}>
      {children}
    </motion.a>
  );
}

function MagneticButton({
  children,
  className = "",
  strength = 0.14,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const magnetic = useMagneticMotion<HTMLButtonElement>(strength);

  return (
    <motion.button type="button" className={className} {...magnetic}>
      {children}
    </motion.button>
  );
}

function RiskMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.6 });
  const rotateX = useTransform(smoothY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [-1, 1], [-5, 5]);
  const orbX = useTransform(smoothX, [-1, 1], ["18%", "72%"]);
  const orbY = useTransform(smoothY, [-1, 1], ["24%", "70%"]);
  const [activeCell, setActiveCell] = useState(8);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    pointerX.set(Math.max(-1, Math.min(1, normalizedX)));
    pointerY.set(Math.max(-1, Math.min(1, normalizedY)));
  }

  function handleLeave() {
    pointerX.set(0);
    pointerY.set(0);
    setActiveCell(8);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.05, delay: 0.55, ease: easeLuxury }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative min-h-[28rem] overflow-hidden border border-white/10 bg-white/[0.025] shadow-vault-soft"
      aria-label="Interactive AI governance risk matrix"
    >
      <motion.div
        className="pointer-events-none absolute h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.09] blur-3xl"
        style={{ left: orbX, top: orbY }}
      />

      <div className="relative flex h-full min-h-[28rem] flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-8 border-b border-white/10 pb-6">
          <div>
            <p className="eyebrow">Risk Matrix</p>
            <p className="mt-3 max-w-[18rem] text-sm leading-6 text-white/[0.58]">
              Control mapping across model exposure, data lineage, and regulatory pressure.
            </p>
          </div>
          <div className="border border-white/10 px-3 py-2 text-right">
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/[0.45]">Drift</p>
            <p className="font-display text-3xl leading-none tracking-[-0.04em] text-white">0.18</p>
          </div>
        </div>

        <div className="grid grid-cols-4 border-l border-t border-white/10">
          {Array.from({ length: 16 }).map((_, index) => {
            const severity = index % 5 === 0 || index === activeCell;
            const elevated = [6, 9, 10, 14].includes(index);

            return (
              <motion.button
                key={index}
                type="button"
                onMouseEnter={() => setActiveCell(index)}
                whileHover={{ backgroundColor: "rgb(255 255 255 / 0.075)" }}
                transition={{ duration: 0.45, ease: easeLuxury }}
                className="relative aspect-square border-b border-r border-white/10 bg-white/[0.015] p-3 text-left"
                aria-label={`Risk matrix cell ${index + 1}`}
              >
                <span className="absolute left-3 top-3 text-[0.62rem] uppercase tracking-[0.12em] text-white/[0.32]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <motion.span
                  animate={{
                    opacity: severity ? 1 : elevated ? 0.62 : 0.3,
                    scale: index === activeCell ? 1.25 : 1,
                  }}
                  transition={{ duration: 0.45, ease: easeLuxury }}
                  className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-white"
                />
                {index === activeCell ? (
                  <motion.span
                    layoutId="active-risk-cell"
                    className="absolute inset-0 border border-white/30"
                    transition={{ duration: 0.55, ease: easeLuxury }}
                  />
                ) : null}
              </motion.button>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-xs text-white/[0.52]">
          <div>
            <p className="text-white/[0.35]">Coverage</p>
            <p className="mt-1 font-medium text-white/80">94.2%</p>
          </div>
          <div>
            <p className="text-white/[0.35]">Controls</p>
            <p className="mt-1 font-medium text-white/80">128</p>
          </div>
          <div>
            <p className="text-white/[0.35]">Exceptions</p>
            <p className="mt-1 font-medium text-white/80">07</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GuardrailHero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-navy-depth text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(180deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:linear-gradient(180deg,black,transparent_82%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />

      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easeLuxury }}
        className="relative z-10 border-b border-white/10"
      >
        <nav className="vault-container flex min-h-20 items-center justify-between gap-8">
          <a
            href="#"
            className="group flex items-center gap-3 text-sm font-semibold tracking-[0.22em] text-white no-underline"
            aria-label="Govtelligence home"
          >
            <span className="grid h-8 w-8 place-items-center border border-white/[0.18] text-[0.72rem] tracking-[-0.03em] transition-colors duration-500 ease-premium group-hover:border-white/[0.42]">
              G
            </span>
            <span>GOVTELLIGENCE</span>
          </a>

          <div className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <MagneticLink
                key={item}
                className="premium-nav-link text-sm font-medium text-white/[0.66] no-underline"
              >
                {item}
              </MagneticLink>
            ))}
          </div>

          <MagneticButton
            strength={0.14}
            className="hidden min-h-11 items-center border border-white/[0.12] px-5 text-sm font-semibold text-white/[0.82] transition-colors duration-500 ease-premium hover:border-white/[0.28] hover:bg-white/[0.045] lg:inline-flex"
          >
            <span>Request Intelligence Briefing</span>
          </MagneticButton>
        </nav>
      </motion.header>

      <div className="relative z-10 vault-container grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center gap-16 py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(26rem,0.72fr)] lg:py-28">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: easeLuxury }}
            className="eyebrow mb-8"
          >
            AI Governance & Compliance
          </motion.p>

          <h1 className="max-w-[13ch] font-display text-[clamp(4.25rem,8.7vw,8.8rem)] leading-[0.86] tracking-[-0.058em] text-white">
            {headlineLines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-3">
                <motion.span
                  className="block"
                  initial={{ y: "112%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.15,
                    delay: 0.22 + index * 0.12,
                    ease: easeLuxury,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.62, ease: easeLuxury }}
            className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[minmax(0,0.78fr)_minmax(12rem,0.22fr)]"
          >
            <p className="premium-copy max-w-2xl text-lg">
              Govtelligence provides enterprise-grade AI audits, data transparency
              frameworks, and compliance strategies for forward-thinking
              organizations.
            </p>
            <div className="hidden border-l border-white/10 pl-6 md:block">
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-white/[0.38]">
                Audit readiness
              </p>
              <p className="mt-2 font-display text-4xl leading-none tracking-[-0.04em] text-white">
                72h
              </p>
            </div>
          </motion.div>
        </div>

        <RiskMatrix />
      </div>
    </section>
  );
}
