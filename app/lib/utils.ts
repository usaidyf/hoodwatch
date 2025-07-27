export function formatDateToRelative(datetime: Date | string): string {
   try {
      if (typeof datetime === 'string') datetime = new Date(datetime)

      const now = new Date();
      const diff = Math.floor((now.getTime() - datetime.getTime()) / 1000);

      if (diff < 60) return `${diff} seconds ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
      if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
      if (diff < 2592000) return `${Math.floor(diff / 604800)} weeks ago`;
      if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
      if (diff < 315360000) return `${Math.floor(diff / 31536000)} years ago`;

      return datetime.toLocaleDateString();
   } catch (error) {
      return '';
   }
}