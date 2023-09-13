import "./App.css";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { deposit, withdraw, addInterest, charges } from "./store/bank";
import { useState, useRef, useEffect } from "react";

// Creating an app that manipulates a cash balance on an account using Redux

function App() {
  // initializing the state
  const [inputValue, setInputValue] = useState("");

  // selecting the state
  const balance = useSelector((state) => state.bank.balance);

  // assigning useDispatch hook to a variable to dispatch an action
  const dispatch = useDispatch();

  // assigning the useRef to a variable to autofocus on the input and after every button click
  const inputRef = useRef();

  /**
   * auto-focusing the input field on component Mount
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  /**s
   * storing value that is typed by the user
   * @param {object} event
   *
   */
  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  /**
   * Depositing/adding the amount typed by the user to the current balance
   */
  const onDeposit = () => {
    // dispatching the deposit reducer on deposit and converting the input field to a float
    dispatch(deposit(parseFloat(inputValue)));

    // resetting inputValue to empty an string after deposit
    setInputValue("");

    // focusing the input field after deposit
    inputRef.current.focus();
  };

  /**
   * Withdrawing the amount typed by the user from the current balance
   */
  const onWithdraw = () => {
    // checking if the inputValue is greater than the available balance,if it is,
    // thus alert the user that they have insufficient funds
    // otherwise allow the user to withdraw the desired amount
    // using the parseFloat function to convert the inputValue from a string to a float
    if (parseFloat(inputValue) > balance) {
      alert("You have insufficient funds");
    } else {
      dispatch(withdraw(parseFloat(inputValue)));

      // resetting inputValue to empty an string after deposit
      setInputValue("");
    }

    // focusing the input field after withdrawal
    inputRef.current.focus();
  };

  /**
   *  dispatching the addInterest reducer upon adding interest on the current balance
   */
  const onAddInterest = () => {
    dispatch(addInterest());

    // focusing the input field after adding interest
    inputRef.current.focus();
  };

  /**
   * dispatching the addInterest reducer onCharges to add charges on the current balance
   */
  const onCharges = () => {
    dispatch(charges());

    // focusing the input field after adding charges
    inputRef.current.focus();
  };
  return (
    <Container className="app-container py-5">
      <div className="input-info">
        {/* displaying the current balance of the user */}
        {/* converting the balance to a number and rounding it off to 2 decimal places */}
        <label>Current balance: {Number(balance.toFixed(2))}</label>
        <input
          type="number"
          value={inputValue}
          onChange={onChange}
          ref={inputRef}
        />
      </div>

      {/* withdraw, deposit, add interest and charges' buttons */}
      <div className="btns mb-4">
        {" "}
        <Button className="button" onClick={onWithdraw}>
          Withdraw
        </Button>
        <Button className="button" onClick={onDeposit}>
          Deposit
        </Button>
        <Button className="button" onClick={onAddInterest}>
          Add interest
        </Button>
        <Button className="button" onClick={onCharges}>
          Charges
        </Button>
      </div>
    </Container>
  );
}

export default App;
