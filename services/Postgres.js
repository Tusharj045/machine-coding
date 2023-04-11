const { Client } = require('pg');
require('dotenv').config();
// create a new PostgreSQL client
// const client = new Client({
//     user: process.env.PGUSER,
//     host: process.env.PGHOST,
//     database: process.env.PGDATABASE,
//     password: process.env.PGPASSWORD,
//     port: process.env.PGPORT,
// });
const params = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
}
const client = new Client(params);


const Postgres = {
    insertItem: async (data) => {
        try {
            const client = new Client(params);
            await client.connect();
            console.log('Connected to the database');

            const query = {
                text: 'INSERT INTO users(id, name) VALUES($1, $2)',
                values: [data.id, data.name],
            };
        
            await client.query(query);
        
            console.log('Data inserted successfully');
        } catch (error) {
            console.error('Error connecting to the database:', error);
        } finally {
            await client.end();
            console.log('Connection to the database closed');
        }
    },
    checkConnection: async () => {
        try {
            const client = new Client(params);
            await client.connect();
            console.log('Connection successful!');
        } catch (error) {
            console.error('Error connecting to database:', error);
        } finally {
            await client.end();
        }
    },
    getAllItems: async () => {
        try {
            const client = new Client(params);
            await client.connect();
            const res = await client.query('SELECT * FROM items;');
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            await client.end();
        }
    },
    getItemById: async (id) => {
        try {
            const client = new Client(params);
            await client.connect();
            const res = await client.query(`SELECT * FROM items where id = ${id};`);
            return res.rows;
        } catch (err) {
            console.log('Error here: ', err);
            throw err;
        } finally {
            await client.end();
        }
    },
    addNewItem: async (name) => {
        try {
            const client = new Client(params);
            await client.connect();
            const res = await client.query('INSERT INTO items (name) VALUES ($1)', [name]);
            return res.rowCount;
        } catch (err) {
            console.log('Error here: ', err);
            throw err;
        } finally {
            await client.end();
        }
    },
    updateItem: async(id, name) => {
        try {
            const client = new Client(params);
            await client.connect();
            const res = await client.query('UPDATE items SET name = $1 WHERE id = $2', [name, id]);
            return res.rowCount;
        } catch (err) {
            console.log('Error here: ', err);
            throw err;
        } finally {
            await client.end();
        }
    },
    deleteItem: async (id) => {
        try {
            const client = new Client(params);
            await client.connect();
            const res = await client.query('DELETE FROM items WHERE id = $1', [id]);
            return res.rowCount;
        } catch (err) {
            console.log('Error here: ', err);
            throw err;
        } finally {
            await client.end();
        }
    }
}

module.exports = Postgres;
