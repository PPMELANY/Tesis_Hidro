import type { CapacitorConfig } from '@capacitor/cli';
/// <reference types="@capacitor/local-notifications" />


const config: CapacitorConfig = {
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",//Icono de la app solo para Android
      iconColor: "#8DECB4",//Color de Icono
      sound: "beep.wav",//Sonido de la notificacion solo para Android
    },
  },
};

export default config;
