let modal;

$(document).ready(function () {
  modal = $("#noteModal");
  var btn = $(".add-note-btn");
  var closeBtn = $(".close-btn");
  var sendBtn = $(".send-btn");

  sendBtn.on("click", ai_chat);
  btn.on("click", openModal);
  closeBtn.on("click", closeModal);
  $(window).on("click", outsideClick);
  $("#noteForm").on("submit", addNote);


  fetchNotes();
});

async function fetchNotes() {
  try {
    const response = await fetch("http://localhost:3000/notes");
    const notes = await response.json();
    const notesContainer = $("#notes-container");
    notesContainer.empty(); // Clear existing notes

    notes.forEach((note) => {
      const noteElement = $(`
        <div class="note">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          <div class="note-title">${note.title}</div>
          <div class="note-content">${note.content}</div>
          <div class="note-actions">
            <span class="delete-note"><i class="fa fa-trash-o" style="font-size:30px" data-id="${note.notes_id}"></i></span>
          </div>
        </div>
      `);
      notesContainer.append(noteElement);
    });

    // Add event listeners to the delete icons
    $(".delete-note i").on("click", deleteNote);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
}

// Function to open modal
function openModal() {
  modal.show();
}

// Function to close modal
function closeModal() {
  modal.hide();
}

// Function to close modal if outside click
function outsideClick(event) {
  if ($(event.target).is(modal)) {
    modal.hide();
  }
}

// Function to add a new note
async function addNote(event) {
  event.preventDefault();
  const noteTitle = $("#noteTitle").val();
  const noteContent = $("#noteContent").val();

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

async function ai_chat(event) {
  event.preventDefault();
  const prompt = $(".chat-input").val();
  const chatContainer = $(".chat-section");
  try {
    const response = await fetch("http://localhost:3000/notes/ai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: prompt,
        }),
    });
    if (response.ok) {
      const data = await response.json();
      const chatElement = $(`
          <div class="chat-message">
              <div class="message"><h5>You:</h5> ${prompt}</div>
          </div>
          <div class="chat-message">
              <div class="message"><h5>AI:</h5> ${data.AI}</div>
          </div>
      `);
    chatContainer.append(chatElement);
    } else {
      console.error("Error fetching from AI");
    }
  } catch (error) {
    console.error("Error getting response", error);
  }  
}

// Function to delete a note
async function deleteNote(event) {
  const noteId = $(event.target).data("id");

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
