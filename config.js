// ====== KONFIGURASI APLIKASI Si DARA ======
// 1) Tempel URL Web App Apps Script (berakhiran /exec) di API_URL.
// 2) (Opsional, untuk notifikasi otomatis Kamis & Jumat) isi FIREBASE dan VAPID_KEY
//    dari Firebase Console → Project settings → General (Web app) & Cloud Messaging (Web Push certificates).
window.DARA_CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycbxEaS5SnlMwUqFxcoVly8_qsp_FcUEVGJ4Zvbb3XKcMIlWqtND8gFP0OySP7B2VQQhbtQ/exec',
  WILAYAH: 'Kabupaten Donggala',
  FIREBASE: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    messagingSenderId: '',
    appId: ''
  },
  VAPID_KEY: ''
};
