const handlePdf = () => {
  const flower_id = new URLSearchParams(window.location.search).get("flowerId");
  console.log(flower_id);
  const user_id = localStorage.getItem("user_id");
  const buyer_id = localStorage.getItem("buyer_id");
  // console.log(`http://127.0.0.1:8000/users/${user_id}`);
  
  fetch(`http://127.0.0.1:8000/orders/?flower_id=${flower_id}&buyer_id=${buyer_id}`)
    .then((res) => res.json())
    .then((orderdata) => {
      fetch(`http://127.0.0.1:8000/users/${user_id}`)
        .then((res) => res.json())
        .then((userdata) => {
          fetch(`http://127.0.0.1:8000/flowers/list/${flower_id}`)
            .then((res) => res.json())
            .then((flowerdata) => {
              fetch(`http://127.0.0.1:8000/buyers/list/${buyer_id}`)
                .then((res) => res.json())
                .then((buyerdata) => {
                  const newData = [orderdata, userdata,flowerdata, buyerdata];
                  console.log(newData);
                  const parent = document.getElementById("pdf-container");
                  const div = document.createElement("div");
                  div.innerHTML = `
                      <div class="pd d-flex justify-content-center gap-5 align-items-center p-5">
                      <div class=" ps-4 pt-3 pdfhtml ">
                        <img class="w-25" src=${newData[3].image}/>
                        <h5>Username: ${newData[1].username} UserID: ${newData[1].id}</h5>
                        <h4>Name: ${newData[1].first_name} ${newData[1].last_name}</h4>
                        <h5>Email: ${newData[1].email}</h5>
                        <h5>Address: ${newData[0][newData[0].length - 1].delivery_address}</h5>
                        <h5>Mobile: ${newData[0][newData[0].length - 1].mobile_no}</h5>
                        <h5>Buyer_id: ${buyer_id}</h5>
                        
                      
                      </div>
                      <div class="ps-4 pt-3 pdfhtml">
                      <h3 class="doc-name">Order ID: ${newData[0][newData[0].length - 1].id}</h3>
                      <img class="w-25" src=${newData[2].image}/>
                        <h3 class="doc-name">${newData[2].title}</h3>
                        <p>Order_types: ${newData[0][newData[0].length - 1].order_types}</p>
                        <p>Order_date: ${newData[0][newData[0].length - 1].order_date}</p>
                        <p>Delivery_date: ${newData[0][newData[0].length - 1].delivery_date}</p>
                        <p>Quantity: ${newData[0][newData[0].length - 1].quantity}</p>
                        <h5>Price/Unit: ${newData[2].price} $</h5>
                        
                        <h5>Total: ${newData[0][newData[0].length - 1].total_price} $</h5>

                        
                      </div>
                    </div>
                    <h4>Total Price + Vat(15%): ${newData[0][newData[0].length - 1].total_price *1.15} $</h5>
                     <input id="pdf-symtom" class="symtom" type="text" />
                    `;

                    parent.appendChild(div);
                    // donwloadPdf();
                });    
            });
          
        });
    });
};

const donwloadPdf = () => {
  const element = document.getElementById("pdf-container");

  // Define the options for html2pdf
  const options = {
    margin: 10,
    filename: "appt.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Use html2pdf to generate and download the PDF
    html2pdf(element, options);
    
};
handlePdf();
