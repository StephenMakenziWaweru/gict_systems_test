async function postData() {
    // I added a self-hosted (Heroku) CORS proxy server to avoid being blocked
    // https://secret-shore-69314.herokuapp.com/
    const url = 'https://secret-shore-69314.herokuapp.com/' + 'http://developers.gictsystems.com/api/dummy/submit/';
    const data = {
        "fullnames": document.getElementById("fullnames").value,
        "email": document.getElementById("email").value,
        "phone": document.getElementById("phone").value,
        "address": document.getElementById("address").value
    };

    const response = await fetch(url, {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) 
    });

    const responseMsg = await response.json(); 
    if (response.ok){

        Swal.fire({
            html: `<p>StatusCode: ${responseMsg.StatusCode}</p> <p>Message: ${responseMsg.Message}</p>`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
        document.getElementById("myForm").reset();  
    } else {
        Swal.fire({
            text: `StatusCode: ${responseMsg.StatusCode}\nMessage: ${responseMsg.Message}`,
            icon: 'error',
            confirmButtonText: 'OK'
        }); 
    }  
    //console.log(responseMsg);
    return false;
} 
  

async function getItems() {
    // I added a self-hosted (Heroku) CORS proxy server to avoid being blocked
    // https://secret-shore-69314.herokuapp.com/
    const url = 'https://secret-shore-69314.herokuapp.com/' + 'http://developers.gictsystems.com/api/dummy/items/';
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ALDJAK23423JKSLAJAF23423J23SAD3'
            },
        });
        const items = await response.json();
        const myTable = document.getElementById("tableItems");
        $("tbody#tableItems tr").remove();
        let index = 0;
        items.map((item) => {
            const row = myTable.insertRow(index);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.innerHTML = `${item.ID}`;
            cell2.innerHTML = `${item.Message}`;
            cell3.innerHTML = `${item.Age}`;
            cell4.innerHTML = `<button class="btn btn-sm btn-secondary">Edit</button>`;
            index += 1;
        });
        //console.log(items);
    } catch (error) {
        console.log(error);
    }
}
$(document).ready(function(){
    getItems();                                 // initial call 
    myVar = setInterval("getItems()", 10000);   // refresh
});