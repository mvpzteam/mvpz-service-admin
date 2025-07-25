export const getEventImage = ({ imageUrl }: { imageUrl: string }): string => {
  if (imageUrl.includes("https://") || imageUrl.includes("http://")) {
    return imageUrl;
  }

  return `https://f005.backblazeb2.com/file/mvpz-ncaa${imageUrl}`;
};
