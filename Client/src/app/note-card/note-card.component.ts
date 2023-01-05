import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/shared/note.model';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input() note: Note;
  @Input() link: number;
  @Output() deleteNoteEvent: EventEmitter<any> = new EventEmitter<any>();
  

  constructor(private cdref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  deleteNote() {
    this.deleteNoteEvent.emit(this.note._id);
  }

}
