import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export class FireService<T> {
  constructor(private fs: AngularFirestore, private collection: string) {}

  async create(payload: T): Promise<void> {
    payload['id'] = this.fs.createId();

    await this.fs.doc<T>(this.collection+'/'+payload['id']).set(Object.assign({}, payload));
  }

  async update(payload: T): Promise<void> {
    await this.fs.doc<T>(this.collection+'/'+payload['id']).set(Object.assign({}, payload), {merge: true});
  }

  async delete(id: string): Promise<void> {
    await this.fs.doc<T>(this.collection+'/'+id).delete();
  }

  find(id: string): Observable<T> {
    return this.fs.doc<T>(this.collection+'/'+id).valueChanges();
  }

  findAll(): Observable<T[]> {
    return this.fs.collection<T>(this.collection).valueChanges();
  }
}
