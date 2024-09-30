export const environment = {
  production: true,
  dynamicRoutes: [
    {
      path: 'mfe2',
      remoteEntry: 'https://mfe-demo-mfe2.vercel.app/remoteEntry.js',
      exposedModule: './Routes',
      returnedModule: 'remoteRoutes',
    }
  ]
};
