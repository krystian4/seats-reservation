import React, { useEffect, useState } from 'react'
import { Row, Button, Col } from 'antd';
import Seat from './Seat';
import { incrementStep } from '../slices/seatsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectChosenSeats, selectNumberOfSeats } from '../slices/seatsSlice';

export default function CinemaRoom() {
    const [seats, setSeats] = useState([]);
    const dispatch = useDispatch();
    const chosenSeats = useSelector(selectChosenSeats);
    const numberOfSeats = useSelector(selectNumberOfSeats);


    useEffect(() => {
        //fetchSeat
        fetch("http://localhost:3000/seats")
            .then(res => res.json())
            .then(
                result => {
                    result.sort((a, b) => (a.cords.x - b.cords.x || a.cords.y - b.cords.y));
                    setSeats(result);
                },
                error => {
                    console.log(error);
                })
    }, [])

    function generateRoom() {
        let yTemp = 0;
        let prevX = 0;
        let colList = [];
        let roomList = [];
        seats.forEach((seat) => {
            if (seat.cords.x > prevX) {
                prevX++;
                yTemp = 0;
                roomList.push(<Row className="seats-row" key={'row' + seat.cords.x} wrap={false}>{colList}</Row>);
                colList = [];
            }
            while (yTemp < seat.cords.y) {
                colList.push(<Seat key={yTemp + seat.cords.x} hidden={true} />);
                yTemp++;
            }
            if (seat.cords.x === prevX) {
                colList.push(<Seat key={seat.id} seat={seat} />);
                yTemp++;
            }
            else {
                colList.push(<Seat hidden={true} />);
                roomList.push(<Row className="seats-row" wrap={false}>{colList}</Row>);
                colList = [];
                yTemp = 0;
            }
            if (seat.cords.x > prevX) {
                colList.push(<Seat key={seat.id} seat={seat} />);
                prevX++;
                yTemp++;
            }
        })
        roomList.push(<Row className="seats-row" key={'last'} wrap={false}>{colList}</Row>)
        return (
            <div className="room-seats">
                <Row justify="center">
                    <Col>{roomList}</Col>
                </Row>
            </div>
        )
    }

    function handleReservation() {
        if (chosenSeats.length !== numberOfSeats) {
            alert('Proszę wybrać wszystkie miejsca');
        }
        else {
            dispatch(incrementStep());
        }
    }

    return (
        <div className="room">
            {generateRoom()}
            <Row gutter={[8, 8]} className="seats-legend" justify="center">
                <Col className="square seat" /><span>Miejsce dostępne</span>
                <Col className="square seat seat-reserved" /><span>Miejsce zarezerwowane</span>
                <Col className="square seat seat-chosen" /><span>Twój wybór</span>


                <Button className="button" onClick={handleReservation}>Rezerwuj</Button>
            </Row>

        </div>
    )
}
