"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  description?: string;
  hoursWorked?: number;
  hourlyRate?: number;
  additionalCharges?: number;
  onSave: (taskData: {
    description: string;
    hoursWorked: number;
    hourlyRate: number;
    additionalCharges: number;
  }) => void;
  isEditing: boolean;
};

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  description = "",
  hoursWorked = 0,
  hourlyRate = 0,
  additionalCharges = 0,
  onSave,
  isEditing,
}) => {
  const [desc, setDescription] = useState(description);
  const [hours, setHours] = useState(hoursWorked);
  const [rate, setRate] = useState(hourlyRate);
  const [charges, setCharges] = useState(additionalCharges);

  // Reset fields when modal is closed or when it's in add mode
  useEffect(() => {
    if (!isOpen) {
      setDescription("");
      setHours(0);
      setRate(0);
      setCharges(0);
    } else if (isOpen && isEditing) {
      setDescription(description);
      setHours(hoursWorked);
      setRate(hourlyRate);
      setCharges(additionalCharges);
    }
  }, [
    isOpen,
    isEditing,
    description,
    hoursWorked,
    hourlyRate,
    additionalCharges,
  ]);

  // Function to handle changes and prevent negative or invalid inputs
  const handleNumberChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: string
  ) => {
    // Remove any non-numeric characters except for the decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");
    const parsedValue = parseFloat(numericValue);

    // If the parsed value is NaN or less than 0, default to 0
    if (isNaN(parsedValue) || parsedValue < 0) {
      setter(0);
    } else {
      setter(parsedValue);
    }
  };

  // Function to check if all fields are valid numbers
  const isValid = () => {
    return (
      !isNaN(hours) &&
      !isNaN(rate) &&
      !isNaN(charges) &&
      hours >= 0 &&
      rate >= 0 &&
      charges >= 0
    );
  };

  const handleSave = () => {
    if (isValid()) {
      onSave({
        description: desc,
        hoursWorked: hours,
        hourlyRate: rate,
        additionalCharges: charges,
      });
      onClose(); // Close the modal after saving
    }
  };

  return isOpen ? (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-xl font-semibold">
            {isEditing ? "Edit Task" : "Add Task"}
          </h2>

          <label
            className="block text-sm font-medium text-gray-700 mt-4"
            htmlFor="description"
          >
            Task Description
          </label>
          <input
            id="description"
            className="input w-full mt-2"
            placeholder="Task Description"
            value={desc}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Hours Worked Field */}
          <label
            className="block text-sm font-medium text-gray-700 mt-4"
            htmlFor="hours"
          >
            Hours Worked
          </label>
          <input
            id="hours"
            type="text" // Use text to capture user input before validation
            className="input w-full mt-2"
            placeholder="Hours Worked"
            value={hours === 0 ? "" : hours} // Display empty string when value is 0
            onChange={(e) => handleNumberChange(setHours, e.target.value)}
          />

          {/* Hourly Rate Field */}
          <label
            className="block text-sm font-medium text-gray-700 mt-4"
            htmlFor="rate"
          >
            Hourly Rate ($)
          </label>
          <input
            id="rate"
            type="text" // Use text to capture user input before validation
            className="input w-full mt-2"
            placeholder="Hourly Rate"
            value={rate === 0 ? "" : rate} // Display empty string when value is 0
            onChange={(e) => handleNumberChange(setRate, e.target.value)}
          />

          {/* Additional Charges Field */}
          <label
            className="block text-sm font-medium text-gray-700 mt-4"
            htmlFor="charges"
          >
            Additional Charges ($)
          </label>
          <input
            id="charges"
            type="text" // Use text to capture user input before validation
            className="input w-full mt-2"
            placeholder="Additional Charges"
            value={charges === 0 ? "" : charges} // Display empty string when value is 0
            onChange={(e) => handleNumberChange(setCharges, e.target.value)}
          />

          <div className="modal-action">
            <button
              className="btn"
              onClick={handleSave}
              disabled={!isValid()} // Disable Save button if any field is invalid
            >
              Save
            </button>
            <button className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  ) : null;
};

export default TaskModal;
