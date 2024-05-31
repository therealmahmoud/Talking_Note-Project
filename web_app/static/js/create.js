// Define modal globally so it's accessible in other functions
let modal;
// Call fetchNotes on page load
document.addEventListener("DOMContentLoaded", function () {
  // Get modal element
  modal = document.getElementById("noteModal");
  // Get open modal button
  var btn = document.querySelector(".add-note-btn");
  // Get close button
  var closeBtn = document.querySelector(".close-btn");

  // Listen for open click
  btn.addEventListener("click", openModal);
  // Listen for close click
  closeBtn.addEventListener("click", closeModal);
  // Listen for outside click
  window.addEventListener("click", outsideClick);
  // Listen for form submit
  document.getElementById("noteForm").addEventListener("submit", addNote);
});

// Call fetchNotes on page load
document.addEventListener("DOMContentLoaded", fetchNotes);

// Function to fetch and display notes from the API
async function fetchNotes() {
  try {
    const response = await fetch("http://localhost:3000/notes");
    const notes = await response.json();
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = ""; // Clear existing notes

    notes.forEach((note) => {
      const noteElement = document.createElement("div");
      noteElement.className = "note";
      noteElement.innerHTML = `
	  	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<div class="note-title">${note.title}</div>
		<div class="note-content">${note.content}</div>
		<div class="note-actions">
		  <span class="delete-note"><i class="fa fa-trash-o" style="font-size:30px" data-id="${note.notes_id}"></i></span>
		</div>
	  `;
      notesContainer.appendChild(noteElement);
    });

    // Add event listeners to the delete icons
    const deleteIcons = document.querySelectorAll(".delete-note");
    deleteIcons.forEach((icon) => {
      icon.addEventListener("click", deleteNote);
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
}

// Function to open modal
function openModal() {
  modal.style.display = "block";
}

// Function to close modal
function closeModal() {
  modal.style.display = "none";
}

// Function to close modal if outside click
function outsideClick(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Function to add a new note
async function addNote(event) {
  event.preventDefault();
  const noteTitle = document.getElementById("noteTitle").value;
  const noteContent = document.getElementById("noteContent").value;

  try {
    const response = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: noteTitle,
        content: noteContent,
      }),
    });

    if (response.ok) {
      fetchNotes(); // Refresh notes
      closeModal(); // Close modal
    } else {
      console.error("Error adding note");
    }
  } catch (error) {
    console.error("Error adding note:", error);
  }
}

// Function to delete a note
async function deleteNote(event) {
  const noteId = event.target.getAttribute("data-id");

  try {
    const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchNotes(); // Refresh notes
    } else {
      console.error("Error deleting note");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }
}
