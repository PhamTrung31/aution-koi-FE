import { createSlice } from "@reduxjs/toolkit";


const dashboardSlice = createSlice ({
    name: "dashboard",
    initialState: {
        getStatCard: {
            statCard: [],
            isFetching: false,
            error: false
        },
        getBoardChart: {
            boardChart: [],
            isFetching: false,
            error: false
        }
    },

    reducers: {
        getStatCardStart: (state) => {
            state.getStatCard.isFetching = true
        },
        getStatCardSuccess: (state, action) => {
            state.getStatCard.isFetching = false,
            state.getStatCard.statCard = action.payload
        },
        getStatCardFailed: (state) => {
            state.getStatCard.isFetching = false,
            state.getStatCard.error = true
        },
        getBoardChartStart: (state) => {
            state.getBoardChart.isFetching = true;
          },
          getBoardChartSuccess: (state, action) => {
            state.getBoardChart.isFetching = false;
            state.getBoardChart.boardChart = action.payload
          },
        getBoardChartFailed: (state) => {
            state.getBoardChart.isFetching = false;
            state.getBoardChart.error = true;
          },
    }
})

export const {
    getStatCardStart,
    getStatCardSuccess,
    getStatCardFailed,
    getBoardChartStart,
    getBoardChartSuccess,
    getBoardChartFailed
} = dashboardSlice.actions

export default dashboardSlice.reducer