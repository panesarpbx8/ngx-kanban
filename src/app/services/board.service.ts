import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Board } from '../models/board.interface';
import { Task } from '../models/task.interface';
import { FireService } from './fire.service';
import firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class BoardService extends FireService<Board> {
  
  constructor(private firestore: AngularFirestore) {
    super(firestore, 'boards');
  }

  findByUID(uid: string): Observable<Board[]> {
    return this.firestore.collection<Board>('boards', ref => {
      return ref.where('uid', '==', uid).orderBy('priority', 'asc');
    }).valueChanges();
  }

  async addTask(boardId: string, task: Task): Promise<void> {
    const boardRef = this.firestore.doc<Board>(`boards/${boardId}`);
    
    const board = await boardRef.valueChanges().pipe(take(1)).toPromise();
    task.id = this.firestore.createId();
    if (task.content === '') task.content = 'Your task';
    board.tasks.push(task);
    
    await boardRef.set(board, { merge: true });
  }

  sort(boards: Board[]) {
    const fs = firebase.firestore();
    const batch = fs.batch();
    const refs = boards.map(board => fs.collection(`boards`).doc(board.id));

    refs.forEach((ref, index) => batch.update(ref, { priority: index }));
    batch.commit();
  }

  async updateTasks(boardId: string, tasks: Task[]): Promise<void> {
    await this.firestore.doc<Board>(`boards/${boardId}`).update({ tasks });
  }


}
