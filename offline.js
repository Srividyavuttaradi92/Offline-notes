// Get elements from DOM
const saveBtn = document.getElementById('saveBtn');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');
const trashBoxList = document.getElementById('trashBoxList');

// Load saved notes and trash from localStorage
let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
let trashNotes = JSON.parse(localStorage.getItem('trash')) || [];

// Render notes and trash box
function renderNotes() {
  notesList.innerHTML = '';
  savedNotes.forEach((note, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="note-text">${note.text}</div>
      <div class="note-date">${note.date}</div>
      <button class="edit-btn" onclick="editNote(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;
    notesList.appendChild(li);
  });

  trashBoxList.innerHTML = '';
  trashNotes.forEach((note, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="note-text">${note.text}</div>
      <div class="note-date">${note.date}</div>
      <button class="recover-btn" onclick="recoverNote(${index})">Recover</button>
      <button class="permanent-delete-btn" onclick="permanentDelete(${index})">Delete Forever</button>
    `;
    trashBoxList.appendChild(li);
  });
}

// Save a note
saveBtn.addEventListener('click', () => {
  const noteText = noteInput.value;
  if (noteText.trim()) {
    const noteDate = new Date().toLocaleString();
    const newNote = { text: noteText, date: noteDate };
    savedNotes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(savedNotes));
    noteInput.value = '';
    renderNotes();
  }
});

// Edit a note
function editNote(index) {
  noteInput.value = savedNotes[index].text;
  deleteNote(index);
}

// Delete a note (move to trash)
function deleteNote(index) {
  const deletedNote = savedNotes.splice(index, 1)[0];
  trashNotes.push(deletedNote);
  localStorage.setItem('notes', JSON.stringify(savedNotes));
  localStorage.setItem('trash', JSON.stringify(trashNotes));
  renderNotes();
}

// Recover a note from trash
function recoverNote(index) {
  const recoveredNote = trashNotes.splice(index, 1)[0];
  savedNotes.push(recoveredNote);
  localStorage.setItem('notes', JSON.stringify(savedNotes));
  localStorage.setItem('trash', JSON.stringify(trashNotes));
  renderNotes();
}

// Permanently delete a note from trash
function permanentDelete(index) {
  trashNotes.splice(index, 1);
  localStorage.setItem('trash', JSON.stringify(trashNotes));
  renderNotes();
}

// Initial render
renderNotes();
