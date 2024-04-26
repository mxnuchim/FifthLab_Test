export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Add ordinal suffix to the day
  const day = date.getDate();
  const suffix = ["th", "st", "nd", "rd"];
  const ordinal = day % 10 < 4 ? suffix[day % 10] : suffix[0];
  return formattedDate.replace(/\d+(?=,)/, `${day}${ordinal}`);
};
