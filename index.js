const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            const allComments = getAllToDoComments();
            for (const comment of allComments) {
                console.log(comment);
            }
            break;
        case 'important':
            const importantTodos = allComments.filter(todo => todo.includes('!'));
            importantTodos.forEach(todo => console.log(todo));
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function getAllToDoComments() {
    const allComments = [];
    files.forEach(fileContent => {
        const lines = fileContent.split('\n');
        lines.forEach(line => {
            const index = line.indexOf('// TODO ');
            if (index !== -1){
                allComments.push(line.slice(index));
            }
        })
    })
    return allComments;
}



// TODO you can do it!
