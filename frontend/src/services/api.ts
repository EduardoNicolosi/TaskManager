export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

export interface TaskCreate {
  title: string;
  description?: string;
}

const API_BASE_URL = "http://localhost:8000";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Tasks not found');
  }
  return response.json();
}

export async function createTask(task: TaskCreate): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Task creation failed');
  }
  return response.json();
}

export async function getTask(id: number): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error('Tasks not found');
  }
  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Task deletion failed');
  }
}

export async function updateTask(id: number, task: TaskCreate): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Task update failed');
  }
  return response.json();
}