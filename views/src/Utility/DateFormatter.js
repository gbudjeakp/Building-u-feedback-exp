function formatCreatedAt(createdAt) {
    const createdDate = new Date(createdAt);
    const now = new Date();
  
    const diffTime = now - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  
    if (diffDays === 0) {
      return "Created today";
    } else if (diffDays === 1) {
      return "Created yesterday";
    } else {
      return `Created ${rtf.format(-diffDays, "day")} ago`;
    }
  }
  
  export default formatCreatedAt;