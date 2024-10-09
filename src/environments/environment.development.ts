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
      remoteEntry: 'http://localhost:4209/remoteEntry.js',
      exposedModule: './Routes',
      returnedModule: 'remoteRoutes',
    }
  ]
};
