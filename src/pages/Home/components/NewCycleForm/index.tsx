import { FormContainer, TaskInput, MinutesAmountInput } from "./styles"
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(1, 'Valor minimo de 60 minutos')
    .max(60, 'Valor máximo de 60 minutos'),
})


export const NewCycleForm = () => {
  const {register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })


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
            min={1}
            max={60}

            {...register('minutesAmount', { valueAsNumber: true})}
          />

          <span>Minutos.</span>
        </FormContainer>
    )
}