/**
 * Formats the last watered date according to the business logic:
 * - Less than 1 week: "Disiram X hari lalu"
 * - 1 week or more: "15 Januari 2024"
 */
export function formatLastWatered(lastWateredDate: Date | string): string {
  const date =
    typeof lastWateredDate === "string"
      ? new Date(lastWateredDate)
      : lastWateredDate;

  const today = new Date();
  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // If less than 1 week (7 days)
  if (diffDays < 7) {
    if (diffDays === 0) {
      return "Disiram hari ini";
    } else if (diffDays === 1) {
      return "Disiram 1 hari lalu";
    } else {
      return `Disiram ${diffDays} hari lalu`;
    }
  }

  // If 1 week or more, show specific date
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Calculate the next watering date based on last watered date and frequency
 */
export function calculateNextWateringDate(
  lastWateredDate: Date | string,
  frequencyDays: number,
): Date {
  const date =
    typeof lastWateredDate === "string"
      ? new Date(lastWateredDate)
      : lastWateredDate;

  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + frequencyDays);
  return nextDate;
}

/**
 * Format the next watering prompt
 * Returns text like "Siram lagi dalam 3 hari" or "Seharusnya disiram 2 hari lalu"
 */
export function formatNextWateringPrompt(
  lastWateredDate: Date | string,
  frequencyDays: number,
): string {
  const nextDate = calculateNextWateringDate(lastWateredDate, frequencyDays);
  const today = new Date();

  const diffTime = nextDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    if (diffDays === 1) {
      return "Siram lagi besok";
    }
    return `Siram lagi dalam ${diffDays} hari`;
  } else if (diffDays === 0) {
    return "Saatnya menyiram hari ini";
  } else {
    const overdueDays = Math.abs(diffDays);
    return `Seharusnya disiram ${overdueDays} hari lalu`;
  }
}

/**
 * Determine plant status based on watering schedule
 */
export function getPlantStatus(
  lastWateredDate: Date | string,
  frequencyDays: number,
): "happy" | "needs-attention" {
  const nextDate = calculateNextWateringDate(lastWateredDate, frequencyDays);
  const today = new Date();

  const diffTime = nextDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // If overdue (should have been watered) or due today, needs attention
  if (diffDays <= 0) {
    return "needs-attention";
  }

  return "happy";
}
