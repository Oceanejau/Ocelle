const SYNC_FILENAME = 'ocelle-sync.json';
const DRIVE_API = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3';

let gisLoaded: Promise<void> | null = null;

function loadGisScript(): Promise<void> {
  if (gisLoaded) return gisLoaded;
  gisLoaded = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Impossible de charger Google Identity Services'));
    document.head.appendChild(script);
  });
  return gisLoaded;
}

export async function requestAccessToken(clientId: string): Promise<string> {
  await loadGisScript();
  // @ts-ignore — google est injecté globalement par le script GIS
  const google = window.google;

  return new Promise((resolve, reject) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email',
      callback: (response: any) => {
        if (response.error) reject(new Error(response.error));
        else resolve(response.access_token);
      },
    });
    client.requestAccessToken();
  });
}

async function findSyncFileId(token: string): Promise<string | null> {
  const query = encodeURIComponent(`name='${SYNC_FILENAME}' and 'appDataFolder' in parents`);
  const res = await fetch(`${DRIVE_API}/files?spaces=appDataFolder&q=${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.files?.[0]?.id ?? null;
}

export async function uploadSyncBlob(token: string, payload: object): Promise<void> {
  const existingId = await findSyncFileId(token);
  const body = JSON.stringify(payload);

  if (existingId) {
    await fetch(`${DRIVE_UPLOAD_API}/files/${existingId}?uploadType=media`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body,
    });
    return;
  }

  const metadata = { name: SYNC_FILENAME, parents: ['appDataFolder'] };
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([body], { type: 'application/json' }));

  await fetch(`${DRIVE_UPLOAD_API}/files?uploadType=multipart`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
}

export async function downloadSyncBlob(token: string): Promise<any | null> {
  const fileId = await findSyncFileId(token);
  if (!fileId) return null;

  const res = await fetch(`${DRIVE_API}/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function fetchGoogleEmail(token: string): Promise<string | null> {
  const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.email ?? null;
}