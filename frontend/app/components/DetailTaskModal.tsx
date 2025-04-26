import React from "react";

interface Task {
  employee_name: string;
  description: string;
  hours_spent: number;
  hourly_rate: number;
  additional_charges: number;
}

interface DetailTaskModalProps {
  isOpen: boolean;
  selectedTask: Task | null;
  onClose: () => void;
}

const DetailTaskModal: React.FC<DetailTaskModalProps> = ({
  isOpen,
  selectedTask,
  onClose,
}) => {
  if (!isOpen || !selectedTask) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-5xl">
          <h2 className="text-xl font-semibold">Task Details</h2>

          {/* Employee Name and Task Description */}
          <div className="mt-4">
            <h3 className="font-medium">
              Employee: {selectedTask.employee_name}
            </h3>
            <p className="text-sm text-gray-500">
              Description: {selectedTask.description}
            </p>
          </div>

          {/* Stats Card using DaisyUI */}
          <div className="stats shadow mt-6 w-full">
            {/* Hours Worked Stat */}
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2v4m0 12v4m-6-6h4m8 0h4m-5 0h-1m-2 0h-1m5 0h1m-6-2v-4a9 9 0 11-9 9h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Hours Worked</div>
              <div className="stat-value text-primary">
                {selectedTask.hours_spent} hours
              </div>
            </div>

            {/* Hourly Rate Stat */}
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2v4m0 12v4m-6-6h4m8 0h4m-5 0h-1m-2 0h-1m5 0h1m-6-2v-4a9 9 0 11-9 9h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Hourly Rate</div>
              <div className="stat-value text-secondary">
                ${selectedTask.hourly_rate}
              </div>
            </div>

            {/* Additional Charges Stat */}
            <div className="stat">
              <div className="stat-figure text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5v4l4-4-4-4v4h16v-4l-4 4 4 4V5a9 9 0 00-9-9 9 9 0 00-9 9v4z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Additional Charges</div>
              <div className="stat-value text-accent">
                ${selectedTask.additional_charges}
              </div>
            </div>

            {/* Total Remuneration Stat */}
            <div className="stat">
              <div className="stat-figure text-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v1m0 6v6m-6 0H5m6-6H7m12-3v4m-4-4h1m1 0h1m0 0v4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Remuneration</div>
              <div className="stat-value text-success">
                $
                {selectedTask.hours_spent * selectedTask.hourly_rate +
                  selectedTask.additional_charges}
              </div>
            </div>
          </div>

          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTaskModal;
