"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

type GitHubContributionCell = {
  count: number;
  date: string;
  dayIndex: number;
  description: string;
  level: number;
  weekIndex: number;
};

type GitHubContributionMonth = {
  label: string;
  span: number;
  weekIndex: number;
};

type GitHubContributionResponse = {
  cells: GitHubContributionCell[];
  from: string;
  months: GitHubContributionMonth[];
  to: string;
  totalContributions: number;
  weeks: number;
};

type HoveredContribution = {
  align: "center" | "left" | "right";
  cell: GitHubContributionCell;
  x: number;
  y: number;
};

const CELL_SIZE = 10;
const CELL_GAP = 3;
const WEEK_STEP = CELL_SIZE + CELL_GAP;
const MONTH_LABEL_Y = 12;
const GRID_Y_OFFSET = 28;

const LEVEL_FILLS = [
  "var(--gh-level-0)",
  "var(--gh-level-1)",
  "var(--gh-level-2)",
  "var(--gh-level-3)",
  "var(--gh-level-4)",
] as const;

const HEATMAP_CARD_CLASS_NAME =
  "overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)] text-zinc-950 shadow-none dark:bg-[linear-gradient(180deg,#05060a_0%,#05070d_100%)] dark:text-zinc-100";

function formatContributionRange(from: string, to: string) {
  if (!from || !to) {
    return "the last year";
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    return "the last year";
  }

  const fromYear = fromDate.getUTCFullYear();
  const toYear = toDate.getUTCFullYear();

  if (fromYear === toYear) {
    return String(toYear);
  }

  return `${fromYear}-${String(toYear).slice(-2)}`;
}

