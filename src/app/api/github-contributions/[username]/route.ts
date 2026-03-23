import { NextResponse } from "next/server";

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

const CONTRIBUTIONS_URL = "https://github.com/users";
const CACHE_SECONDS = 60 * 60 * 6;

const CELL_REGEX =
  /<td(?=[^>]*id="contribution-day-component-(\d+)-(\d+)")(?=[^>]*data-date="([^"]+)")(?=[^>]*data-level="([^"]+)")[^>]*><\/td>\s*<tool-tip[^>]*>([^<]+)<\/tool-tip>/g;
const MONTH_REGEX =
  /<td[^>]*class="ContributionCalendar-label"[^>]*colspan="(\d+)"[^>]*>[\s\S]*?<span aria-hidden="true"[^>]*>([^<]+)<\/span>/g;

function parseContributionCount(description: string) {
  if (description.startsWith("No contributions")) {
    return 0;
  }

  const match = description.match(/(\d[\d,]*)/);

  return match ? Number(match[1].replaceAll(",", "")) : 0;
}

function parseTotalContributions(markup: string) {
  const match = markup.match(
    /<h2[^>]*id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/,
  );

  if (!match) {
    return 0;
  }

  const text = match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const numberMatch = text.match(/(\d[\d,]*)/);

  return numberMatch ? Number(numberMatch[1].replaceAll(",", "")) : 0;
}

function parseContributionGraph(markup: string) {
  const totalContributions = parseTotalContributions(markup);
  const from = markup.match(/data-from="([^"]+)"/)?.[1] ?? "";
  const to = markup.match(/data-to="([^"]+)"/)?.[1] ?? "";

  const months: GitHubContributionMonth[] = [];
  let runningWeekIndex = 0;
  let monthMatch: RegExpExecArray | null;

  MONTH_REGEX.lastIndex = 0;

  while ((monthMatch = MONTH_REGEX.exec(markup)) !== null) {
    const span = Number(monthMatch[1]);

    months.push({
      label: monthMatch[2].trim(),
      span,
      weekIndex: runningWeekIndex,
    });

    runningWeekIndex += span;
  }

  const cells: GitHubContributionCell[] = [];
  let maxWeekIndex = 0;
  let cellMatch: RegExpExecArray | null;

  CELL_REGEX.lastIndex = 0;

  while ((cellMatch = CELL_REGEX.exec(markup)) !== null) {
    const dayIndex = Number(cellMatch[1]);
    const weekIndex = Number(cellMatch[2]);
    const date = cellMatch[3];
    const level = Number(cellMatch[4]);
    const description = cellMatch[5].trim();

    cells.push({
      count: parseContributionCount(description),
      date,
      dayIndex,
      description,
      level,
      weekIndex,
    });

    maxWeekIndex = Math.max(maxWeekIndex, weekIndex);
  }

  return {
    cells,
    from,
    months,
    to,
    totalContributions,
    weeks: maxWeekIndex + 1,
  };
}

export async function GET(
  _request: Request,
  { params }: { params: { username: string } },
) {
  const username = params.username?.trim();

  if (!username) {
    return NextResponse.json(
      { error: "A GitHub username is required." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${CONTRIBUTIONS_URL}/${encodeURIComponent(username)}/contributions`,
      {
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "User-Agent": "Portfolio GitHub Heatmap",
        },
        next: { revalidate: CACHE_SECONDS },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "GitHub contributions are unavailable right now." },
        { status: response.status },
      );
    }

    const markup = await response.text();
    const contributionGraph = parseContributionGraph(markup);

    if (!contributionGraph.cells.length) {
      return NextResponse.json(
        { error: "GitHub returned an empty contribution graph." },
        { status: 502 },
      );
    }

    return NextResponse.json(contributionGraph, {
      headers: {
        "Cache-Control": `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=86400`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "GitHub contributions are unavailable right now." },
      { status: 502 },
    );
  }
}
