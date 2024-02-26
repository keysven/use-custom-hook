/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {BookData} from "../Data/BookData";

interface PagingState {
    pageCursor: number;
    contentCursor: number;
    autoPaging: boolean;
  
    toNextPage: () => void;
    toPrevPage: () => void;
    toNextContent: () => void;
    toPrevContent: () => void;
    toggleAutoPaging: () => void;
}




export const usePagingState = (data: BookData): PagingState => {
    const [pageCursor, setPageCursor] = useState(0);
    const [contentCursor, setContentCursor] = useState(0);
    const [autoPaging, setAutoPaging] = useState(false);
  
    const toNextPage = () => {
      if (pageCursor < data.pages.length - 1) {
        setPageCursor(pageCursor + 1);
        setContentCursor(0);
      }
    };
  
    const toPrevPage = () => {
      if (pageCursor > 0) {
        setPageCursor(pageCursor - 1);
        setContentCursor(0);
      }
    };
  
    const toNextContent = () => {
      const currentPage = data.pages[pageCursor];
      if (contentCursor < currentPage.contents.length - 1) {
        setPageCursor(contentCursor + 1);
      } else {
        toNextPage();
      }
    };
  
    const toPrevContent = () => {
      if (contentCursor > 0) {
        setPageCursor(contentCursor - 1);
      } else {
        toPrevContent();
      }
    };
    const toggleAutoPaging = () => setAutoPaging(!autoPaging);
  
    useEffect(() => {
      let timeoutId: string | number | NodeJS.Timeout | undefined;
  
      if (autoPaging) {
        const currentPage = data.pages[pageCursor];
        if (currentPage && contentCursor < currentPage.contents.length) {
          timeoutId = setTimeout(
            toNextContent,
            currentPage.contents[contentCursor].duration
          );
        }
      }
  
      return () => clearTimeout(timeoutId);
    }, [pageCursor, contentCursor, autoPaging]);
    return {
      pageCursor,
      contentCursor,
      autoPaging,
      toNextPage,
      toPrevPage,
      toNextContent,
      toPrevContent,
      toggleAutoPaging,
    };
  };