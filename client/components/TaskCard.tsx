"use client";

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 12,
        marginBottom: 10,
      }}
    >
      <h3
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </h3>

      {task.description && <p>{task.description}</p>}

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Mark Pending" : "Mark Done"}
        </button>

        <button onClick={() => onEdit(task)}>Edit</button>

        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
