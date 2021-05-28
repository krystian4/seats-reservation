import React, { useEffect, useState } from 'react';
import {Col } from 'antd';
import { selectChosenSeats, selectNumberOfSeats } from '../slices/seatsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenSeats} from '../slices/seatsSlice';

export default function Seat(props) {
    const [dispatchDone, setDispatchDone] = useState(false);
    const [arrLength, setArrLength] = useState(0);
    const [reserved, setReserved] = useState(false);
    const hidden = (props.hidden || false);
    const [chosen, setChosen] = useState(false);
    const numberOfSeats = useSelector(selectNumberOfSeats);
    const chosenSeats = useSelector(selectChosenSeats);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.seat){
            setReserved(props.seat.reserved);
        }
    }, [props.seat])

    useEffect(()=>{
        if(dispatchDone){
            if(arrLength !== chosenSeats.length){
                setChosen(!chosen);
            }
            setDispatchDone(false);
        }
    }, [arrLength, chosen, chosenSeats.length, dispatchDone])

    function handleClick(){
        setArrLength(chosenSeats.length);

        if(!reserved && !hidden && (chosenSeats.length < numberOfSeats || chosen)) {
            dispatch(setChosenSeats(props.seat));
            setDispatchDone(true);
        }


    }

    return (
        <React.Fragment>
            <Col 
                className={"square " + (hidden ? "" : "seat ") +
                            (reserved && !hidden ? "seat-reserved " : "") +
                            (chosen && !hidden ? "seat-chosen " : "")} 
                onClick={handleClick}
            ></Col>
        </React.Fragment>
    )
}
