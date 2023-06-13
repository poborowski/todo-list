import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
import TodoForm from './components/ToDoForm';


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

});

describe("TodoForm", () => {
  test("renders Add todo form", () => {
    const { getByPlaceholderText } = render(<TodoForm />);
    expect(getByPlaceholderText('Add a todo')).toBeInTheDocument();
  });
  test("displays correct initial values for edit", () => {
    const editValue = { id: 1, value: 'Learn React' };
    const { getByDisplayValue } = render(<TodoForm edit={editValue} />);
    const input = getByDisplayValue('Learn React');
    expect(input).toBeInTheDocument();
  });
  test("renders Update todo form", () => {
    const editValue = { id: 1, value: 'Learn React' };
    const { getByPlaceholderText } = render(<TodoForm edit={editValue} />);
    expect(getByPlaceholderText('Update your item')).toBeInTheDocument();
  });

  test("triggers onSubmit function on submit", () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<TodoForm onSubmit={onSubmit} />);
    const input = getByPlaceholderText('Add a todo');
    const addButton = getByText('Add todo');
    fireEvent.change(input, { target: { value: 'Learn testing' } });
    fireEvent.click(addButton);
    expect(onSubmit).toHaveBeenCalledWith({ id: expect.any(Number), text: 'Learn testing' });
  });
  test("renders correct input field in TodoForm based on edit mode", () => {
    const { getByPlaceholderText, rerender } = render(<TodoForm />);
    const addInput = getByPlaceholderText('Add a todo');
    expect(addInput).toBeInTheDocument();

    rerender(<TodoForm edit={{ id: 1, value: 'Learn React' }} />);
    const editInput = getByPlaceholderText('Update your item');
    expect(editInput).toBeInTheDocument();
  });
});

describe("TodoList", () => {
  test("renders TodoList component", () => {
    const { getByText } = render(<TodoList />);
    expect(getByText("What's the Plan for Today?")).toBeInTheDocument();
  });

  test("allows users to add todos", () => {
    const { getByPlaceholderText, getByText } = render(<TodoList />);
    const input = getByPlaceholderText('Add a todo');
    const addButton = getByText('Add todo');
    fireEvent.change(input, { target: { value: 'Learn testing' } });
    fireEvent.click(addButton);
    expect(getByText('Learn testing')).toBeInTheDocument();
  });
  test("displays newly added task", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoList />);
    const input = getByPlaceholderText('Add a todo');
    const addButton = getByText('Add todo');

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(addButton);

    expect(queryByText('New task')).toBeInTheDocument();
  });
});