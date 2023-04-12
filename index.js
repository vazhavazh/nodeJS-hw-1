const contacts = require("./contacts")

const { Command } = require("commander");
const program = new Command();


program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contactList = await contacts.listContacts();
            console.table(contactList);
            break;

        case "get":
            const contactById = await contacts.getContactById(id);
            console.log(contactById);
            break;

        case "add":
            const newContact = await contacts.addContact(name, email, phone);
            console.log(newContact);
            break;

        case "remove":
            const deletedBook = await contacts.removeContact(id);
            console.log(deletedBook);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);