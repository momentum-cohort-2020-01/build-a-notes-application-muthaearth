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
    notesStr += "</div>"
    return notesStr
  }
  
function noteActionHTML (note) {
    return `<li data-note-id="${note.id}">${note.note} <button class="delete">Delete</button></li>`
  }

    
  function postNewNote (subjectText) {
    return fetch('http://localhost:3000/notes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: subjectText, body, done: false, created: moment().format() })
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
  
  //this will fall under Edit Note
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
  

  getAllNotes().then(renderNotesList)
  
  q('#note-form').addEventListener('submit', event => {
    event.preventDefault()
    const subjectField = q('#subject')
    const bodyField = q('#body')
    const bodyText = subjectField.value + '<br>' + bodyField.value
    bodyField.value = ''
    postNewNote(bodyText).then(renderNewNote)
  })
  
  q('#notes').addEventListener('click', event => {
    if (event.target.matches('.delete')) {
    print('delete ' + event.target.parentElement.dataset.todoId)
      // NOTE send AJAX request to delete note
    }
  })
  