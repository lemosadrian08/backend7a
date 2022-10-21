const socket = io();

const productsForm = document.getElementById("productsForm")

//Products
productsForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const product={
        title:productsForm[0].value,
        price:productsForm[1].value,
        thumbnail:productsForm[2].value,
    };
    socket.emit('new-product', product)
    productsForm.reset()
})

async function renderProducts(products) {
    console.log(products);
    const fetchHBS = await fetch("products.hbs");
  
    const textHBS = await fetchHBS.text();

    const template = Handlebars.compile(textHBS);
  
    const html = template({ products });
  

    document.getElementById("productsTable").innerHTML = html;
  }

socket.on("products", renderProducts);

  
  // Chat
  function renderChat(data) {
    const html = data.map((elem, index) => {
        return `<div>
              <strong style='color:blue'>${elem.author}</strong>:
              <em style='color:brown'>${elem.date}<em>
              <em style='color:green'>${elem.text}</em> </div>`;
      })
      .join(" ");
    document.getElementById("messages").innerHTML = html;
  }
  function addMessage(e) {
    let date = new Date();
    const message = {
      date: date,
      author: document.getElementById("username").value,
      text: document.getElementById("text").value,
    };
    socket.emit("new-message", message);
    return false;
  }
  
  socket.on("messages", function (data) {
    renderChat(data);
  });