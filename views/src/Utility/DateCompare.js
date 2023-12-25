function checkTimeLapse(createdAt) {
  try {
    const createdDate = new Date(createdAt);
    const now = new Date();

    const diffTime = now - createdDate;
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffHours >= 48) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Error formatting date";
  }
}

export default checkTimeLapse;
