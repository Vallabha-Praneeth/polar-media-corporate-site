// Public form constraints shared by the browser and server. No delivery
// addresses, credentials, or other server-only configuration belong here.
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
  website: 200,
  requestBody: 12_000,
} as const;
