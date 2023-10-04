import React from 'react'

import * as SQLite from "expo-sqlite"


const dbName = 'MedControlDB.db';
const tableName = 'ControlMedicamentos';
const db = SQLite.openDatabase(dbName)

const getUsers = (setUserFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from users',
        [],
        (_, { rows: { _array } }) => {
          setUserFunc(_array)
        }
      );
    },
    (t, error) => { console.log("db error load users"); console.log(error) },
    (_t, _success) => { console.log("loaded users")}
  );
}

const insertUser = (userName, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into users (name) values (?)', [userName] );
    },
    (t, error) => { console.log("db error insertUser"); console.log(error);},
    (t, success) => { successFunc() }
  )
}

const dropDatabaseTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'drop table users',
        [],
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping users table"); reject(error)
        }
      )
    })
  })
}

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          `create table if not exists ${tableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_medicamento VARCHAR(255) NOT NULL,
            dosis INTEGER NOT NULL,
            periodo INT NOT NULL,
            fecha_hora INTEGER NOT NULL
        )`
        );
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}

const setupUsersAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( `insert into ${tableName} (title) values (?)`, ["john"] );
      },
      (t, error) => { console.log("db error insertUser"); console.log(error); resolve() },
      (t, success) => { resolve(success)}
    )
  })
}
const setupMedicamentosAsync = async (medicamento) => {
  return new Promise((resolve, _reject) => {
    db.transaction(tx => {
        tx.executeSql(
          `insert into ${tableName} (nombre_medicamento, dosis, periodo, fecha_hora) values (?, ?, ?, ?)`, 
          [medicamento.nombre_medicamento, medicamento.dosis, medicamento.periodo, medicamento.fecha_hora]
        );
      },
      (t, error) => { 
        console.log("db error insertMedicamento"); 
        console.log(error); 
        resolve(); 
      },
      (t, success) => { 
        resolve(success);
      }
    )
  })
}


const getTasks = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `select * from ${tableName}`,
          [],
          (_, { rows: { _array } }) => {
            resolve(_array); // Resuelve la promesa con el array de tareas
          }
        );
      },
      (t, error) => {
        console.log("db error load tasks"); // Cambiado "users" por "tasks"
        console.log(error);
        reject(error); // Rechaza la promesa en caso de error
      },
      (_t, _success) => {
        console.log("loaded tasks"); // Cambiado "users" por "tasks"
      }
    );
  });
}


export const database = {
  getUsers,
  insertUser,
  setupDatabaseAsync,
  setupUsersAsync,
  getTasks,
  setupMedicamentosAsync,
  dropDatabaseTablesAsync,
}