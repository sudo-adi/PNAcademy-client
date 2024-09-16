export type JwtPayloadType = {
  userId: string;
  roleId: string;
  permissions: Array<
    | "canManageAssessment"
    | "canManageUser"
    | "canManageRole"
    | "canManageNotification"
    | "canManageLocalGroup"
    | "canManageReports"
    | "canAttemptAssessment"
    | "canViewReport"
    | "canManageMyAccount"
    | "canViewNotification"
  >;
  iat: number; // Issued at time (timestamp)
  exp: number; // Expiration time (timestamp)
};
