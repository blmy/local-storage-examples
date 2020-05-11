import createDataContext from "./createDataContext";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("myDB");

//Reducer
const sqliteReducer = (state, action) => {
  switch (action.type) {
    case "_sqliteGetUsers":
      return action.payload;
    default:
      return state;
  }
};

//Dispatch save actions
const sqliteSaveUser = (dispatch) => {
  const selectQuery = "select id, userName from users";
  const saveQuery = "insert into users (userName) values (?)";
  const params = [];

  return (user) => {
    //Working with expo react native SQLite.
    //db.transaction(callback function, error function, success function).
    //The callback function will always be
    //tx.executesql(sql statement, arguments, success function, error function).
    db.transaction((tx) => {
      //Insert user into tableName (column1, column2) values (value1, value2)
      //***NOTE*** Supposely I am able to call sqliteGetUsers in my 3rd argument, however, by doing so
      //app did not re-render to reflect the newest record. Therefore I need to rewrite the
      //select sql statement again after inserting new user. It seem like even if i call it anywhere
      //within the db.transaction or the function sqliteSaveUser, it still not working. Only works when
      //the whole select sql statement is written out.
      tx.executeSql(saveQuery, [user]);
      //Retrieve the latest data from DB.
      tx.executeSql(selectQuery, params, (_, { rows: { _array } }) => {
        dispatch({ type: "_sqliteGetUsers", payload: _array });
      });
    });
  };
};

//Dispatch update actions
const sqliteUpdateUser = (dispatch) => {
  const selectQuery = "select id, userName from users";
  const updateQuery = "update users set userName =";
  const params = [];

  return (user, userID) => {
    console.log(`this is ${user} with id ${userID}`);
    db.transaction((tx) => {
      //Strangely, to update a string the value has to be wrap with "" else it will not be updated.
      tx.executeSql(`${updateQuery}"${user}" where id = ${userID}`);
      //Retrieve the latest data from DB.
      tx.executeSql(selectQuery, params, (_, { rows: { _array } }) => {
        dispatch({ type: "_sqliteGetUsers", payload: _array });
      });
    });
  };
};

//Dispatch get actions
const sqliteGetUsers = (dispatch) => {
  const selectQuery = "select id, userName from users";
  const params = [];

  return () => {
    db.transaction((tx) => {
      //Retrieve latest data from DB.
      //First argument, sql statement.
      //Second argument, An array of values (numbers or strings) to substitute
      //for ? placeholders in the sql statement (first argument).
      //Third argument, upon successful retrival of data from DB, to call fucntion.
      //Fourth argument, upon unsuccessful retrival of data from DB, to call function.
      tx.executeSql(selectQuery, params, (_, { rows: { _array } }) => {
        dispatch({ type: "_sqliteGetUsers", payload: _array });
        console.log(_array);
      });
    });
  };
};

//Disptach remove actions
const sqliteRemoveUser = (dispatch) => {
  const selectQuery = "select id, userName from users";
  const deleteQuery = "delete from users where id =";
  const params = [];

  return (userID) => {
    db.transaction((tx) => {
      //Remove user.
      tx.executeSql(`${deleteQuery}${userID}`);
      //Retrieve the latest data from DB.
      tx.executeSql(selectQuery, params, (_, { rows: { _array } }) => {
        dispatch({ type: "_sqliteGetUsers", payload: _array });
      });
    });
  };
};

export const { Context, Provider } = createDataContext(
  sqliteReducer,
  { sqliteSaveUser, sqliteGetUsers, sqliteRemoveUser, sqliteUpdateUser },
  []
);
