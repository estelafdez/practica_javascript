import readline from 'readline'

const students = [{
    age: 32,
    examScores: [],
    gender: 'male',
    name: 'edu'
},
{
    age: 29,
    examScores: [],
    gender: 'female',
    name: 'silvia'
}]

const availableMaleNames = ['pepe', 'juan', 'victor', 'Leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

function calculateRandom(min, max) {
    const RandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return RandomNumber;
}

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
})

const isInt = (str) => {
    const integer = parseInt(str);
    if (Number.isNaN(integer)) {
        return false;
    } else {
        return true;
    }
}

function getorder() {
    const promise = new Promise((resolve, reject) => {
        rl.question(' Introduce el número de la operación que quieres realizar:', (num) => {
            rl.pause();
            if (isInt(num)) {
                num = Number.parseInt(num);
                resolve(num);
            } else {
                reject('Introduce un número, por favor')
            }
        })
    })

    return promise;
}

async function whaTodo() {
    let numberconsole
    do {
        try {
            numberconsole = await getorder();
        } catch (error) {
            console.log(error);
            Process.exit(0);
        }
        if (numberconsole == 0) {
            rl.close();
            console.log('Vuelve Pronto')
        } else {
            orders(numberconsole);
        }
    }
    while (numberconsole != 0)

}

function orders(numberconsole) {
    switch (numberconsole) {
        case 1: /* 1- Mostrar en formato de tabla todos los alumnos */
            console.table(students);
            break;

        case 2: /*2- Mostrar por consola la cantidad de alumnos que hay en clase*/
            console.log(students.length);
            break;

        case 3: /*3- Mostrar por consola todos los nombres de los alumnos*/
            console.log( 'El listado de alumnos es:')
            students.forEach(student => console.log(student.name));
            break;

        case 4: /*4- Eliminar el último alumno de la clase*/
            students.pop();
            console.log( 'El listado de alumnos actual es:')
            students.forEach(student => console.log(student.name));
            break;

        case 5: /*5- Eliminar un alumno aleatoriamente de la clase*/
            const position = calculateRandom(0, students.length - 1);
            students.splice(position, 1);
            console.table(students);
            break;

        case 6: /*6- Mostrar por consola todos los datos de los alumnos que son chicas*/
            students.forEach(student => {
                if (student.gender === 'female') {
                    return console.log(student)
                }
            });
            break;

        case 7: /*7- Mostrar por consola el número de chicos y chicas que hay en la clase*/

            let females = 0;
            let males = 0;

            students.forEach(student => {
                if (student.gender === 'male') {
                    males += 1
                } else {
                    females += 1
                }
            });
            console.log('Hombres:', males, 'Mujeres:', females);
            break;

        case 8: /*8- Mostrar true o false por consola si todos los alumnos de la clase son chicas*/

            console.log(students.every(student => student.gender === 'female'));
            break;

        case 9: /*9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años*/

            const twentie = students.filter(students => students.age >= 20 && students.age <=25);
            console.log(' Los alumnos que tienen entre 20 y 25 años son:');
            twentie.forEach(student => console.log(student.name));
            
            break;

        case 10: /*10- Añadir un alumno nuevo con los siguientes datos:(nombre aleatorio, edad aleatoria entre 20 y 50  años,género aleatorio, listado de calificaciones vacío¡OJO!, el nombre y el género tienen que ir acordes)*/

            const randomGender = availableGenders[Math.floor(Math.random() * availableGenders.length)];
            let randomName = '';
            if (randomGender === 'male') {
                randomName += availableMaleNames[Math.floor(Math.random() * availableMaleNames.length)]
            } else if (randomGender === 'female') {
                randomName += availableFemaleNames[Math.floor(Math.random() * availableFemaleNames.length)]
            };
            students.push({
                age: calculateRandom(20, 50),
                examScores: [],
                gender: randomGender,
                name: randomName,
            });
            console.table(students);
            break;

        case 11:/*11- Mostrar por consola el nombre de la persona más joven de la clase.(¡OJO!, si varias personas de la clase comparten la edad más baja, cualquiera de ellos es una respuesta válida)*/

            let ages = []
            students.forEach(student => { ages.push([student.age]); })
            const min = Math.min(...ages);
            for (let index = 0; index < students.length; index++) {
                if (students[index].age === min) {
                    return console.log(students[index].name);
                }
            }
            break;

        case 12: /*12- Mostrar por consola la edad media de todos los alumnos de la clase*/

            const sumAge = students.reduce((accum, students) => accum + students.age, 0) / students.length;
            console.log(sumAge);
            break;

        case 13: /* 13- Mostrar por consola la edad media de las chicas de la clase*/

            let newListFem = [];
            students.forEach(students => {
                if (students.gender === 'female') {
                    newListFem.push(students.age);
                }
            })
            const sum = newListFem.reduce((accum, girl) => accum + girl, 0) / newListFem.length;
            console.log(sum);
            break;

        case 14: /*14- Añadir nueva nota a los alumnos. Por cada alumno de la clase, tendremos que calcular una nota de forma aleatoria(número entre 0 y 10) y añadirla a su listado de notas*/
            students.forEach(student => {
                student.examScores.push(calculateRandom(1, 10))
            })
            console.log(students);
            break;

        case 15: /*15- Ordenar el array de alumnos alfabéticamente según su nombre*/

            console.table(students.sort(function (student1, student2) {
                if (student1.name > student2.name) {
                    return 1;
                } else if (student1.name < student2.name) {
                    return -1;
                }
                return 0;
            }))
            break;

        case 16: /*16- Mostrar por consola el alumno de la clase con las mejores notas(El alumno con mejores notas es aquel cuyo sumatorio de todas sus notas es el valor más alto de todos)*/

            let maxScores = [];
            students.forEach(student =>
                maxScores.push(student.examScores.reduce((accum, score) => accum + score, 0)))
            const max = Math.max(...maxScores);
            for (let index = 0; index < students.length; index++) {
                const suma = students[index].examScores.reduce((accum, nota) => accum + nota, 0)
                if (suma === max) {
                    return console.log(students[index]);
                }
            }
            break;

        case 17: /* 17- Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece*/

            let averageScore = [];
            students.forEach(student =>
                averageScore.push(student.examScores.reduce((accum, nota) =>
                    accum + nota, 0) // student.examScores.length
                ));
            const maxnota = Math.max(...averageScore);
            for (let index = 0; index < students.length; index++) {
                const media = students[index].examScores.reduce((accum, nota) =>
                    accum + nota, 0) / students[index].examScores.length;
                if (media === maxnota) {
                    return console.log(students[index].name, media);
                }
            }
            break;

        case 18: /* 18- Añadir un punto extra a cada nota existente de todos los alumnos. Recordad que la nota máxima posible es 10. Si los alumnos aún no tienen registrada ninguna nota, les pondremos un 10*/

            for (let index = 0; index < students.length; index++) {
                students[index].examScores = (students[index].examScores.map(function (x) {
                    if (x < 10) {
                        return x += 1;
                    } else {
                        return x;
                    }
                }))
                if (students[index].examScores.length == 0) {
                    students[index].examScores.push(10);
                }
            }
            console.table(students);
            break;
    }
}
whaTodo()