import { FormContainer, TaskInput, MinutesAmountInput } from "./styles"
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";





export const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()
  
    return(
        <FormContainer>
          <label htmlFor="task" >Vou trabalhar em</label>
          <TaskInput 
            placeholder="Dê um nome para o seu projeto" 
            list="task-suggestions"
            id="task"
            disabled={!!activeCycle}
            {...register('task')}
            
          />

          <label htmlFor="">Durante</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount"
            placeholder="00"
            disabled={!!activeCycle}
            step={5}
            min={5}
            max={60}

            {...register('minutesAmount', { valueAsNumber: true})}
          />

          <span>Minutos.</span>
        </FormContainer>
    )
}