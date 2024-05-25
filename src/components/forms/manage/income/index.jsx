import { Add } from "@mui/icons-material"
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import { DateCalendar } from "@mui/x-date-pickers"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const AddIncomeForm = () => {
    const { register, watch, handleSubmit } = useForm()
    const [paymentStartDate, setPaymentStartDate] = useState(new Date())
    const addIncome = ({ name, amount, paydayFrequency}) => {
        const data = {
            name,
            amount: amount,
            paymentFrequency: {
                startDate: paymentStartDate,
                interval: paydayFrequency
            }
        }
        fetch('/api/income', {
            method: 'PUT',
            body: JSON.stringify({ ...data })
        }).then(res => res.json()).then(json => console.log(json))
    }

    return (
        <Paper>

            <Stack
                component={'form'}
                onSubmit={handleSubmit(addIncome)}
                autoComplete="off"
                spacing={4}
                p={2}
                noValidate>
                <FormControl>
                <Grid item component={'header'}>
                    <Typography variant="h3" >
                        Add Income
                    </Typography>
                </Grid>
                </FormControl>
                <FormControl>
                    
                    {/* Name */}
                    <TextField
                        variant="filled"
                        defaultValue={'Mysterious Income'}
                        label={'Name'}
                        {...register("name", {
                            required: true,
                        })} />
                        </FormControl>
                        <FormControl>
                        
                        {/* Amount */}
                    <TextField
                        variant="filled"
                        defaultValue={1}
                        type="number"
                        label={'Amount'}
                        helperText={'If this is your wages, input the ammout you get on payday. no need for tax details.'}
                        {...register("amount", {
                            required: true,
                        })} />

                        </FormControl>
                        <FormControl>
                        {/* Last Payday */}
                        {/* <InputLabel id="last-payday-input-label">Last Payment</InputLabel>
                    <TextField 
                    type="date" 
                    variant="filled" 
                    id="last-payday-input" 
                    labelId="last-payday-input-label" 
                    name="lastPayday" 
                    {...register('lastPayday')} /> */}
<DateCalendar onChange={data => setPaymentStartDate(data?.toISOString())} title={'Last Payment Date'} disableFuture={true}  />
                        </FormControl>
                        <FormControl>
                        {/* Frequency */}
                        <InputLabel id="payday-interval-select-label">Payment Interval</InputLabel>
                    <Select variant="filled" helperText={'How often do you get paid?'} name="paydayFrequency" labelId="payday-interval-select-label" {...register('paymentInterval')}>
                        <MenuItem value={undefined} />
                        <MenuItem value={'weekly'}>Weekly</MenuItem>
                        <MenuItem value={'fortnightly'}>Fortnightly</MenuItem>
                        <MenuItem value={'fourweekly'}>4-weekly</MenuItem>
                        <MenuItem value={'monthly'}>Monthly</MenuItem>
                        <MenuItem value={'quarterly'}>Quarterly</MenuItem>
                        <MenuItem value={'annually'}>Annually</MenuItem>
                    </Select>

                <Grid>
                    <IconButton variant="contained" type="submit">
                        <Add />
                    </IconButton>
                </Grid>
                </FormControl>
            </Stack>
        </Paper>
    )
}

export const DeleteIncomeForm = () => {
    return (<></>)
}
export const EditIncomeForm = () => {
    return (<></>)
}