import React, { useState } from 'react';

const VestingForm = ({ createVestingSchedule }) => {
  const [beneficiary, setBeneficiary] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [startTime, setStartTime] = useState('');
  const [cliffDuration, setCliffDuration] = useState('');
  const [vestingDuration, setVestingDuration] = useState('');

  const handleCreateVesting = () => {
    createVestingSchedule(beneficiary, totalAmount, startTime, cliffDuration, vestingDuration);
  };

  return (
    <div>
      <h2>Create Vesting Schedule</h2>
      <label>Beneficiary:</label>
      <input type="text" value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)} />
      {/* Repeat the above pattern for other input fields */}
      <button onClick={handleCreateVesting}>Create</button>
    </div>
  );
};

export default VestingForm;
