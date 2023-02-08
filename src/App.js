import "./App.css";
import { useState } from "react";
import { validateEmail } from "../src/utils";
import { RadioGroup, RadioOption } from "./Radio";

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");
  const [score, setScore] = useState("10");
  const [comment, setComment] = useState("");
  const [selected, setSelected] = useState("");

  const getIsFormValid = () => {
    return (
      firstName &&
      validateEmail(email) &&
      password.value.length >= 8 &&
      role !== "role" &&
      score &&
      comment
    );
  };
  const ErrorMessage = () => {
    return Number(score) <= 5 && comment.length <= 10 ? (
      <p className="FieldError">
        Please provide a comment explaining why the experience was poor.
      </p>
    ) : null;
  };
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setRole("role");
    setScore("10");
    setComment("");
  };
  // eslint-disable-next-line no-lone-blocks
  {
    /* To prevent the default behavior of the form when clicking on the submit button, you have to call preventDefault on the event object, right in your submit handler function. */
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account created!");
    clearForm();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First name"
            />
            {/*assign each state piece to the value prop from each input element. To be able to account for state updates, each input should also define the onChange prop and call the state setter with the value property from the event target as parameter.*/}
          </div>
          <div className="Field">
            <label>Last name</label>
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last name"
            />
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
            />
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            {/*The password input is a special case that has an object as state instead of a string. As a result, the state setter should spread the previous values so they don’t get overridden. Finally, to make sure the password characters are obscured, you need to use the type “password” for the input. */}
            <input
              value={password.value}
              type="password"
              onChange={(e) => {
                setPassword({ ...password, value: e.target.value });
              }}
              onBlur={() => {
                setPassword({ ...password, isTouched: true });
              }}
              placeholder="Password"
            />

            {password.isTouched && password.value.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
            {/*The isTouched property on the password state was defined to determine when the input was touched at least once. In order to listen for interactions, form inputs have two additional events you can subscribe to: onFocus and onBlur. In this scenario, you need to use the onBlur event, which is called whenever the input loses focus, so that guarantees the user has interacted with the password input at least once. In that event, you should set the isTouched property to true with the password state setter. Then, the condition to display the error message relies on that value being true and a check on the password length to see if it’s less than 8 characters long. If the condition is true, the component PasswordErrorMessage should be rendered. onBlur fires when the user leaves the focus from a particular input and it’s the best place to set the interaction state to true and provide actionable feedback in the UI if needed.  */}
          </div>
          <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div className="Field">
            <label>Score: {score} ⭐️</label>
            <input
              type="range"
              min="0"
              max="10"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
            <ErrorMessage />
          </div>
          <div className="Field">
            <label>Comment</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>{" "}
        </fieldset>
      </form>
    </div>
  );
}

export default App;
