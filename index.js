// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());

// let cars = [
//     { "color": "blue", "make": "Toyota", "model": "Corolla", "reg_number": "CY 12345" },
//     { "color": "orange", "make": "Ford", "model": "Fiesta", "reg_number": "CL 77790" }
// ];

// // Function to get the most popular car make
// function mostPopularCar(cars) {
//     if (cars.length === 0) {
//         return null;
//     }

//     const makeCount = cars.reduce((acc, car) => {
//         acc[car.make] = (acc[car.make] || 0) + 1;
//         return acc;
//     }, {});

//     return Object.keys(makeCount).reduce((a, b) => makeCount[a] > makeCount[b] ? a : b);
// }



// // Most Popular Car Make
// app.get('/mostPopularCar', (req, res) => {
//     const popularCar = mostPopularCar(cars);
//     if (popularCar) {
//         res.json({ mostPopularCar: popularCar });
//     } else {
//         res.status(404).json({ error: 'No cars available' });
//     }
// });

// // Add a Car and Update Most Popular Car Make
// app.post('/mostPopularCar', (req, res) => {
//     const newCar = req.body;
//     cars.push(newCar);
//     const popularCar = mostPopularCar(cars);
//     res.status(201).json({ message: "Car added successfully and most popular car make updated", car: newCar, mostPopularCar: popularCar });
// });

// // Update a Car and Recalculate Most Popular Car Make
// app.put('/mostPopularCar/:reg_number', (req, res) => {
//     const reg_number = req.params.reg_number;
//     const carIndex = cars.findIndex(car => car.reg_number === reg_number);

//     if (carIndex !== -1) {
//         const updatedCar = { ...cars[carIndex], ...req.body };
//         cars[carIndex] = updatedCar;
//         const popularCar = mostPopularCar(cars);
//         res.json({ message: "Car updated successfully and most popular car make recalculated", car: updatedCar, mostPopularCar: popularCar });
//     } else {
//         res.status(404).json({ message: "Car not found" });
//     }
// });

// // Delete a Car and Recalculate Most Popular Car Make
// app.delete('/mostPopularCar/:reg_number', (req, res) => {
//     const reg_number = req.params.reg_number;
//     const carIndex = cars.findIndex(car => car.reg_number === reg_number);

//     if (carIndex !== -1) {
//         cars.splice(carIndex, 1);
//         const popularCar = mostPopularCar(cars);
//         res.json({ message: "Car deleted successfully and most popular car make recalculated", mostPopularCar: popularCar });
//     } else {
//         res.status(404).json({ message: "Car not found" });
//     }
// });

// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let cars = [
    { reg_number: 'ABC123', make: 'Toyota', model: 'Corolla', color: 'Blue' },
    { reg_number: 'XYZ456', make: 'Honda', model: 'Civic', color: 'Red' },
];

app.get('/', (req, res) => {
    res.send('Welcome to the Car CRUD App API!');
});

app.get('/cars', (req, res) => {
    res.json(cars);
});

app.get('/mostPopularCar', (req, res) => {
    const popularMake = 'Toyota'; 
    res.json({ popularMake });
});

app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});

app.put('/cars/:reg_number', (req, res) => {
    const reg_number = req.params.reg_number;
    let car = cars.find(c => c.reg_number === reg_number);
    if (car) {
        Object.assign(car, req.body);
        res.json(car);
    } else {
        res.status(404).json({ error: 'Car not found' });
    }
});

app.delete('/cars/:reg_number', (req, res) => {
    cars = cars.filter(c => c.reg_number !== req.params.reg_number);
    res.json({ message: 'Car deleted' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
