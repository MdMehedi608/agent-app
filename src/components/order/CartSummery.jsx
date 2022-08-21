import React from "react";
import { Table } from "react-bootstrap";

const CartSummery = ({ subTotal, total, grandTotal }) => {
  return (
    <>
      <p>
        <strong>Checkout Summary</strong>
      </p>

      <Table>
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>{subTotal}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>
              <strong>Total Payable</strong>
            </td>
            <td>
              <strong>{grandTotal}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CartSummery;
