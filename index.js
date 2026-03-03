const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function getTodos() {
    const allComments = [];
    files.forEach(fileContent => {
        const lines = fileContent.split('\n');
        lines.forEach(line => {
            const index = line.indexOf('// TODO ');
            if (index !== -1) {
                const rawTodo = line.slice(index);
                const parsed = parseTodo(rawTodo);
                allComments.push(parsed);
            }
        })
    })
    return allComments;
}

function parseTodos(line) {
    const content = line.replace('// TODO ', '');

    const result = {
        text: '',
        user: null,
        date: null,
        importance: 0
    };

    const parts = content.split(';');
    if (parts.length >= 3) {
        result.user = parts[0].trim() || null;
        result.date = parts[1].trim() ? new Date(parts[1].trim()) : null;
        result.text = parts[2].trim();
    } else {
        result.text = content.trim();
    }

    return result;
}

function processCommand(command) {
    const allTodos = getTodos();
    const [command, arg] = command.split(' ');

    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            allTodos.forEach(todo => console.log(todo))
            break;
        case 'important':
            const importantTodos = allTodos.filter(todo => todo.includes('!'));
            importantTodos.forEach(todo => console.log(todo));
            break;
        case 'user':
            if (!arg){
                console.log('Please, specify the user');
                break;
            }
            const userTodos = todos.filter(todo => todo.user && todo.user.toLowerCase() === arg.toLowerCase());
            userTodos.forEach(user => console.log(user));
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
