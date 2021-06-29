import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private recordsCollection: AngularFirestoreCollection<Record>;

  constructor(private afs: AngularFirestore) {
    this.recordsCollection = this.afs.collection<Record>('Records');
  }

  getRecords() {
    return this.recordsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addRecord(record: Record) {
    return this.recordsCollection.add(record);
  }

  getRecord(id: string) {
    return this.recordsCollection.doc<Record>(id).valueChanges();
  }

  updateRecord(id: string, record: Record) {
    return this.recordsCollection.doc<Record>(id).update(record);
  }

  deleteRecord(id: string) {
    return this.recordsCollection.doc(id).delete();
  }
}
