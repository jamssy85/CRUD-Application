document.addEventListener("DOMContentLoaded", async function(){
    const books = await loadData();
    console.log(books);
    renderBooks(books);


    document.querySelector("#addBtn").addEventListener("click", async function(){
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = parseInt(document.querySelector("#pages").value);
        addBook(books, title, author, pages);
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
        `;
        contentTableBody.appendChild(trElement)
    }
}