import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/shared/note.model';
import { NotesService } from 'src/shared/notes.service';
import { NotificationService } from 'src/shared/notification.service';

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class AddEditNoteComponent implements OnInit {
  new: boolean;
  note: Note;
  noteForm: FormGroup;
  public options: Object = {
    attribution: false,
    heightMin: 400
  };

  constructor(
    private noteService: NotesService,
    private activatedRoute: ActivatedRoute,
    private notifyService : NotificationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.note = new Note();
      this.new = true;
      this.createForm();
      if (params.id !== 'new') {
        this.noteService.getNote(params.id).subscribe(note => {
          if (note) {
            this.note = note;
            this.new = false;
            this.createForm();
          } 
        }, err => console.log(err));
      }
    })
  }

  public createForm() {
    this.noteForm = this.formBuilder.group({
      title: new FormControl(this.note.title, [Validators.required]),
      body: new FormControl(this.note.body, [Validators.required])
    });
  }

  onSubmit() {
    if (this.new) {
      this.noteService.addNote(this.note).subscribe(res => {
        this.noteService.refreshGrid();
        this.note = new Note();
        this.new = true;
        this.createForm();
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
