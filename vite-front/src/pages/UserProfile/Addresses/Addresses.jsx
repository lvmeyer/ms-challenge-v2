import React from "react";
import "./Addresses.css";
import { RiAddFill } from "react-icons/ri";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AddressModal } from "../../Checkout/components/AddressModal/AddressModal";

export const Addresses = () => {



  const editButtonHandler = (add) => {
    setIsAddressModalOpen(true);
    setAddressForm(add);
    setIsEdit(true);
  };

  const addAddressHandler = () => {
    setIsAddressModalOpen(true);
  };
  return (
    <div className="address-section-container">
      <div className="add-address-btn-container">
        <button onClick={addAddressHandler}>
          <RiAddFill className="plus" />
          New Address
        </button>
      </div>
      <div className="profile-address-container">

            return (
              <div className="address-card" key="">
                <p className="name"></p>
                <p className="address">
                  <span>Address:</span>
                </p>
                <p className="phone">
                  <span>Phone: </span>
                </p>
                <div className="address-btn-container">
                  <button >
                    Edit
                  </button>
                  <button>Delete</button>
                </div>
              </div>
            );
          )
      </div>

    </div>
  );
};
