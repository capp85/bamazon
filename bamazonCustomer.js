var mysql = require("mysql");

var inquirer = require("inquirer");



var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 8889,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazonDB"
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log()
    console.log("========**BAMAZON**========");
    console.log("");
    showProducts();

  });

function showProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
        console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | ${res[i].price} | ${res[i].stock_quantity}`);
    }

    askProducts();

});
};

function askProducts() {
    inquirer.prompt([

        {
            name: "productID",
            type: "input",
            message: "Please Enter Product ID : ",
            validate: validateID
        },
        {
            name: "productQuantity",
            type: "input",
            message: "How Many Would You Like? ",
            validate: validateID
        },
        {
            name: "anotherItem",
            type: "input",
            message: "Would You Like To Purchase Anything Else (y / n)? "
        }
        ]).then(function (productAnswer) {
            var itemID_selected = parseInt(productAnswer.productID);
            var itemQuantity_selected = parseInt(productAnswer.productQuantity);
            var another_item = productAnswer.anotherItem.toLowerCase();
    
            connection.query("SELECT * FROM products WHERE item_id=?", [itemID_selected], function (err, res) {
                if (err) throw err;
                if (itemQuantity_selected > res[0].stock_quantity) {
                    var itemName_selected = res[0].product_name;
                    console.log("\n----------------------------------------------------------------\n");
                    console.log("Insufficient Quantity!!!");
                    console.log("We Have Only " + res[0].stock_quantity + " In Stock At The Moment");
                    console.log("\n----------------------------------------------------------------\n");
                    if (another_item === "y") {
                        showProducts();
                    } else {
                        connection.end()
                    }
                }else {
    var newItemQuantity = (res[0].stock_quantity) - (itemQuantity_selected);
    var itemName_selected = res[0].product_name;
    var subTotal = (itemQuantity_selected * res[0].price).toFixed(2);
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newItemQuantity
            },
            {
                item_id: itemID_selected
            }
        ],
        function (err, res) {
        }
    );
    if (another_item === "y") {
        showProducts();
    } else {
        connection.end()
    }
    console.log("\n----------------------------\n");
    console.log("Your Order Has Been Processed.");
    console.log("You bought: " + itemQuantity_selected + " " + itemName_selected);
    console.log("Subtotal: " + "$" + subTotal);
    console.log("Thanks for your Shopping!");
    console.log("\n----------------------------\n");
 
}
});

})};




function validateID(id) {
    var id_num = parseFloat(id);
    return (id !== "" && !isNaN(id) && id_num > 0);
};

