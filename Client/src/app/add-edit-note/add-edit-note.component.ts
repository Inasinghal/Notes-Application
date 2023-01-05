import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/shared/note.model';
import { NotesService } from 'src/shared/notes.service';

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.scss']
})
export class AddEditNoteComponent implements OnInit {
  new: boolean;
  note: Note;

  constructor(
    private noteService: NotesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id === 'new') {
        this.new = true;
        this.note = new Note();
      } else {
        this.noteService.getNote(params.id).subscribe(note => {
          if (note) {
            this.note = note;
            this.new = false;
          } else {
            this.note = new Note();
            this.new = true;
          }
        }, err => console.log(err));
      }
    })
  }

  onSubmit() {
    if (this.new) {
      this.noteService.addNote(this.note).subscribe(res => {}, err => {
        console.log(err);
      });
    } else {
      this.noteService.editNote(this.note).subscribe(res => {}, err => {
        console.log(err);
      });
    }
  }

}
