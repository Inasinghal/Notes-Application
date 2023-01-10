import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { AddEditNoteComponent } from './add-edit-note/add-edit-note.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchNotePipe } from './notes-list/search-note.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NoteCardComponent,
    AddEditNoteComponent,
    SearchNotePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
