interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'HR Manager', 'Employee', 'Team Leader', 'IT Administrator'],
  tenantName: 'Client',
  applicationName: 'HR application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
