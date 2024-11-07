import { createSlice } from "@reduxjs/toolkit";


const deliverySlice = createSlice ({
    name: "delivery",
    initialState: {
        getallDelivery: {
            allDelivery: [],
            isFetching: false,
            error: false
        },
        updateDeliveryStatus: {
            updateDeliveryStatus: [],
            isFetching: false,
            error: false
        }
    },

    reducers: {
        getallDeliveryStart: (state) => {
            state.getallDelivery.isFetching = true
        },
        getallDeliverySuccess: (state, action) => {
            state.getallDelivery.isFetching = false,
            state.getallDelivery.allDelivery = action.payload
        },
        getallDeliveryFailed: (state) => {
            state.getallDelivery.isFetching = false,
            state.getallDelivery.error = true
        },
        updateDeliveryStatusStart: (state) => {
            state.updateDeliveryStatus.isFetching = true;
          },
          updateDeliveryStatusSuccess: (state, action) => {
            state.updateDeliveryStatus.isFetching = false;
            state.updateDeliveryStatus.updateDeliveryStatus = state.updateDeliveryStatus.updateDeliveryStatus.map(
              (delivery) => (delivery.id === action.payload.id ? action.payload : delivery)
            );
          },
        updateDeliveryStatusFailed: (state) => {
            state.updateDeliveryStatus.isFetching = false;
            state.updateDeliveryStatus.error = true;
          },
    }
})

export const {
    getallDeliveryStart,
    getallDeliverySuccess,
    getallDeliveryFailed,
    updateDeliveryStatusStart,
    updateDeliveryStatusSuccess,
    updateDeliveryStatusFailed
} = deliverySlice.actions

export default deliverySlice.reducer