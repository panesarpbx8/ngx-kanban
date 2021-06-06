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

  async sort(boards: Board[]): Promise<void> {
    const fs = firebase.firestore();
    const batch = fs.batch();
    const refs = boards.map(board => fs.collection(`boards`).doc(board.id));

    refs.forEach((ref, index) => batch.update(ref, { priority: index }));
    await batch.commit();
  }

  async sortTasks(boardId: string, tasks: Task[]): Promise<void> {
    await this.firestore.doc<Board>(`boards/${boardId}`).update({ tasks });
  }

  findByUID(uid: string): Observable<Board[]> {
    return this.firestore.collection<Board>('boards', ref => {
      return ref.where('uid', '==', uid).orderBy('priority', 'asc');
    }).valueChanges();
  }

  async addTask(boardId: string, task: Task): Promise<void> {
    task.id = this.firestore.createId();
    await this.firestore.doc<Board>(`boards/${boardId}`).ref.update({
      tasks: firebase.firestore.FieldValue.arrayUnion(task),
    });
  }

  async removeTask(boardId: string, task: Task): Promise<void> {
    await this.firestore.doc<Board>(`boards/${boardId}`).ref.update({
      tasks: firebase.firestore.FieldValue.arrayRemove(task),
    })
  }

  async updateTask(boardId: string, task: Task): Promise<void> {
    const boardRef = this.firestore.doc<Board>(`boards/${boardId}`);
  
    const board = await boardRef.valueChanges().pipe(take(1)).toPromise();
    const index = board.tasks.findIndex(t => t.id === task.id);
    board.tasks[index] = task;
    
    await boardRef.set(board, { merge: true });    
  }

  get labels(): ['skyblue', 'purple', 'red', 'teal', 'yellow'] {
    return ['skyblue', 'purple', 'red', 'teal', 'yellow'];
  }

}
