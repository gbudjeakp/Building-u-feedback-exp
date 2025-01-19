function formatCreatedAt(createdAt) {
  try {
    const createdDate = new Date(createdAt);
    const now = new Date();

    // Adjust for time zone offset
    const timezoneOffset = createdDate.getTimezoneOffset();
    createdDate.setMinutes(createdDate.getMinutes() - timezoneOffset);

    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (diffDays === 0) {
      return "Created today";
    } else if (diffDays === 1) {
      return "Created yesterday";
    } else {
      return `Created: ${rtf.format(-diffDays, "day")}`;
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Error formatting date";
  }
}

export default formatCreatedAt;
