document.addEventListener("DOMContentLoaded", async function(){
    const books = await loadData();
    console.log(books);
    renderBooks(books);


    document.querySelector("#addBtn").addEventListener("click", async function(){
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = parseInt(document.querySelector("#pages").value);
        
        if (this.dataset.editId) {
            // Edit mode
            const id = parseInt(this.dataset.editId);
            editBook(books, id, title, author, pages);
            delete this.dataset.editId;
            this.textContent = "Add New Book";
        } else {
            // Add mode
            addBook(books, title, author, pages);
        }
        
        // Clear form
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#pages").value = "";
        renderBooks(books);
    })

})

function renderBooks(books) {
    const contentTableBody = document.querySelector("#content");
    contentTableBody.innerHTML = ""; // clear all the children
    for (let b of books) {
        let trElement = document.createElement('tr');
        trElement.innerHTML =`
        <td>${b.id}</td>
        <td>${b.title}</td>
        <td>${b.author}</td>
        <td>${b.pages}</td>
        <td>
            <button class="btn btn-sm btn-warning edit-btn" data-id="${b.id}">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${b.id}">Delete</button>
        </td>
        `;
        contentTableBody.appendChild(trElement)
    }
    
    // Add event listeners for edit buttons
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const id = this.getAttribute("data-id");
            const book = books.find(b => b.id == id);
            if (book) {
                document.querySelector("#title").value = book.title;
                document.querySelector("#author").value = book.author;
                document.querySelector("#pages").value = book.pages;
                document.querySelector("#addBtn").textContent = "Update Book";
                document.querySelector("#addBtn").dataset.editId = id;
            }
        });
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const id = this.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this book?")) {
                deleteBook(books, id);
                renderBooks(books);
            }
        });
    });
}