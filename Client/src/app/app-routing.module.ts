import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditNoteComponent } from './add-edit-note/add-edit-note.component';
import { NotesListComponent } from './notes-list/notes-list.component';


const routes: Routes = [
  {
    path: '', component: NotesListComponent, children: 
    [ 
      { path: ':id', component: AddEditNoteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
