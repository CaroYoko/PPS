import { Injectable } from '@angular/core';
import { Firestore,collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User {
  id?: string;
  mail: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getUsers(): Observable<User[]>{
    const userRef = collection(this.firestore, 'user');
    return collectionData(userRef, {idField : 'id'}) as Observable<User[]>;
  }

  getUserById(id: any): Observable<User>{
    const userDocRef = doc(this.firestore,`user/${id}`);
    return docData(userDocRef, {idField : 'id'}) as Observable<User>
  }

  addUser(user: User){
    const userRef = collection(this.firestore, 'user');
    return addDoc(userRef, user);
  }

  deleteUser(user: User){
    const userDocRef = doc(this.firestore, `user/${user.id}`);
    return deleteDoc(userDocRef);
  }

  updateNote(user: User){
    const userDocRef = doc(this.firestore,`user/${user.id}`);
    return updateDoc(userDocRef, { mail: user.mail, password: user.password});
  }


} 
