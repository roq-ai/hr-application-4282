const mapping: Record<string, string> = {
  attendances: 'attendance',
  clients: 'client',
  leaves: 'leave',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
