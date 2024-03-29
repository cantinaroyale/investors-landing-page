export const makeElipsisAddress = (address: string, padding: number) => {
  if (!address) return "";
  const firstPart = address.substr(0, padding);
  const secondPart = address.substr(address.length - padding);
  return `${firstPart}...${secondPart}`;
};
