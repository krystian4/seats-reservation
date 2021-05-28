import React, { useState } from 'react'
import { Space, InputNumber, Button, Checkbox, Row, Col } from 'antd';
import { incrementStep, saveNumberOfSeats, saveNeighbourSeats } from '../slices/seatsSlice';
import { useDispatch } from 'react-redux';

export default function NumberOfSeatsForm() {
    const dispatch = useDispatch();
    const [numberOfSeats, setNumberOfSeats] = useState(0);
    const [neighbourSeats, setNeighbourSeats] = useState(false);

    function handleChooseSeats() {
        if (numberOfSeats < 1) {
            alert("Proszę wybrać ilość miejsc");
            console.log(neighbourSeats);
            return;
        }
        dispatch(saveNumberOfSeats(numberOfSeats));
        dispatch(saveNeighbourSeats(neighbourSeats));
        dispatch(incrementStep());
    }
    return (
        <div className="flex-center">
            <Row justify="center" >
                <Col style={{ minWidth: "100px" }} align="middle" >
                    <Space direction="vertical">
                        <Row justify="space-between">
                            <span className="full-line">Liczba miejsc:</span>
                            <InputNumber
                                className="border"
                                min={0}
                                step={1}
                                precision={0}
                                onChange={(value) => setNumberOfSeats(value)}
                            ></InputNumber>
                        </Row>
                        <Row justify="space-between">
                            <Checkbox
                                onChange={(e) => setNeighbourSeats(e.target.checked)} />
                                Czy miejsca mają być obok siebie?
                        </Row>
                        <Row justify="center">
                            <Button
                                className="button"
                                onClick={handleChooseSeats}>
                                Wybierz miejsca
                            </Button>
                        </Row>
                    </Space>
                </Col>
            </Row>

        </div>
    )
}
