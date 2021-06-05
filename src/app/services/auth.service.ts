import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Board } from '../models/board.interface';
import { User } from '../models/user.interface';
import { BoardService } from './board.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  user$: Observable<User>;

  snapshot: User;

  constructor(private ngAuth: AngularFireAuth, private boardService: BoardService) { 
    this.user$ = this.ngAuth.authState;
  }

	async signUp({ email, password, displayName }): Promise<void> {
		if (!displayName || !email || !password) {
      throw Error('Insufficient Information to create Account');
		}
    const credential = await this.ngAuth.createUserWithEmailAndPassword(
      email, password
    );
    await credential.user.updateProfile({ displayName });
	}

  async login({ email, password }): Promise<void> {
    if (email && password) {
      const cred = await this.ngAuth.signInWithEmailAndPassword(email, password);
      await this.setSnapshot();
    }
    throw Error('Invalid credentials');
  }

  async googleLogin(): Promise<void> {
    const cred = await this.ngAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    await this.setSnapshot();
  }

  private async setSnapshot() {
    this.snapshot = await this.ngAuth.currentUser;
  }
  
  async logout(): Promise<void> {
    await this.ngAuth.signOut();
  }

  async userExists(email: string): Promise<boolean> {
    const methods = await this.ngAuth.fetchSignInMethodsForEmail(email);
    return methods.length > 0;
  }

}
