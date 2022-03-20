import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupIdSubject = new BehaviorSubject<number | null>(null);
  private nickNameSubject = new BehaviorSubject<string>('');
  private groupCodeSubject = new BehaviorSubject<string>('');
  private playerIdSubject = new BehaviorSubject<number | null>(null);

  groupId$ = this.groupIdSubject.asObservable();
  nickName$ = this.nickNameSubject.asObservable();
  groupCode$ = this.groupCodeSubject.asObservable();
  playerId$ = this.playerIdSubject.asObservable();

  constructor() { }

  setGroupId(id: number) {
    this.groupIdSubject.next(id);
  }

  setGroupCode(code: string) {
    this.groupCodeSubject.next(code);
  }

  setNickname(nickname: string) {
    this.nickNameSubject.next(nickname);
  }

  setPlayerId(playerId: number) {
    this.playerIdSubject.next(playerId);
  }
}
