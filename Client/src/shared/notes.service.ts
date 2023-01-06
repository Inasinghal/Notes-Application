import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  configUrl = 'http://localhost:4000/api';
  private refreshGridSubject = new BehaviorSubject(true);
  refreshGridSubject$ = this.refreshGridSubject.asObservable();

  constructor(private http: HttpClient) { }


  refreshGrid() {
    this.refreshGridSubject.next(true);
  }

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.configUrl}/getNotes`).pipe(catchError(this.handleError));
  }

  getNote(id: any): Observable<Note> {
    return this.http.get<Note>(`${this.configUrl}/getNote/${id}`).pipe(catchError(this.handleError));
  }

  addNote(note: Note) {
    return this.http.post(`${this.configUrl}/createNote`, note).pipe(catchError(this.handleError));
  }

  editNote(editedNote: Note) {
    return this.http.put(`${this.configUrl}/updateNote/${editedNote._id}`, editedNote).pipe(catchError(this.handleError));
  }

  deleteNote(id: any) {
    return this.http.delete(`${this.configUrl}/removeNote/${id}`).pipe(catchError(this.handleError));
  }

  handleError(error) {
    if(error) {
      return throwError(error.message)
    }
  }

}
