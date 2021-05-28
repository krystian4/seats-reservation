import React from 'react'
import ChooseSeats from '../components/CinemaRoom';
import NumberOfSeatsForm from '../components/NumberOfSeatsForm'
import ReservationComplete from '../components/ReservationComplete';
import { useSelector } from 'react-redux';
import { selectStep } from '../slices/seatsSlice';

export default function SeatReservationPage() {

    const reservationStep = useSelector(selectStep);

    function getStepContent(step){
        switch(step){
            case 0:
                return <NumberOfSeatsForm />;
            case 1:
                return <ChooseSeats />;
            case 2:
                return <ReservationComplete />
            default:
                throw new Error('Unknown step');
        }
    }
    return (
        <React.Fragment>
            {getStepContent(reservationStep)}
        </React.Fragment>
    )
}

//Actual reservations step


