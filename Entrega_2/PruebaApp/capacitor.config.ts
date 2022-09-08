import { CapacitorConfig } from '@capacitor/cli';
import { SplashScreen } from '@capacitor/splash-screen';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'pruebaApp',
  webDir: 'www',
  bundledWebRuntime: false,  
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      androidSplashResourceName: "splash-PruebaApp",
    },
  
  }
  
};

export default config;
