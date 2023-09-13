// importing createSlice from reduxjs/toolkit to create a slice
import { createSlice } from "@reduxjs/toolkit";

export const bankSlice = createSlice({
  // name of the slice
  name: "bank",

  // initializing state
  initialState: {
    balance: 0,
  },

  reducers: {
    /**
     *  updating balance with the new deposited amount
     * @param {object} state
     * @param {object} action
     */
    deposit: (state, action) => {
      state.balance += action.payload;
    },

    /**
     *  updating balance after the withdrawed amount
     * @param {object} state
     * @param {object} action
     */
    withdraw: (state, action) => {
      state.balance -= action.payload;
    },
    /**
     * calculating the 5% interest which will be added to the balance
     * @param {object} state
     */
    addInterest: (state) => {
      const interest = state.balance * 0.05;
      // calculating the interest earned
      const interestEarned = state.balance + interest;

      // adding the interest earned to the current balance
      state.balance = interestEarned;
    },
    /**
     * calculating the 15% charges which will be added from the balance
     * @param {object} state
     */

    charges: (state) => {
      const chargesDeducted = state.balance * 0.15;
      const deductedMoney = state.balance - chargesDeducted;
      // initializing the balnce to zero
      let balance = 0;

      // checking if the deducted amount (also rounding it off to 2 decimal places) is not equal to zero
      // thus updating the balance with the deducted amount
      if (Number(deductedMoney.toFixed(2)) !== 0) {
        balance = deductedMoney;
      }

      // updating the state with the current balance
      state.balance = balance;
    },
  },
});

// exporting the deposit, withdraw, addInterest and charges actions
export const { deposit, withdraw, addInterest, charges } = bankSlice.actions;

export default bankSlice.reducer;
