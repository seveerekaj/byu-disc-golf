import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupIdSubject = new BehaviorSubject<number | null>(null);
  private nickNameSubject = new BehaviorSubject<string | null>('');
  private groupCodeSubject = new BehaviorSubject<string | null>('');
  private playerIdSubject = new BehaviorSubject<number | null>(null);

  groupId$ = this.groupIdSubject.asObservable();
  nickName$ = this.nickNameSubject.asObservable();
  groupCode$ = this.groupCodeSubject.asObservable();
  playerId$ = this.playerIdSubject.asObservable();

  constructor() {

    this.groupCodeSubject.next(localStorage.getItem('groupCode'));
    this.nickNameSubject.next(localStorage.getItem('nickname'));
    this.playerIdSubject.next(parseInt(localStorage.getItem('playerId') || ''));
    this.groupIdSubject.next(parseInt(localStorage.getItem('groupId') || ''));
  }

  setGroupId(id: number) {
    this.groupIdSubject.next(id);
    localStorage.setItem('groupId', id.toString());
  }

  setGroupCode(code: string) {
    this.groupCodeSubject.next(code);
    localStorage.setItem('groupCode', code);
  }

  setNickname(nickname: string) {
    this.nickNameSubject.next(nickname);
    localStorage.setItem('nickName', nickname);
  }

  setPlayerId(playerId: number) {
    this.playerIdSubject.next(playerId);
    localStorage.setItem('playerId', playerId.toString());
  }

  clearData() {
    localStorage.clear();
    this.groupCodeSubject.next('');
    this.nickNameSubject.next('');
    this.playerIdSubject.next(null);
    this.groupIdSubject.next(null);
  }
}
