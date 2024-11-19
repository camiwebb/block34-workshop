const {
    client,
    createTables,
    createCustomer, 
    createRestaurant,
    fetchCustomers,
    fetchRestaurants,
    createReservation,
    destroyReservation
} = require("./db");

const express = require("express");
const app = express();

app.use(express.json());
app.use(require("morgan")("dev"));

const init = async () => {
    await client.connect();
    await createTables();
    console.log("tables created");

    const [joe, mary, beth, luxe, maison] = 
    await Promise.all([
        createCustomer({name: "joe"}),
        createCustomer({name: "mary"}),
        createCustomer({name: "beth"}),
        createRestaurant({name: "luxe"}),
        createRestaurant({name: "maison"})
    ]);
    console.log(await fetchCustomers());
    console.log(await fetchRestaurants());

    // const [reservation, reservation2] = await Promise.all([
    //     createReservation({
    //         customer_id: joe.id,
    //         restaurant_id: luxe.id,
    //         date: "03/22/2026"
    //     }),
    //     createReservation({
    //         customer_id: mary.id,
    //         restaurant_id: maison.id,
    //         date: "05/08/2026"
    //     }),
    // ]); 
    

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
};

init();