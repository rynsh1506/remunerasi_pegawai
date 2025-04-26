"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { useTaskStore } from "@/app/store/useTaskStore";
import { useAuthStore } from "@/app/store/useAuthStore";
import Stats from "@/app/components/Stats";
import dayjs from "dayjs";
import TaskModal from "@/app/components/TaskModal";
import DetailTaskModal from "@/app/components/DetailTaskModal"; // Import the detail modal component

const MyTasksPage = () => {
  const { tasks, isLoading, fetchTasks, addTask, updateTask, deleteTask } =
    useTaskStore();
  const { authUser } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State for detail modal
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [hoursSpent, setHoursSpent] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);

  useEffect(() => {
    if (authUser) {
      fetchTasks(authUser.id);
    }
  }, [authUser, fetchTasks]);

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = safeTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(safeTasks.length / tasksPerPage);

  const handleAddTask = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setSelectedTask(null);
    setTaskDescription("");
    setHoursSpent(0);
    setHourlyRate(0);
    setAdditionalCharges(0);
  };

  const handleEdit = (task: any) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setSelectedTask(task);
    setTaskDescription(task.description);
    setHoursSpent(task.hours_spent);
    setHourlyRate(task.hourly_rate);
    setAdditionalCharges(task.additional_charges);
  };

  const handleViewDetails = (task: any) => {
    setIsDetailModalOpen(true);
    setSelectedTask(task); // Store selected task for detail modal
  };

  const handleSaveTask = async (taskData: {
    description: string;
    hoursWorked: number;
    hourlyRate: number;
    additionalCharges: number;
  }) => {
    const payload = {
      description: taskData.description,
      hours_spent: taskData.hoursWorked,
      hourly_rate: taskData.hourlyRate,
      additional_charges: taskData.additionalCharges,
    };

    try {
      if (isEditing) {
        // If editing, update the task
        await updateTask(selectedTask.id, payload);
      } else {
        // If adding, create a new task
        await addTask(payload);
      }
      setIsModalOpen(false);
      resetModalState(); // Reset modal state after save
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const resetModalState = () => {
    setTaskDescription("");
    setHoursSpent(0);
    setHourlyRate(0);
    setAdditionalCharges(0);
    setIsEditing(false);
    setSelectedTask(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button className="btn btn-primary" onClick={handleAddTask}>
          <Plus className="w-4 h-4 mr-1" /> Add Task
        </button>
      </div>

      <Stats tasks={safeTasks} />

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-6">Loading tasks...</div>
        ) : safeTasks.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No tasks available.
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Name</th>
                <th>Task Description</th>
                <th>Hours Spent</th>
                <th>Hourly Rate</th>
                <th>Additional Charges</th>
                <th>Recorded At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task, index) => (
                <tr key={task?.id}>
                  <td>{indexOfFirstTask + index + 1}</td>
                  <td>{task.employee_name}</td>
                  <td>{task.description}</td>
                  <td>{task.hours_spent}</td>
                  <td>${task.hourly_rate}</td>
                  <td>${task.additional_charges}</td>
                  <td>{dayjs(task.created_at).format("DD MMM YYYY HH:mm")}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => handleEdit(task)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-error"
                        onClick={() => handleDelete(task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => handleViewDetails(task)} // Open detail modal
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {safeTasks.length > 0 && (
        <div className="join mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`join-item btn ${
                currentPage === i + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        description={taskDescription}
        hoursWorked={hoursSpent}
        hourlyRate={hourlyRate}
        additionalCharges={additionalCharges}
        onSave={handleSaveTask}
        isEditing={isEditing}
      />

      {/* Integrate the DetailTaskModal here */}
      <DetailTaskModal
        isOpen={isDetailModalOpen}
        selectedTask={selectedTask}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};

export default MyTasksPage;
