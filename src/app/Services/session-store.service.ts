import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';

// constants
const SHELL_TO_CHILD_EVENT_SD = 'sessionStoreUpdated';
const CHILD_TO_SHELL_EVENT_SD = 'sessionDataRequested';
const CLEAR_SESSION_EVENT = 'sessionDataClear';

type TAccessToken = string | null;
type TIsLoggedIn = boolean;
type TUserData = any;

export interface ISessionStore {
  accessToken: TAccessToken;
  isLoggedIn: TIsLoggedIn;
  userData: TUserData;
}

@Injectable({
  providedIn: 'root',
})
export class SessionStoreService {
  private accessTokenSubject = new BehaviorSubject<TAccessToken>(null);
  private isLoggedInSubject = new BehaviorSubject<TIsLoggedIn>(false);
  private userDataSubject = new BehaviorSubject<TUserData>(null);

  // Exposed observables for components to subscribe to
  accessToken$ = this.accessTokenSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userData$ = this.userDataSubject.asObservable();

  constructor() {}

  // setters
  setAccessToken(token: TAccessToken, shouldEmitEvent = false): void {
    if (token != null) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
    this.accessTokenSubject.next(token);
    if (shouldEmitEvent) this.emitEventToRemote();
  }

  setIsLoggedIn(isLoggedIn: TIsLoggedIn, shouldEmitEvent = false): void {
    this.isLoggedInSubject.next(isLoggedIn);
    if (shouldEmitEvent) this.emitEventToRemote();
  }

  setUserData(userData: TUserData, shouldEmitEvent = false): void {
    this.userDataSubject.next(userData);
    if (shouldEmitEvent) this.emitEventToRemote();
  }

  setSessionStore(data: ISessionStore): void {
    this.setAccessToken(data.accessToken);
    this.setIsLoggedIn(data.isLoggedIn);
    this.setUserData(data.userData);

    this.emitEventToRemote();
  }
  clearSession(): void {
    this.setAccessToken(null);
    this.setIsLoggedIn(false);
    this.setUserData(null);
    this.emitEventToRemote();
  }

  // getters
  getAccessToken(): TAccessToken {
    return this.accessTokenSubject.getValue();
  }
  getIsLoggedIn(): TIsLoggedIn {
    return this.isLoggedInSubject.getValue();
  }
  getUserData(): TUserData {
    return this.userDataSubject.getValue();
  }
  getSessionStore(): ISessionStore {
    return {
      accessToken: this.getAccessToken(),
      isLoggedIn: this.getIsLoggedIn(),
      userData: this.getUserData(),
    };
  }
  // listen events of remote apps
  listenRemoteEvents(): Subscription {
    return fromEvent(window, CHILD_TO_SHELL_EVENT_SD).subscribe(
      (event: Event) => {
        const customEvent = event as CustomEvent;
        console.log(
          'logged from Shell app --> received event ',
          customEvent?.detail,
          ' from child'
        );
        this.emitEventToRemote(customEvent?.detail);
      }
    );
  }

  // custom event emitter
  emitEventToRemote(eventName = SHELL_TO_CHILD_EVENT_SD): void {
    console.log('logged from Shell app --> triggered event', eventName);
    const event = new CustomEvent(eventName, {
      detail: this.getSessionStore(),
    });
    window?.dispatchEvent(event);
  }
}
