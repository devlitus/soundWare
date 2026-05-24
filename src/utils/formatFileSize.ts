export const formatFileSize = (bytes: number): string => {
  if (bytes < 0) {
    return "0 B";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${Math.round(kb * 10) / 10} KB`;
  }

  const mb = kb / 1024;
  if (mb < 1024) {
    return `${Math.round(mb * 10) / 10} MB`;
  }

  const gb = mb / 1024;
  return `${Math.round(gb * 10) / 10} GB`;
};
