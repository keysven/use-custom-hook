import React, { FC } from "react";
import { CSSProperties } from "react";
import { Button } from "antd";
import {usePagingState} from "../hooks/usePagingState";
import {BookData} from "../Data/BookData";
import { Counter } from "./Counter";



const Page: FC = () => {
  const data: BookData = {
    pages: [
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/degital-book-demo.appspot.com/o/livingroom.jpg?alt=media&token=8b2c128b-27d4-4942-80df-5b31f24aaf6f",
        contents: [
          {
            type: "LINE",
            value: {
              text: "This project made by Michelle",
              position: {
                x: 100,
                y: 300,
              },
            },
            duration: 1500,
          },
        ],
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/degital-book-demo.appspot.com/o/livingroom10.jpg?alt=media&token=33f4818c-664e-4077-bd27-221daae03bd8",
        contents: [
          {
            type: "LINE",
            value: {
              text: "Michelle from Singapore",
              position: {
                x: 100,
                y: 300,
              },
            },
            duration: 1500,
          },
        ],
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/degital-book-demo.appspot.com/o/livingroom11.jpg?alt=media&token=d26b41fd-87cd-417a-a39e-fe1b81b35322",
        contents: [
          {
            type: "LINE",
            value: {
              text: "He is a talented frontend developer with 6 years of experience",
              position: {
                x: 100,
                y: 300,
              },
            },
            duration: 1500,
          },
        ],
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/degital-book-demo.appspot.com/o/livingroom13.jpg?alt=media&token=cabae668-222d-48f8-8adf-a8050e301c91",
        contents: [
          {
            type: "LINE",
            value: {
              text: "His main framework is React, Next.js and Vue.js",
              position: {
                x: 100,
                y: 300,
              },
            },
            duration: 1500,
          },
        ],
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/degital-book-demo.appspot.com/o/livingroom2.jpg?alt=media&token=ab25d3d1-3f87-4deb-89bf-96334659eee",
        contents: [
          {
            type: "LINE",
            value: {
              text: "He is 30 years old and he graduate from SiT",
              position: {
                x: 100,
                y: 300,
              },
            },
            duration: 1500,
          },
        ],
      },
    ],
  };

  const {
    pageCursor,
    contentCursor,
    autoPaging,
    toNextPage,
    toPrevPage,
    toggleAutoPaging,
  } = usePagingState(data);

  const currentPage = data.pages[pageCursor];
  const currentContent = currentPage.contents[contentCursor];

  const renderContent = () => {
    if (currentContent.type === "LINE" && currentContent.value) {
      const { text, position } = currentContent.value;
      const style: CSSProperties = {
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      };

      return (
        <div style={style} className="text-[25px] text-blue-900">
          {text}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="flex justify-center pt-28 ">
        <div className="w-[860px] h-[530px] relative">
          <img
            src={currentPage.imageUrl}
            alt={`Page ${pageCursor}`}
            className="w-[860px] h-[530px] "
          />
          {renderContent()}
        </div>
      </div>
      <div className="pt-8">
        <Button onClick={toPrevPage}>Previous Page</Button>
        <Button onClick={toNextPage}>Next Page</Button>
        <Button onClick={toggleAutoPaging}>
          {autoPaging ? "Stop Auto Paging" : "Start Auto Paging"}
        </Button>
      </div>
      <Counter />
    </div>
  );
};

export default Page;
