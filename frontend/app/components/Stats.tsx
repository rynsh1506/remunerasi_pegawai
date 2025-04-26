"use client";

import dayjs from "dayjs";

interface Task {
  id: number;
  employee_name: string;
  description: string;
  hours_spent: number;
  hourly_rate: number;
  additional_charges: number;
  created_at: string;
}

interface StatsProps {
  tasks: Task[];
}

const Stats: React.FC<StatsProps> = ({ tasks }) => {
  const tasksWithTotal = tasks.map((task) => ({
    ...task,
    total_remuneration:
      task.hours_spent * task.hourly_rate + task.additional_charges,
  }));

  const totalTasks = tasks.length;
  const totalRemuneration = tasksWithTotal.reduce(
    (sum, task) => sum + task?.total_remuneration,
    0
  );

  const currentMonth = dayjs().format("YYYY-MM");
  const remunerationThisMonth = tasksWithTotal
    .filter((task) => dayjs(task.created_at).format("YYYY-MM") === currentMonth)
    .reduce((sum, task) => sum + task.total_remuneration, 0);

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">Total Tasks</div>
        <div className="stat-value text-primary">{totalTasks}</div>
        <div className="stat-desc">All tasks you've added</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Remuneration</div>
        <div className="stat-value text-secondary">${totalRemuneration}</div>
        <div className="stat-desc">Total earnings from all time</div>
      </div>

      <div className="stat">
        <div className="stat-title">This Month</div>
        <div className="stat-value">${remunerationThisMonth}</div>
        <div className="stat-desc text-secondary">Remuneration this month</div>
      </div>
    </div>
  );
};

export default Stats;
