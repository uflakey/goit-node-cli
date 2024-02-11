const { program } = require("commander");
const contact = require("./db/contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContact = await contact.listContacts();
      return console.table(allContact);

    case "get":
      const getContact = await contact.getContactById(id);

      return console.log(getContact);

    case "add":
      const add = await contact.addContact(name, email, phone);
      return console.log(add);

    case "remove":
      const remove = await contact.removeContact(id);
      return console.log(remove);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
