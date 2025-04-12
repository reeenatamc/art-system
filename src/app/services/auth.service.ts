import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<{ name: string } | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        const userDocRef = doc(this.firestore, 'user', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as { username: string };
          this.currentUserSubject.next({ name: userData.username });
        } else {
          this.currentUserSubject.next({ name: 'Usuario' });
        }
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  login(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => userCredential.user)
      .catch((error) => {
        throw error;
      });
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
