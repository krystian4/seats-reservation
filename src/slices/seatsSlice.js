import { createSlice } from "@reduxjs/toolkit";

function getNeighbours(chosenSeats, newSeat){
    let nOfNeighbours = 0;
    chosenSeats.forEach(seat =>{
        if(seat.cords.x === newSeat.cords.x 
            && Math.abs(seat.cords.y - newSeat.cords.y) === 1  ){
                nOfNeighbours++;
            }
    })
    return nOfNeighbours;
}

export const seatsSlice = createSlice({
    name: 'seats',
    initialState: {
        step: 0,
        chosenSeats: [],
        numberOfSeats: 0,
        neighbourSeats: false,
    },
    reducers: {
        incrementStep: (state) => {
            state.step += 1;
        },
        saveNumberOfSeats: (state, action) =>{
            state.numberOfSeats = action.payload;
        },
        setChosenSeats:(state,action) =>{
            //check if seat is already in array
            let index = state.chosenSeats.findIndex((el)=>
                el.id === action.payload.id
            )
            console.log()
            //if seat not in array - add new seat
            if(index === -1) {
                //if neighbour option chosen - check array length and neighbours
                if(state.neighbourSeats && state.chosenSeats.length > 0){
                    if(getNeighbours(state.chosenSeats, action.payload) > 0){
                        state.chosenSeats.push(action.payload);
                    }
                }
                //push if its first seat
                else{
                    state.chosenSeats.push(action.payload);
                }
            }
            //if seat in array and was clicked - remove it
            else{
                if(getNeighbours(state.chosenSeats, action.payload) < 2){
                    state.chosenSeats.splice(index, 1);
                }
            }
        },
        saveNeighbourSeats: (state, action) =>{
            state.neighbourSeats = action.payload;
        },
    }
})

//actions export
export const {incrementStep, saveNumberOfSeats, setChosenSeats, saveNeighbourSeats} = seatsSlice.actions;

export const selectStep = (state) => state.seats.step;
export const selectNumberOfSeats = (state) => state.seats.numberOfSeats;
export const selectNeighbourSeats = (state) => state.seats.neighbourSeats;
export const selectChosenSeats = (state) => state.seats.chosenSeats;


//reducer export
export default seatsSlice.reducer;

