import { Play } from "@phosphor-icons/react";
import { FormContainer, HomeContainer, 
  CountdownContainer, Separator, StartCountdownButton,
  TaskInput,
  MinutesAmountInput
} from "./styles";

export function Home() {

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task" >Vou trabalhar em</label>
          <TaskInput 
            placeholder="Dê um nome para o seu projeto" 
            list="task-suggestions"
            id="task" 
          />

          <label htmlFor="">Durante</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>Minutos.</span>
        </FormContainer>
      
    
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled >
          Começar <Play size={24}/>
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
