import {render, screen,fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import Counter from "./Counter";


describe ('Counter', () => {
    test('Counter Element should be present', () => {
        render(<Counter />)
        const incrementButton = screen.getByText(/increment/i);
        const decrementButton = screen.getByText(/decrement/i);
        const counterLabel = screen.getByText(/Counter/i);
        const counterText = screen.getByTestId('counter-value');

        expect(incrementButton).toBeInTheDocument();
        expect(incrementButton).toBeEnabled();
        expect(decrementButton).toBeInTheDocument();
        expect(decrementButton).toBeEnabled();
        expect(counterLabel).toBeInTheDocument();
        expect(counterText).toHaveTextContent('0');
    })
    test('Increment increases value by 1 and enables decrement button press', () => {
        render(<Counter />)
        const incrementButton = screen.getByText(/increment/i);
        const counterText = screen.getByTestId('counter-value');
        const decrementButton = screen.getByText(/decrement/i);
        
        expect(counterText).toHaveTextContent('0')
        userEvent.click(incrementButton)
        render(<Counter />)
        expect(counterText).toHaveTextContent('1')
        expect(decrementButton).not.toBeDisabled()
        
        userEvent.click(decrementButton)
        expect(decrementButton).not.toBeDisabled()
        
    })
})

describe('App Item List', () => {
    test('List Form Components render', () => {
        render(<Counter />)
        const listItemInput = screen.getByLabelText(/Create List Item/i);
        const addItemButton = screen.getByTestId("add-item");

        expect(listItemInput).toBeInTheDocument();
        expect(addItemButton).toBeInTheDocument()
    })
    test('User can add Item to page', () => {
        render(<Counter />)
        const listItemInput = screen.getByLabelText(/Create List Item/i);
        const addItemButton = screen.getByTestId("add-item");

        expect(listItemInput).toHaveValue("")
        userEvent.type(listItemInput, "hello")
        render(<Counter />)
        expect(addItemButton).toHaveValue("hello")

        userEvent.click(addItemButton)
        const newItem = screen.getByText("hello0")
        expect(newItem).toBeInTheDocument()
        expect(listItemInput).toHaveValue("")

        const removeButton = screen.getByTestId('remove-item01')
        userEvent.click(removeButton)
        expect(newItem).not.toBeInTheDocument()
    })
})