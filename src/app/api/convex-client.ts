// src/app/api/convex-client.ts
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://wooden-duck-742.convex.site';

export async function createTask(taskData: any) {
  const response = await fetch(`${CONVEX_URL}/api/createTask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  return response.json();
}

export async function getTasks() {
  const response = await fetch(`${CONVEX_URL}/api/getTasks`);
  return response.json();
}

export async function updateTaskStatus(taskId: string, status: string, progress?: number) {
  const response = await fetch(`${CONVEX_URL}/api/updateTaskStatus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId, status, progress })
  });
  return response.json();
}

export async function upsertTeamMember(memberData: any) {
  const response = await fetch(`${CONVEX_URL}/api/upsertTeamMember`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memberData)
  });
  return response.json();
}