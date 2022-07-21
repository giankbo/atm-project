const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label>
      <h4> {choice[Number(!isDeposit)]}</h4>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <br/>
      <input className="btn btn-outline-warning mb-3" id="submit-input" type="submit" disabled={!isValid} width="200" value="Submit"></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Total balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if(Number(event.target.value) <= 0 ) {
      return setValidTransaction(false);
    } 
    if(atmMode === 'Cash Back' && Number(event.target.value > totalState)) {
      setValidTransaction(false);
    }else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value))
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if(event.target.value === 'Deposit') {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  }

  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <h4 id="total">{status}</h4>
      <label className="form-label">Please select an action</label>
      <br/>
      <select className="dropdown" onChange={(event) => handleModeSelect(event)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>        
      </select>
      <hr/>
      {atmMode && (
        <ATMDeposit 
          onChange={handleChange} 
          isDeposit={isDeposit}
          isValid={validTransaction}
        ></ATMDeposit>
      )}
    </form>
  );
};
// ========================================
ReactDOM.render(
  <Account />, 
  document.getElementById("root")
);
