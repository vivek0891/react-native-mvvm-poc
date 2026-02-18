export const Routes = {
  Home: 'Home',
  Users: 'Users',
  UserDetail: 'UserDetail',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];