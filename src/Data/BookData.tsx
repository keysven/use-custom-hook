export type BookData = {
    pages: {
      imageUrl: string;
      contents: {
        type: "LINE" | "PAUSE";
        value: {
          text: string;
          position: {
            x: number;
            y: number;
          };
        } | null;
        duration: number;
      }[];
    }[];
};