function formatContributionDate(date: string) {
  const contributionDate = new Date(date);

  if (Number.isNaN(contributionDate.getTime())) {
    return date;
  }

  return contributionDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function HeatmapSkeleton() {
  const monthLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const cells = Array.from({ length: 53 * 7 }, (_, index) => index);

  return (
    <Card className={HEATMAP_CARD_CLASS_NAME}>
      <CardContent className="p-5 sm:p-6">
        <div className="animate-pulse space-y-5">
          <div className="flex justify-between text-[11px] uppercase tracking-[0.28em] text-zinc-400 dark:text-zinc-500">
            {monthLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px]">
            {cells.map((cell) => (
              <div
                key={cell}
                className="aspect-square rounded-[3px] bg-zinc-200/80 dark:bg-zinc-900"
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t border-zinc-200/70 px-5 py-4 sm:px-6 dark:border-zinc-900/80">
        <div className="h-7 w-48 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-900" />
        <div className="h-5 w-28 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-900" />
      </CardFooter>
    </Card>
  );
}

export function GitHubContributionHeatmap({
  profileUrl,
  username,
}: {
  profileUrl: string;
  username: string;
}) {
  const [data, setData] = useState<GitHubContributionResponse | null>(null);
  const [error, setError] = useState(false);
  const [hoveredContribution, setHoveredContribution] =
    useState<HoveredContribution | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadContributionGraph() {
      try {
        setError(false);

        const response = await fetch(`/api/github-contributions/${username}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load GitHub contributions.");
        }

        const contributionGraph =
          (await response.json()) as GitHubContributionResponse;

        setData(contributionGraph);
      } catch (loadError) {
        if ((loadError as Error).name === "AbortError") {
          return;
        }

        setError(true);
      }
    }

    void loadContributionGraph();

    return () => controller.abort();
  }, [username]);

  if (!data && !error) {
    return <HeatmapSkeleton />;
  }

  if (!data || error) {
    return (
      <Card className={HEATMAP_CARD_CLASS_NAME}>
        <CardContent className="p-5 sm:p-6">
          <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
            GitHub activity is temporarily unavailable.
          </p>
        </CardContent>
        <CardFooter className="justify-between border-t border-zinc-200/70 px-5 py-4 sm:px-6 dark:border-zinc-900/80">
          <span className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
            Live contribution data
          </span>
          <Link
            href={profileUrl}
            className="font-mono text-sm text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
            rel="noreferrer"
            target="_blank"
          >
            Open profile
          </Link>
        </CardFooter>
      </Card>
    );
  }

  const viewBoxWidth = data.weeks * WEEK_STEP - CELL_GAP;
  const viewBoxHeight = GRID_Y_OFFSET + 7 * WEEK_STEP - CELL_GAP;
  const rangeLabel = formatContributionRange(data.from, data.to);

  function updateHoveredContribution(
    cell: GitHubContributionCell,
    clientX: number,
    clientY: number,
  ) {
    const viewportWidth = window.innerWidth;
    const viewportPadding = 16;
    const edgeThreshold = 220;

    let align: HoveredContribution["align"] = "center";
    let tooltipX = clientX;

    if (clientX < edgeThreshold) {
      align = "left";
      tooltipX = viewportPadding;
    } else if (clientX > viewportWidth - edgeThreshold) {
      align = "right";
      tooltipX = viewportWidth - viewportPadding;
    }

    setHoveredContribution({
      align,
      cell,
      x: tooltipX,
      y: Math.max(clientY - 14, 16),
    });
  }

  return (
    <Card
      className={`${HEATMAP_CARD_CLASS_NAME} [--gh-level-0:#e8ece8] [--gh-level-1:#9dd8a8] [--gh-level-2:#67c37a] [--gh-level-3:#35a857] [--gh-level-4:#1f7a3c] dark:[--gh-level-0:#161b22] dark:[--gh-level-1:#0e4429] dark:[--gh-level-2:#006d32] dark:[--gh-level-3:#26a641] dark:[--gh-level-4:#39d353]`}
    >
      <CardContent className="p-5 sm:p-6">
        <div className="relative" onMouseLeave={() => setHoveredContribution(null)}>
          <div className="overflow-x-auto overflow-y-visible md:overflow-x-visible">
            <svg
              aria-label={`${data.totalContributions} GitHub contributions in ${rangeLabel}`}
              className="block h-auto w-[686px] md:w-full"
              role="img"
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            >
              {data.months.map((month) => {
                const monthCenter =
                  month.weekIndex * WEEK_STEP +
                  (month.span * WEEK_STEP - CELL_GAP) / 2;

                return (
                  <text
                  key={`${month.label}-${month.weekIndex}`}
                  x={monthCenter}
                  y={MONTH_LABEL_Y}
                  fill="currentColor"
                  className="text-zinc-500 dark:text-zinc-500"
                  fontFamily="ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace"
                  fontSize="11"
                  letterSpacing="0.08em"
                    textAnchor="middle"
                  >
                    {month.label}
                  </text>
                );
              })}

              {data.cells.map((cell) => (
                <rect
                  key={cell.date}
                  x={cell.weekIndex * WEEK_STEP}
                  y={GRID_Y_OFFSET + cell.dayIndex * WEEK_STEP}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={2}
                  fill={LEVEL_FILLS[cell.level] ?? LEVEL_FILLS[0]}
                  className="cursor-pointer outline-none"
                  onBlur={() => setHoveredContribution(null)}
                  onFocus={(event) =>
                    updateHoveredContribution(
                      cell,
                      event.currentTarget.getBoundingClientRect().left +
                        event.currentTarget.getBoundingClientRect().width / 2,
                      event.currentTarget.getBoundingClientRect().top,
                    )
                  }
                  onMouseEnter={(event) =>
                    updateHoveredContribution(cell, event.clientX, event.clientY)
                  }
                  onMouseMove={(event) =>
                    updateHoveredContribution(cell, event.clientX, event.clientY)
                  }
                  tabIndex={0}
                />
              ))}
            </svg>
          </div>
        </div>
        {hoveredContribution && typeof document !== "undefined"
          ? createPortal(
              <div
                className={`pointer-events-none fixed z-[100] -translate-y-full ${
                  hoveredContribution.align === "center"
                    ? "-translate-x-1/2"
                    : hoveredContribution.align === "right"
                      ? "-translate-x-full"
                      : ""
                }`}
                style={{
                  left: hoveredContribution.x,
                  top: hoveredContribution.y,
                }}
              >
                <div className="relative whitespace-nowrap rounded-md border border-zinc-700/70 bg-zinc-800/90 px-3 py-2 font-mono text-xs font-medium text-zinc-100/90 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]">
                  {hoveredContribution.cell.count}{" "}
                  {hoveredContribution.cell.count === 1
                    ? "contribution"
                    : "contributions"}{" "}
                  on {formatContributionDate(hoveredContribution.cell.date)}
                  <div
                    className={`absolute top-full size-2 -translate-y-1/2 rotate-45 border-b border-r border-zinc-700/70 bg-zinc-800/90 ${
                      hoveredContribution.align === "center"
                        ? "left-1/2 -translate-x-1/2"
                        : hoveredContribution.align === "right"
                          ? "right-5"
                          : "left-5"
                    }`}
                  />
                </div>
              </div>,
              document.body,
            )
          : null}
      </CardContent>
      <CardFooter className="justify-between gap-4 border-t border-zinc-200/70 px-5 py-4 max-sm:flex-col max-sm:items-start sm:px-6 dark:border-zinc-900/80">
        <p className="font-mono text-[11px] tracking-[0.08em] text-zinc-600 dark:text-zinc-400">
          <span className="mr-2 text-[11px] font-semibold text-zinc-950 dark:text-zinc-100">
            {data.totalContributions}
          </span>
          contributions in {rangeLabel}
        </p>
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-zinc-600 dark:text-zinc-400">
          <span>Less</span>
          <div className="flex items-center gap-[5px]">
            {LEVEL_FILLS.map((color, index) => (
              <span
                key={`${color}-${index}`}
                aria-hidden="true"
                className="size-3 rounded-[3px]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </CardFooter>
    </Card>
  );
}
