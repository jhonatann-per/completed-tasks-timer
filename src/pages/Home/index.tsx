import { Play, HandPalm } from "@phosphor-icons/react";
import { HomeContainer, StartCountdownButton, StopCountdownButton
} from "./styles";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, createContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";



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
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CycleContextType)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(1, 'Valor mínimo de 1 minuto')
  .max(60, 'Valor máximo de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm;
  
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);
  
  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

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

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const id =  String(new Date().getTime());

    const newCycle: Cycle ={
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles(state => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  };


  const handleInterruptCycle = () => {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? { ...cycle, interruptedDate: new Date() }
          : cycle
      )
    );
    setActiveCycleId(null)
  }

  const task = watch('task')
  const isSubmitDisbled = task == "";



  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)} >
        <CyclesContext.Provider  
        value={{
          activeCycle, 
          activeCycleId, 
          markCurrentCycleAsFinished,
          amountSecondsPassed,
          setSecondsPassed,
        }}>
           <FormProvider {...newCycleForm}>
            <NewCycleForm /> 
           </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        
      
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} > 
            Interromper <HandPalm size={24}/>
          </StopCountdownButton> 

              ) : (
        
          <StartCountdownButton disabled={isSubmitDisbled} > 
            Começar <Play size={24}/>
          </StartCountdownButton>) }
        
      </form>
    </HomeContainer>
  );
}
