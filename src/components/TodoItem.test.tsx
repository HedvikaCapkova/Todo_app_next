import { TodoItem } from '@/components/TodoItem';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe("TodoItem", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test("should not render without title", () => {
        render(<TodoItem {...defaultProps} title=''/>);
        const listItem = screen.queryByRole("listitem");

        expect(listItem).not.toBeInTheDocument();
    })
    test("should render with default props", () => {
        render(<TodoItem {...defaultProps}/>);
        const listItem = screen.getByRole("listitem")
        const checkbox = screen.getByRole("checkbox", {name: "testTodo"})
        const label = screen.getByLabelText("testTodo")

        expect(listItem).toBeVisible();
        expect(checkbox).toBeVisible();
        expect(checkbox).not.toBeChecked();
        expect(label).toBeVisible();
       
    });

    test("should call toggleTodo function when checkbox is clicked", async () => {
         render(<TodoItem {...defaultProps} complete/>);
         const checkbox = screen.getByRole("checkbox", {name: "testTodo"});

         expect(checkbox).toBeChecked();
         await userEvent.click(checkbox);
         expect(checkbox).not.toBeChecked();
         expect(mockToggleTodo).toHaveBeenCalledTimes(1);
         await userEvent.click(checkbox);
         expect(checkbox).toBeChecked();
         expect(mockToggleTodo).toHaveBeenCalledTimes(2);
    })

    // test("test with container", () => {
    //     const { container } = render(<TodoItem {...defaultProps}/>);
    //     const listItem = container.querySelector("li");
    //     console.debug(container.innerHTML)

    //     expect(listItem).toBeInTheDocument();
    // })
})

const mockToggleTodo = jest.fn();

const defaultProps = {
    id: '1',
    title: 'testTodo',
    complete: false,
    toggleTodo: mockToggleTodo,
};


