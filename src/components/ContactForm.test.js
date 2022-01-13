import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const h1El = screen.getByRole("heading");
  const h1ElText = screen.getByText(/Contact Form/i);
  expect(h1El).toBeInTheDocument();
  expect(h1ElText).toBeTruthy();
  expect(h1ElText).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const input = "Glen";
  const firstName = screen.getByLabelText(/First Name/i);
  userEvent.type(firstName, input);
  const err = screen.getByTestId("error");
  expect(err).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  const errs = screen.getAllByTestId("error");
  expect(errs.length).toBeLessThanOrEqual(3);
  expect(errs.length).toBeGreaterThanOrEqual(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameInput = "Brett";
  const lastNameInput = "Smith";
  const firstName = screen.getByLabelText(/First Name/i);
  const lastName = screen.getByLabelText(/Last Name/i);
  const button = screen.getByRole("button");
  userEvent.type(firstName, firstNameInput);
  userEvent.type(lastName, lastNameInput);
  userEvent.click(button);

  const errs = screen.getAllByTestId("error");
  expect(errs.length).toBeLessThanOrEqual(1);
  expect(errs.length).toBeGreaterThanOrEqual(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = "test@test";
  const email = screen.getByLabelText(/Email/i);
  userEvent.type(email, emailInput);

  const errMessage = screen.getByText(/email must be a valid email address/i);
  expect(errMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const firstNameInput = "Brett";
  const emailInput = "brett@brett.com";
  const firstName = screen.getByLabelText(/First Name/i);
  const email = screen.getByLabelText(/Email/i);
  userEvent.type(firstName, firstNameInput);
  userEvent.type(email, emailInput);
  const button = screen.getByRole("button");
  userEvent.click(button);

  const errMessage = screen.getByText(/lastName is a required field/i);
  expect(errMessage).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = "Brett";
  const lastNameInput = "Smith";
  const emailInput = "brett@brett.com";
  const firstName = screen.getByLabelText(/First Name/i);
  const lastName = screen.getByLabelText(/Last Name/i);
  const email = screen.getByLabelText(/Email/i);
  const button = screen.getByRole("button");
  userEvent.type(firstName, firstNameInput);
  userEvent.type(lastName, lastNameInput);
  userEvent.type(email, emailInput);
  userEvent.click(button);

  const errs = screen.queryAllByTestId("error");
  expect(errs.length).toBeLessThanOrEqual(0);
  expect(errs.length).toBeGreaterThanOrEqual(0);

  const firstNameOutput = screen.getByTestId("firstnameDisplay");
  const lastNameOutput = screen.getByTestId("lastnameDisplay");
  const emailOutput = screen.getByTestId("emailDisplay");
  expect(firstNameOutput).toBeInTheDocument();
  expect(lastNameOutput).toBeInTheDocument();
  expect(emailOutput).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = "Brett";
  const lastNameInput = "Smith";
  const emailInput = "brett@brett.com";
  const messageInput = "This is a test message";
  const firstName = screen.getByLabelText(/First Name/i);
  const lastName = screen.getByLabelText(/Last Name/i);
  const email = screen.getByLabelText(/Email/i);
  const message = screen.getByLabelText(/Message/i);
  const button = screen.getByRole("button");
  userEvent.type(firstName, firstNameInput);
  userEvent.type(lastName, lastNameInput);
  userEvent.type(email, emailInput);
  userEvent.type(message, messageInput);
  userEvent.click(button);

  const errs = screen.queryAllByTestId("error");
  expect(errs.length).toBeLessThanOrEqual(0);
  expect(errs.length).toBeGreaterThanOrEqual(0);

  const firstNameOutput = screen.getByTestId("firstnameDisplay");
  const lastNameOutput = screen.getByTestId("lastnameDisplay");
  const emailOutput = screen.getByTestId("emailDisplay");
  const messageOutput = screen.getByTestId("messageDisplay");
  expect(firstNameOutput).toBeInTheDocument();
  expect(lastNameOutput).toBeInTheDocument();
  expect(emailOutput).toBeInTheDocument();
  expect(messageOutput).toBeInTheDocument();
});
