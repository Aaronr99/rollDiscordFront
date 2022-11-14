import { Card, Grid, Container, MenuItem, Select, InputLabel, Typography, Link } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import convertNumber from './convertNumber';

function Atributes(props: any) {
    const optionsArray = Array.from({ length: 20 }, (_, i) => i + 1)


    useEffect(() => {
        setTimeout(() => {
            if (props.atribute === "") {
                props.valueChange("10")
            }
        }, 100)
    }, [props])

    async function RollDice() {
        axios.get(`http://localhost:50000/roll/20/${props.atribute}/${props.id}`)
        .then(res => console.log(res.data))
    }

    return (
        <Card sx={{ width: 350, height: 100 }}>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Container>
                        <InputLabel id={`${props.name}-label`}> {props.name} </InputLabel>
                        <Select
                            labelId={`${props.name}-label`}
                            value={props.atribute}
                            label={props.name}
                            onChange={(x) => {
                                props.valueChange(x.target.value)
                                }}>
                            {
                                optionsArray.map((x: number) => (
                                    <MenuItem key={`key-${x}`} value={x.toString()}> {x} </MenuItem>
                                ))
                            }
                        </Select>
                    </Container>
                </Grid>
                <Grid item container xs={6}>
                    <Container>
                        <Link href='#' onClick={() => RollDice()} variant={"h5"}> ROLL DICE: </Link>
                        <Typography align='center' variant={"h4"}>  {convertNumber(props.atribute)} </Typography>
                    </Container>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Atributes;