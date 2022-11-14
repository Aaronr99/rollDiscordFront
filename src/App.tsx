import { ContentCopy } from '@mui/icons-material';
import { Button, Container, Grid, IconButton, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Atributes from './Atributes';

function App(): JSX.Element {

  const [charName, setCharName] = useState("")
  const [strenght, setStr] = useState("")
  const [dexterity, setDex] = useState("")
  const [constitution, setCon] = useState("")
  const [inteligence, setInt] = useState("")
  const [wisdom, setWis] = useState("")
  const [charisma, setChar] = useState("")

  const [charID, setCharID] = useState("")

  function GetID() {
    if (charID === "" && charName !== null) {
      axios.post("http://localhost:50000/chars", {
        name: charName,
        strenght: strenght,
        dexterity: dexterity,
        inteligence: inteligence,
        constitution: constitution,
        wisdom: wisdom,
        charisma: charisma
      }).then((res: any) => {
        console.log(res.data)
        setCharID(res.data._id)
      })
    }
    else if (charID !== "" && charName !== null) {
      axios.patch(`http://localhost:50000/chars/${charID}`, {
        name: charName,
        strenght: strenght,
        dexterity: dexterity,
        inteligence: inteligence,
        constitution: constitution,
        wisdom: wisdom,
        charisma: charisma
      }).then((res: any) => {
        console.log(res.data)
      })
    }
  }

  async function GetByID() {
    if (charID !== "") {
      await axios.get(`http://localhost:50000/getChar/${charID}`)
        .then(res => {
          console.log(res.data)
          SetValues(res.data)
        })
    }
    else {
      console.log("No existe el character")
    }

  }

  function SetValues(character: any) {
    setStr(character.strenght)
    setDex(character.dexterity)
    setCharName(character.name)
    setCon(character.constitution)
    setInt(character.inteligence)
    setWis(character.wisdom)
    setChar(character.charisma)
  }

  return (
    <Container>
      <Typography variant={"h2"} gutterBottom align='center'> ROLL DICE DISCORD APP </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} spacing={2} container>
          <Atributes name="Strenght" atribute={strenght} valueChange={setStr} id={charID}/>
          <Atributes name="Dexterity" atribute={dexterity} valueChange={setDex} id={charID}/>
          <Atributes name="Constitution" atribute={constitution} valueChange={setCon} id={charID}/>
          <Atributes name="Intelligence" atribute={inteligence} valueChange={setInt} id={charID}/>
          <Atributes name="Wisdom" atribute={wisdom} valueChange={setWis} id={charID}/>
          <Atributes name="Charisma" atribute={charisma} valueChange={setChar} id={charID}/>

        </Grid>
        <Grid item xs={6}>
          <InputLabel id={'charName-field'}> Character Name </InputLabel>
          <TextField
            required
            id="charName-field"
            label="Name"
            value={charName}
            onChange={(x: any) => { setCharName(x.target.value) }}
          />
          <InputLabel id={'charID-disabled'}> Character ID </InputLabel>
          <TextField
            disabled
            id="charID-disabled"
            label="ID"
            value={charID}
            onPaste={async () => await navigator.clipboard.readText().then((res: string) => setCharID(res))}
          />
          <IconButton aria-label="copy" onClick={async () => await navigator.clipboard.writeText(charID)}>
            <ContentCopy />
          </IconButton>
          <Button sx={{ display: 'block' }} onClick={() => GetID()} variant="contained"> Actualize </Button>

          <Button sx={{ display: 'block' }} onClick={() => GetByID()} variant="contained"> Load </Button>
        </Grid>
      </Grid >
    </Container >
  );
}

export default App;
