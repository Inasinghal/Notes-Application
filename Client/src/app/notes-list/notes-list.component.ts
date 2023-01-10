import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/shared/note.model';
import { NotesService } from 'src/shared/notes.service';
import { NotificationService } from 'src/shared/notification.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  searchInput: string = "";
  notes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService,
    private notification: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.getAllNotes();
    this.notesService.refreshGridSubject$.subscribe(res => {
      this.getAllNotes();
      this.router.navigate(['/new']);
    });
  }

  getAllNotes() {
    this.notesService.getAll().subscribe(notes => {
      this.notes = notes;
    }, err => console.log(err));
  }

  deleteNote(id: any) {
    this.notesService.deleteNote(id).subscribe(res => {
      this.notesService.refreshGrid();
      this.notification.showSuccess("Note Deleted Successfully !!!");
    }, err => {
      console.log(err);
      this.notification.showError("Something went wrong");
    });
  }
}
