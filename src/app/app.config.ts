import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "artsystem-14706", appId: "1:55977991629:web:50701bfcfc3df387cdf884", storageBucket: "artsystem-14706.firebasestorage.app", apiKey: "AIzaSyBQYJbEi0iwfML1sdq7yGgtjCCAPT7vREs", authDomain: "artsystem-14706.firebaseapp.com", messagingSenderId: "55977991629", measurementId: "G-QWVS05BWGF" })), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({ projectId: "artsystem-14706", appId: "1:55977991629:web:50701bfcfc3df387cdf884", storageBucket: "artsystem-14706.firebasestorage.app", apiKey: "AIzaSyBQYJbEi0iwfML1sdq7yGgtjCCAPT7vREs", authDomain: "artsystem-14706.firebaseapp.com", messagingSenderId: "55977991629", measurementId: "G-QWVS05BWGF" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({ projectId: "artsystem-14706", appId: "1:55977991629:web:50701bfcfc3df387cdf884", storageBucket: "artsystem-14706.firebasestorage.app", apiKey: "AIzaSyBQYJbEi0iwfML1sdq7yGgtjCCAPT7vREs", authDomain: "artsystem-14706.firebaseapp.com", messagingSenderId: "55977991629", measurementId: "G-QWVS05BWGF" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
