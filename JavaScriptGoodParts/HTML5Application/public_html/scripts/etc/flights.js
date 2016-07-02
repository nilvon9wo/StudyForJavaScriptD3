var flight = {
		airline: "Oceanic",
		number : 815,
		departure: {
			IATA: "SYD",
			time: "2004-09-22 14:55",
			city: "Sydney"
		},
		arrival: {
			IATA: "LAX",
			time: "2004-09-23 10:42",
			city: "Los Angeles"
		}
}

var IATA = flight.departure.IATA;
var status = flight.status || "unknown";

var equipment = flight.equipment;
var model     = equipment && equipment.model;
equipment = {
		model: 'Boeing 777'
};

flight.status = 'overdue';

var numberType = typeof flight.number;
var statusType = typeof flight.status;
var arrivalType = typeof flight.arrival;
var manifestType = typeof flight.manifest;

var flightStringType = typeof flight.toString;
var flightConstructorType = typeof flight.constructor;