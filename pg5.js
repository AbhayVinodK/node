const { Client } = require("pg");
const input = require("prompt-sync")();

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "student",
    password: "root",
    port: 5432
});

async function run() {
    await client.connect();
    console.log("Connected to PostgreSQL");

    let ch;

    do {
        console.log("\na) Insert\nb) Update\nc) Delete\nd) View\ne) Exit");
        ch = input("Enter your choice: ");

        if (ch == "a") {
            const n = input("Enter name: ");
            const a = input("Enter age: ");

            await client.query(
                "INSERT INTO students(name,age) VALUES($1,$2)",
                [n, a]
            );

            console.log("Data inserted successfully");
        }

        else if (ch == "b") {
            const id = input("Enter ID: ");
            const n = input("Enter new name: ");
            const a = input("Enter new age: ");

            await client.query(
                "UPDATE students SET name=$1,age=$2 WHERE id=$3",
                [n, a, id]
            );

            console.log("Data updated successfully");
        }

        else if (ch == "c") {
            const id = input("Enter ID: ");

            await client.query(
                "DELETE FROM students WHERE id=$1",
                [id]
            );

            console.log("Data deleted successfully");
        }

        else if (ch == "d") {
            const r = await client.query("SELECT * FROM students");
            console.table(r.rows);
        }

    } while (ch != "e");

    console.log("Exiting...");
    await client.end();
}

run();


/* CREATE TABLE students (
    id serial primary key,
    name varchar (50),
    age int
)
*/
