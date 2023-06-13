import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from "./components/Todo";
import TodoForm from "./components/ToDoForm";
import TodoList from "./components/TodoList";


describe("Todo", () => {
  const sampleTodos = [
    { id: 1, text: 'Learn React', isComplete: false },
    { id: 2, text: 'Learn testing', isComplete: true },
  ];

  test("renders todos correctly", () => {
    const { getByText } = render(<Todo todos={sampleTodos} />);

    expect(getByText('Learn React')).toBeInTheDocument();
    expect(getByText('Learn testing')).toBeInTheDocument();
  });

  test("triggers completeTodo function", () => {
    const completeTodo = jest.fn();
    const { getByText } = render(<Todo todos={sampleTodos} completeTodo={completeTodo} />);

    fireEvent.click(getByText('Learn React'));
    expect(completeTodo).toHaveBeenCalledWith(1);
  });

  test("triggers removeTodo function", () => {
    const removeTodo = jest.fn();
    const { getAllByRole } = render(<Todo todos={sampleTodos} removeTodo={removeTodo} />);
    const buttons = getAllByRole('button');

    fireEvent.click(buttons[0]);
    expect(removeTodo).toHaveBeenCalledWith(1);
  });
});
  describe("TodoForm", () => {
    test("renders Add todo form", () => {
      const { getByPlaceholderText } = render(<TodoForm />);
      expect(getByPlaceholderText('Add a todo')).toBeInTheDocument();
    });
  
    test("renders Update todo form", () => {
      const editValue = { id: 1, value: 'Learn React' };
      const { getByPlaceholderText } = render(<TodoForm edit={editValue} />);
      expect(getByPlaceholderText('Update your item')).toBeInTheDocument();
    });
  
    test("triggers onSubmit function on submit", () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(<TodoForm onSubmit={onSubmit} />);
  
      fireEvent.change(getByPlaceholderText('Add a todo'), { target: { value: 'Learn testing' } });
      fireEvent.click(getByText('Add todo'));
      expect(onSubmit).toHaveBeenCalled();
    });
  });
  describe("TodoList", () => {
    test("renders TodoList component", () => {
      const { getByText } = render(<TodoList />);
      expect(getByText("What's the Plan for Today?")).toBeInTheDocument();
    });
  
    test("allows users to add todos", () => {
      const { getByPlaceholderText, getByText } = render(<TodoList />);
  
      fireEvent.change(getByPlaceholderText('Add a todo'), { target: { value: 'Learn testing' } });
      fireEvent.click(getByText('Add todo'));
      expect(getByText('Learn testing')).toBeInTheDocument();
    });
  
    test("allows users to complete todos", () => {
      const { getByPlaceholderText, getByText } = render(<TodoList />);
  
      fireEvent.change(getByPlaceholderText('Add a todo'), { target: { value: 'Learn testing' } });
      fireEvent.click(getByText('Add todo'));
      fireEvent.click(getByText('Learn testing'));
      expect(getByText('Learn testing')).toHaveClass('complete');
    });
  
    test("allows users to remove todos", () => {
      const { getByPlaceholderText, getByText, queryByText } = render(<TodoList />);
  
      fireEvent.change(getByPlaceholderText('Add a todo'), { target: { value: 'Learn testing' } });
      fireEvent.click(getByText('Add todo'));
      fireEvent.click(getByText('Remove'));  // Assuming the text on your remove button is 'Remove'
      expect(queryByText('Learn testing')).toBeNull();
    });
  });

