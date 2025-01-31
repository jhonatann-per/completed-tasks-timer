import { Play, HandPalm } from "@phosphor-icons/react";
import { HomeContainer, StartCountdownButton, StopCountdownButton
} from "./styles";
import * as zod from 'zod';
import { useState, createContext, useContext,  } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";


// type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CycleContextType)

export const Home = () => {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  const markCurrentCycleAsFinished = () => {
    setCycles(state => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() };
      } else {
        return cycle;
      }
    })
  );
  }


  // const handleCreateNewCycle = (data: NewCycleFormData) => {
  //   const id =  String(new Date().getTime());

  //   const newCycle: Cycle ={
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles(state => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)
  //   reset()
  // };


  const handleInterruptCycle = () => {
    setCycles(state => state.map(cycle => {
      if(cycle.id == activeCycleId) {
          return {...cycle, interruptedDate: new Date() }
        }else { 
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  // const task = watch('task')
  // const isSubmitDisbled = task == "";



  return (
    <HomeContainer>
      <form action="" /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ >
        <CyclesContext.Provider  value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>
        
      
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} > 
            Interromper <HandPalm size={24}/>
          </StopCountdownButton> 

              ) : (
        
          <StartCountdownButton /*disabled={isSubmitDisbled}*/ > 
            Começar <Play size={24}/>
          </StartCountdownButton>) }
        
      </form>
    </HomeContainer>
  );
}
