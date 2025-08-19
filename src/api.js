const API_URL = process.env.API_URL;

export const fetchTasks = async (userId) => {
  const response = await fetch(`${API_URL}/user?userId=${userId}`);
  return await response.json();
};

export const createTask = async (task) => {
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return await response.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/user/${id}`, { method: "DELETE" });
};

export const updateTask = async (id, updates) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return await response.json();
};


export const createLog = async (logInfo) => {
  const resp = await fetch(`${API_URL}/task-3`, {
    method: "POST",
    body: JSON.stringify(logInfo),
    headers: { "Content-Type": "application/json" },
  })
  return await resp.json();
}

export const deleteLog = async (id) => {
  return await fetch(`${API_URL}/task-3/${id}`, { method: "DELETE" });
}

export const allLogs = async() => {
  return await fetch(`${API_URL}/task-3`)
}