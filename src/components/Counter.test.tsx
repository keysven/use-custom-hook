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
    test('Decrement decreases value by 1 and enables decrement button press', () => {
        render(<Counter />)
        const incrementButton = screen.getByText(/increment/i);
        const counterText = screen.getByTestId('counter-value');
        const decrementButton = screen.getByText(/decrement/i);

        expect(counterText).toHaveTextContent('0');
        userEvent.click(incrementButton);
        expect(counterText).toHaveTextContent('1');
    })
})