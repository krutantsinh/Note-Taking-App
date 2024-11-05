const addNoteButton = document.getElementById("add-note-btn");
const noteContainer = document.getElementById("note-container");

// Load existing notes and display them
loadNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  noteContainer.insertBefore(noteElement, addNoteButton);
});

// Function to create a new note element
function createNoteElement(id, content) {
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");
  
    const noteContent = document.createElement("textarea");
    noteContent.classList.add("note-content");
    noteContent.placeholder = "Start your note here...";
    noteContent.value = content;
  
    noteCard.appendChild(noteContent);
  
    noteContent.addEventListener("dblclick", () => {
      if (confirm("Are you sure you want to delete this note?")) {
        removeNoteElement(id, noteCard);
      }
    });
  
    noteContent.addEventListener("input", () => {
      updateNoteContent(id, noteContent.value);
    });
  
    return noteCard;
  }
  

// Add a new note
function addNewNote() {
  const notes = loadNotes();
  
  // If there is an empty note, alert the user and return
  const hasEmptyNote = notes.some(note => note.content.trim() === "");
  if (hasEmptyNote) {
    alert("Please fill out your existing note before creating a new one.");
    return;
  }

  
  const newNote = {
    id: Date.now(),
    content: "",
  };

  const noteElement = createNoteElement(newNote.id, newNote.content);
  noteContainer.insertBefore(noteElement, addNoteButton);

  notes.push(newNote);
  saveNotes(notes);
}

// Update note content in localStorage
function updateNoteContent(id, content) {
  const notes = loadNotes();
  const noteToUpdate = notes.find((note) => note.id === id);
  if (noteToUpdate) {
    noteToUpdate.content = content;
    saveNotes(notes);
  }
}

// Delete a note
function removeNoteElement(id, element) {
  const notes = loadNotes().filter((note) => note.id !== id);
  saveNotes(notes);
  noteContainer.removeChild(element);
}

// Save notes to localStorage
function saveNotes(notes) {
  localStorage.setItem("quicknotes-data", JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
  return JSON.parse(localStorage.getItem("quicknotes-data") || "[]");
}

// Event listener for adding a new note
addNoteButton.addEventListener("click", addNewNote);
