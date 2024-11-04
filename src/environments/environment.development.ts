export const environment = {
  production: false,
  dynamicRoutes: [
    {
      path: 'mfe2',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './Routes',
      returnedModule: 'remoteRoutes',
    },
    {
      path: 'report',
      remoteEntry: 'http://acs360.com:93/remoteEntry.js',
      exposedModule: './Routes',
      returnedModule: 'remoteRoutes',
    }
  ]
};
