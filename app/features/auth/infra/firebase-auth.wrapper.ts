import { injectable } from "inversify";
import IAuthGateway from "../data/interfaces/auth.gateway.interface";
import { AuthUser } from "../domain/entities/auth-user.entity";
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "./firebase-config";

@injectable()
export default class FirebaseAuthGateway implements IAuthGateway {
  private readonly auth: Auth;

  constructor() {
    this.auth = auth;
  }

  async signInWithGooglePopup(): Promise<AuthUser | null> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      return this.toAuthUser(result.user);
    } catch (error) {
      console.error("Google sign-in failed", error);
      throw new Error("Google sign-in failed");
    }
  }

  async signInWithGoogleRedirect(): Promise<AuthUser | null> {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(this.auth, provider);
      return null; // Redirect will handle the sign-in process
    } catch (error) {
      console.error("Google sign-in redirect failed", error);
      throw new Error("Google sign-in redirect failed");
    }
  }

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(this.auth, (firebaseUser) => {
      if (firebaseUser) {
        this.toAuthUser(firebaseUser).then(callback);
      } else {
        callback(null);
      }
    });
  }

  async checkAuthStatus(): Promise<AuthUser | null> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((currentUser) => {
        console.log("Firebase auth user state has changed:");
        console.log(currentUser);

        if (!currentUser) {
          resolve(null); // No user is logged in
        } else {
          resolve(this.toAuthUser(currentUser)); // Return AuthUser object
        }
      });
    });
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      throw new Error("Sign-out failed");
    }
  }

  private async toAuthUser(firebaseUser: User): Promise<AuthUser> {
    const token = await firebaseUser.getIdToken();
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      authToken: token,
    };
  }
}
