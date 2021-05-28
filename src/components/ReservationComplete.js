import React from 'react'
import { useSelector } from 'react-redux';
import { selectChosenSeats } from '../slices/seatsSlice';
import { Row, Col } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

export default function ReservationComplete() {
    const chosenSeats = useSelector(selectChosenSeats);

    return (
        <div className="summary">
            <Row>
                <Title level={2} >Twoja rezerwacja przebiegła pomyślnie!</Title>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <Title level={5}>
                            Wybrałeś miejsca:
                </Title>
                    </Row>
                    <Row>
                        <p>
                            {chosenSeats.map((seat) => {
                                return (<span key={seat.id}>- rząd x{seat.cords.x}, miejsce y{seat.cords.y} ({seat.id})<br /></span>)
                            })}
                        </p>
                    </Row>
                </Col>
            </Row>
            <Row >
                <Title level={4}>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</Title>
            </Row>
        </div>
    )
}
