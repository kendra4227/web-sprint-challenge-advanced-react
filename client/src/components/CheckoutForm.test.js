import React from "react";
import { render,screen,fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />);

    const header = screen.getByText(/checkout form/i);
    expect(header).toBeInTheDocument();

});

test("form shows success message on submit with form details", async () => {

    render(<CheckoutForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const addressInput = screen.getByLabelText(/address/i);
    const cityInput = screen.getByLabelText(/city/i);
    const stateInput = screen.getByLabelText(/state/i);
    const zipInput = screen.getByLabelText(/zip/i);

    fireEvent.change(firstNameInput, {target: {value: "Lakendria"}});
    fireEvent.change(lastNameInput, {target: {value: "McCullough"}});
    fireEvent.change(addressInput, {target: {value: "110 Moonlit Dr"}});
    fireEvent.change(cityInput, {target: {value: "Greenville"}});
    fireEvent.change(stateInput, {target: {value: "South Carolina"}});
    fireEvent.change(zipInput, {target: {value: 29605}});

    expect(firstNameInput).toHaveValue("Lakendria");
    expect(lastNameInput).toHaveValue("McCullough");
    expect(addressInput).toHaveValue("110 Moonlit Dr");
    expect(cityInput).toHaveValue("Greenville");
    expect(stateInput).toHaveValue("South Carolina");
    expect(zipInput).toHaveValue("29605");

    expect(lastNameInput).not.toHaveValue("Randy");
    expect(cityInput).not.toHaveValue("Johnson");
    expect(zipInput).not.toHaveValue("333333");

    const checkoutButton = screen.getByRole("button", /checkout/i);
    fireEvent.click(checkoutButton);

    const order = await screen.findByTestId("successMessage");
    expect(order).toBeTruthy();

});