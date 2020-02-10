/* globals fetch, moment */

let bodyText = "#body-text"

function print (value) {
    console.log(value)
    return value
  }
  
  function q (selector) {
    return document.querySelector(selector)
  }
  
  function getAllNotes () {
    return fetch('http://localhost:3000/notes/',  {
      method: 'GET'
    })
      .then(response => response.json())
  }
  
  function addNoteHTML (notes) {
    let notesStr = '<div id="notes-list">'
    for (const note of notes) {
      notesStr += noteActionHTML(note)
    }
    notesStr += "</ul>"
    return notesStr
  }
  
function noteActionHTML (note) {
    return `<li data-note-id="${note.id}">${note.note} <button class="delete">Delete</button></li>`
  }

    
  function postNewNote (subjectText) {
    return fetch('http://localhost:3000/notes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: subjectText, done: false, created: moment().format() })
    })
      .then(response => response.json())
  }
  
  function renderNotesList (notes) {
    console.log('renderNotesList', notes)
    const notesHTML = addNoteHTML(notes)
    const notesSection = document.querySelector('#notes')
    notesSection.innerHTML = notesHTML
  }
  
  function renderNewNote (note) {
    const noteHTML = noteActionHTML(note)
    const notesList = document.querySelector('#notes-list')
    notesList.insertAdjacentHTML('beforeend', noteHTML)
  }

  

  getAllNotes().then(renderNotesList)
  
  q('#note-form').addEventListener('submit', event => {
    event.preventDefault()
    const subjectField = q('#subject')
    const bodyField = q('#body')
    const noteText = subjectField.value + '<br>' + bodyField.value
    subjectField.value = ''
    bodyField.value = ''
    postNewNote(noteText).then(renderNewNote)
  })
    
  //this code is for View/Edit page and Delete page
  // $('#firstCollapseMenu').collapsible({
  //   accordion: false,
  //   accordionUpSpeed: 400,
  //   accordionDownSpeed: 400,
  //   collapseSpeed: 400,
  //   contentOpen: null,
  //   arrowRclass: 'arrow-r',
  //   arrowDclass: 'arrow-d',
  //   animate: true
  // });

  q('#notes').addEventListener('click', event => {
    if (event.target.matches('.delete')) {
    print('delete ' + event.target.parentElement.dataset.noteId)
      // NOTE send AJAX request to delete note
    }
  })
  