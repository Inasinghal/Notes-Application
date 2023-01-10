import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/shared/note.model';
import { NotesService } from 'src/shared/notes.service';
import { NotificationService } from 'src/shared/notification.service';

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.scss']
})
export class AddEditNoteComponent implements OnInit {
  new: boolean;
  note: Note;
  @ViewChild('noteForm', {static: false}) noteForm: FormGroup;

  constructor(
    private noteService: NotesService,
    private activatedRoute: ActivatedRoute,
    private notifyService : NotificationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.note = new Note();
      this.new = true;
      setTimeout(() => this.noteForm.reset());
      if (params.id !== 'new') {
        this.noteService.getNote(params.id).subscribe(note => {
          if (note) {
            this.note = note;
            this.new = false;
          } 
        }, err => console.log(err));
      }
    })
  }

  onSubmit() {
    if (this.new) {
      this.noteService.addNote(this.note).subscribe(res => {
        this.noteService.refreshGrid();
        this.note = new Note();
        this.new = true;
        this.notifyService.showSuccess("Note saved successfully !!");
      }, err => {
        console.log(err);
        this.notifyService.showError("Something went wrong");
      });
    } else {
      this.noteService.editNote(this.note).subscribe(res => {
        this.noteService.refreshGrid();
        this.notifyService.showSuccess("Note saved successfully !!");
      }, err => {
        console.log(err);
        this.notifyService.showError("Something went wrong");
      });
    }
  }

}
