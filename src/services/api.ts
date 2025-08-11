const BASE = 'http://localhost:5000/api';

export async function uploadFile(file: File) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${BASE}/upload`, { method: 'POST', body: form, credentials: 'include' });
  return res.json();
}

export async function injectText(text: string) {
  const res = await fetch(`${BASE}/upload/inject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return res.json();
}

export async function chat(message: string, topK = 3) {
  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ message, topK }),
  });
  return res.json();
}

export async function resetConversation() {
  const res = await fetch(`${BASE}/chat/reset`, { method: 'POST', credentials: 'include' });
  return res.json();
}
