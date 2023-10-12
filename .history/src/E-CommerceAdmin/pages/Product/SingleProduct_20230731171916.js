/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const SingleProduct = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
  
    const BaseUrl = "https://krish-vapes-backend.vercel.app/";

  
    const getOrder = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}api/v1/Product/${id}`
        );
        setData(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      getOrder();
    }, []);
  
    const getImageLink = (item) => {
      if (item?.productId?.colorActive === true) {
        return item?.productColorId?.img;
      } else {
        return item?.productId?.img;
      }
    };
    function ValueChecker(holder, string) {
      return holder ? (
        <Form.Group className="mb-3">
          <Form.Label> {string} </Form.Label>
          <Form.Control placeholder={holder} disabled />
        </Form.Group>
      ) : (
        ""
      );
    }
  
    return (
      <section>
        <p className="headP">Dashboard / Order</p>
        <section className="sectionCont">
          <Form>
            <img src={getImageLink(data)} alt="" className="centerImage" />
            {ValueChecker(data?.name ,  "Product Name")}
            {ValueChecker(data?.description, "Address")}
            {ValueChecker(data?.address?.addressComplement, "Address Compliment")}
            {ValueChecker(data?.address?.city, "City")}
            {ValueChecker(data?.address?.pincode, "Pincode")}
            {ValueChecker(data?.address?.country, "Country")}
            {ValueChecker(data?.address?.phone, "Phone Number")}
            {ValueChecker(data?.orderId, "OrderId")}
            {ValueChecker(data?.userId?.fullName, "Full Name")}
            {ValueChecker(data?.userId?.email, "Email Address")}
            {ValueChecker(data?.productId?.name, "Product Name")}
            {ValueChecker(data?.productPrice, "Product Price")}
            {ValueChecker(data?.quantity, "Quantity")}
            {ValueChecker(data?.total, "Total Price")}
            {ValueChecker(data?.orderStatus, "Order Status")}
            {ValueChecker(data?.paymentStatus, "Payment Status")}
            <Link to="/Orders">
              <Button variant="dark">Back</Button>
            </Link>
          </Form>
        </section>
      </section>
    );
  };

export default HOC(SingleProduct);
