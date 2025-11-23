import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  // Parse the date string and normalize to local timezone
  let targetDate: Date;
  if (!date.includes("T")) {
    // If no time is provided, parse as local date at midnight
    const [year, month, day] = date.split("-").map(Number);
    targetDate = new Date(year, month - 1, day);
  } else {
    targetDate = new Date(date);
  }

  // Get current date at midnight for accurate day comparison
  const now = new Date();
  const currentDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const targetDateMidnight = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  // Calculate difference in milliseconds
  const timeDifference = currentDate.getTime() - targetDateMidnight.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Format the full date
  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Only show "Today" if it's actually today (daysAgo === 0)
  if (daysAgo === 0) {
    return "Today";
  } else if (daysAgo === 1) {
    return `${fullDate} (1d ago)`;
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}
