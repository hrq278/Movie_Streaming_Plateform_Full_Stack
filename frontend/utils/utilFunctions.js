export function formatReleaseDate (date){
    return new Date(date).toLocaleDateString("en-US",{
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}

export function formatDate(dateString) {
  if (!dateString) return "Unknown";

  const date = new Date(dateString);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}
