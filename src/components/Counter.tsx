import React, { useState } from "react";
import { Button, Input } from "antd";


interface ListItems {
    text: string;
    id: number;
}
export const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [listItems, setListItems] = useState<ListItems[]>([]);
  const [newItemText, setNewItemText] = useState("");

  const handleCounterClick = (value: number) => {
    setCounter((counter) => counter + value);
  };
  const handleAddItem = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setListItems([...listItems, {
        text: newItemText, id: newItemText.length
    }]);
    setNewItemText('');
  }

  const handleNewItemChange = (e:any) => {
    setNewItemText(e.target.value);
  }

  const handleRemoveItem = (id:any) => {
    const newListItems = listItems.filter(item => item.id !== id)
    setListItems(newListItems);
  }

  const listItemComponents = listItems.map(item => {
    return (
        <li
        data-testid={`item${item.id}`}
        key={item.id}>
            {item.text}
            <Button data-testid={`remove-item${item.id}`}
            onClick={() => handleRemoveItem(item.id)}
            >Remove</Button>
        </li>
    )
  })
  return (
    <div>
      <div className="text-[30px] text-blue-950" ><span data-testId = {'counter-value'}>Counter: {counter}</span></div>
      <div className="flex flex-row justify-center">
        <Button
        
          onClick={() => {
            handleCounterClick(1);
          }}
        >
          increment
        </Button>
        <Button
          onClick={() => {
            handleCounterClick(-1);
          }}
          disabled={counter <= 0}
        >
          decrement
        </Button>
      </div>
      <form onSubmit={handleAddItem}>
        <label
        htmlFor="newItem"
        >
            Create List Item
            <Input
             id = 'newItem'
             value={newItemText}
             onChange={handleNewItemChange}
            />
        </label>
        <Input
            data-testid="add-item"
            type="submit"
            value="Add Item"
          />
      </form>
      <div>
        {listItemComponents}
      </div>
    </div>
  );
};

export default Counter;
