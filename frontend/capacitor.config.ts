import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nuevaera.app',
  appName: 'nuevaera',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    //url:'https://izzicode-production.up.railway.app/api',
    androidScheme: 'https',
    cleartext: true, // Permite HTTP no seguro (solo para desarrollo)
  },
};

export default config;
