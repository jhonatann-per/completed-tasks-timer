import { Play, HandPalm } from "@phosphor-icons/react";
import { HomeContainer, StartCountdownButton, StopCountdownButton
} from "./styles";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";



const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(1, 'Valor mínimo de 1 minuto')
  .max(60, 'Valor máximo de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export const Home = () => {
  
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)
  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm;
  
  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisbled = task == "";



  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)} >
           <FormProvider {...newCycleForm}>
            <NewCycleForm /> 
           </FormProvider>
          <Countdown />
        
      
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} > 
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
