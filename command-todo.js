const { Command } = require("commander");
const fs = require("fs");
const newCommand = new Command();

newCommand.name("todo").description("TODO List").version("0.0.1");

newCommand
  .command("get-add")
  .description("Get All JSON")
  .action((str) => {
    getAll(str);
  });

newCommand
  .command("add-todo")
  .description("Add Your TODO List")
  .argument("<string>", "String Add TODO")
  .action((str) => {
    addTodo(str);
  });

newCommand
  .command("update-todo")
  .description("Update Your TODO")
  .argument("<id>", "ID for Update TODO")
  .argument("<string>", "String for Update TODO")
  .action((id, str) => {
    updateTodo(id, str);
  });

newCommand
  .command("delete-todo")
  .description("Delete Your TODO")
  .argument("<id>", "ID for Delete TODO")
  .action((id) => {
    deleteTodo(Number.parseInt(id));
  });

newCommand.parse();

// Command Code End

function getAll() {
  const json = getJsonObj();
  console.log(json);
}

function addTodo(str) {
  const json = getJsonObj();
  const currentId = getNextId(json);
  const data = {
    id: currentId,
    text: str,
  };
  json.push(data);
  setJsonObjectToFile(json);
}

function updateTodo(id, str) {
  const json = getJsonObj();
  if (json || json.length > 0) {
    json.map((obj) => {
      if (obj.id == id) {
        obj.text = str;
      }
    });
    setJsonObjectToFile(json);
  } else {
    console.log("Json is EMPTY");
  }
}

function deleteTodo(id) {
  const json = getJsonObj();
  if (json || json.length > 0) {
    const newjson = json.filter((obj) => obj.id != id);
    setJsonObjectToFile(newjson);
  } else {
    console.log("Json is EMPTY");
  }
}

function getNextId(json) {
  if (json) {
    return 1 + json[json.length - 1].id;
  }
  return 1;
}

function getJsonObj() {
  try {
    const fileData = fs.readFileSync("todo-storage.json", "utf-8");
    if (!fileData.trim()) {
      return [];
    }
    return JSON.parse(fileData);
  } catch (err) {
    return [];
  }
}

function setJsonObjectToFile(json) {
  fs.writeFileSync("todo-storage.json", JSON.stringify(json, null, 2));
}
