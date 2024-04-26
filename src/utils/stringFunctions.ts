export const trimText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  const ellipsis = "...";
  const trimmedText = text.substr(0, maxLength - ellipsis.length);
  const lastSpaceIndex = trimmedText.lastIndexOf(" ");

  if (lastSpaceIndex !== -1) {
    return trimmedText.substr(0, lastSpaceIndex) + ellipsis;
  } else {
    return trimmedText + ellipsis;
  }
};
