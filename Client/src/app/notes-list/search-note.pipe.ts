import { Pipe, PipeTransform } from '@angular/core';
import { Note } from 'src/shared/note.model';
import { NotesService } from 'src/shared/notes.service';

@Pipe({
  name: 'searchNote',
  pure: false
})
export class SearchNotePipe implements PipeTransform {
  filteredNotes: any[];

  constructor(private notesService: NotesService) { }

  transform(notes: Note[], query: string): any {
    query = query.toLowerCase().trim();
    let allResults: Note[] = [];
    let terms: Array<string> = query.split(' ');
    terms = this.removeDuplicate(terms);
    terms.forEach(x => {
      allResults = allResults.concat(this.relevantNotes(x, notes));
    });
    allResults = this.sortNoteByRelevancy(allResults);
    let uniqueResults = this.removeDuplicate(allResults);
    return uniqueResults;
  }

  removeDuplicate(arr: Array<any>): Array<any> {
    let uniqueResult: Set<any> = new Set<any>();
    arr.forEach(x => uniqueResult.add(x));
    return Array.from(uniqueResult);
  }

  relevantNotes(query: string, notes: Note[]) {
    query = query.toLowerCase().trim();
    let relevantNotes: Note[] = notes.filter(note => {
      if ((note.body && note.body.toLowerCase().includes(query)) || (note.title.toLowerCase().includes(query))) {
        return true;
      } else {
        return false;
      }
    })
    return relevantNotes
  }

  sortNoteByRelevancy(notes: Note[]) {
    let searchNoteCountObject: Object = {}
    notes.forEach(note => {
      if (searchNoteCountObject[note._id]) {
        searchNoteCountObject[note._id] += 1;
      } else {
        searchNoteCountObject[note._id] = 1
      }
    })
    notes.sort((a: Note, b: Note) => {
      let aCount = searchNoteCountObject[a._id];
      let bCount = searchNoteCountObject[b._id];

      return bCount - aCount;
    })
    return notes;
  }

}
