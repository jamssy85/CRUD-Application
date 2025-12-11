const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "693a73f3d0ea881f4021625b";
const MASTER_KEY =
  "$2a$10$EHGKzk1XCYlaSS1mcR3.hu/tx28452/EU08Rcq2Iub/6qE1/8mQda";

async function loadData() {
    try {
        const config = {
            "headers": {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            }
        }
        const response = await axios.get(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}/latest`, config);
        return response.data.record;
    } catch (e) {
        // if there is any error of any kind, return an []
        return [];
    }
}

async function saveData(books) {
    try {
        const config = {
            "headers": {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            }
        }

        // axios.put has three parameters:
        // 1. the URL endpoint
        // 2. the data to send over
        // 3. configuration options
        const response = await axios.put(`${JSON_BIN_BASE_URL}/b/${JSON_BIN_ID}`, books, config);
        return response.data;

    } catch (e) {
        return {
            "error": e
        }
    }
}

function addBook(books, title, author, pages) {
    const newBook = {
        "id": Math.floor(Math.random() * 10000 + 1),
        "title": title,
        "author": author,
        "pages": pages
    }

    books.push(newBook);
    saveData(books);
}