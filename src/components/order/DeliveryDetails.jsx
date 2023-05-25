import React, { useContext, useState } from "react";
import { GrLocationPin, GrLocation } from "react-icons/gr";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { getValue } from "../logics/logics"

const DeliveryDetails = ({ selectedOrder }) => {
  const [value, setValue] = useState("1");
  return (
    <div>
      <div className="flex flex-col items-center">
        <div>
          <div class="p-6">
            <div className="flex  gap-2 mb-3">
              <GrLocationPin size={36} />
              <div>
                <h1 className="title-font text-lg font-semibold text-gray-900">
                  {selectedOrder?.storeId.storeName}
                </h1>
                <p class="leading-relaxed">
                  {selectedOrder?.storeId.storeAddress}
                </p>
                <small>Landmark : {selectedOrder?.storeId.landmark}</small>
              </div>
            </div>
          </div>
        </div>
        <img
          className="w-12 h-20 sm:mr-56 mr-5"
          src="https://res.cloudinary.com/amritrajmaurya/image/upload/v1684599072/downarrow_oh3xdx.png"
          alt=""
        />
        <div>
          <div class="p-6">
            <div className="flex  gap-2 mb-3">
              <GrLocation size={40} className="mb-2" />
              <div>
                <h1 className="title-font text-lg font-semibold text-gray-900">
                  {selectedOrder?.customerId.name}
                </h1>
                <p class="leading-relaxed">
                  {selectedOrder?.toAddress.address + " " + selectedOrder?.toAddress.place}
                </p>
                <small>Landmark : {selectedOrder?.toAddress.landmark}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* status handling  */}

      <div className="sm:mx-5 border-t-2">
        <h3 className="text-xl font-semibold mb-4 mt-8">Current Order Status</h3>
        <RadioGroup value={getValue(selectedOrder?.orderStatus)}>
          <Stack>
            <Radio size="md" name="1" value="1" colorScheme="green">
              <span >Accepted</span>
            </Radio>
            <Radio size="md" name="2" value="2" colorScheme="green">
              <span >Processing</span>
            </Radio>
            <Radio size="md" name="3" value="3" colorScheme="green">
              <span >Out for Delivery</span>
            </Radio>
            <Radio size="md" name="4" value="4" colorScheme="green">
              <span >Delivered</span>
            </Radio>
          </Stack>
        </RadioGroup>
      </div>
    </div>
  );
};

export default DeliveryDetails;