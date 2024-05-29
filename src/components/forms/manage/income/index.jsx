import { ToolbarFormDrawerControlsContext } from "@/components/structure/PageToolbar"
import { calculateNextPayday } from "@/lib/tools/compare-dates"
import { Add } from "@mui/icons-material"
import { Button, Card, CardContent, CardHeader, Chip, Fab, FormHelperText, Unstable_Grid2 as Grid, IconButton, Input, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const AddIncomeForm = () => {
    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const { toggleDrawer} = useContext(ToolbarFormDrawerControlsContext)
    const addIncome = ({ name, amount, paydayFrequency, lastPayday }) => {
        const data = {
            name,
            amount: amount,
            paymentFrequency: {
                startDate: lastPayday,
                interval: paydayFrequency
            }
        }
        fetch('/api/income', {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(toggleDrawer)
        .finally(() => window.location.reload())
    }


    return (
        <Card sx={{minWidth:'100%'}} p={2}>
            <CardHeader title="Add Income"/>
            <CardContent>

            <form
            onSubmit={handleSubmit((x)=>{
                console.log({x})
                addIncome(x)
            })}
            autoComplete="off"
            noValidate
            >
            <Grid container spacing={2} direction={'column'}>


                {/* Name */}
                <Grid xs={12}>
                    <TextField
                        fullWidth
                        label={'Name'}
                        {...register("name", {
                            required: true,
                        })} />

                </Grid>

                {/* Amount */}
                <Grid xs={12}>
                    <TextField
                        type="number"
                        label={'Amount'}
                        fullWidth
                        helperText={'If this is your wages, input the amout you get on payday. no need for tax details.'}
                        {...register("amount", {
                            required: true,
                        })} />
                </Grid>

                {/* Last Payday */}
                <Grid xs={12}>
                    <Typography component={'label'} htmlFor="last-payday-input" variant="subtitle2">
                    When were you last paid this amount?
                    </Typography>
                    <TextField
                        type="date"
                        id="last-payday-input"
                        fullWidth
                        inputProps={{ ...register('lastPayday') }} />
                </Grid>

                <Grid xs={12}>
                {/* Frequency */}
                    <Typography component={'label'} htmlFor="last-payday-input" variant="subtitle2">
                    How often are you paid this amount?
                    </Typography>
                    <Select
                        components={'select'}
                        id="payday-interval-select"
                        fullWidth
                        defaultValue={'monthly'}
                        {...register('paydayFrequency')}
                        >
                        <MenuItem value={'weekly'}>Weekly</MenuItem>
                        <MenuItem value={'fortnightly'}>Fortnightly</MenuItem>
                        <MenuItem value={'fourweekly'}>4-weekly</MenuItem>
                        <MenuItem value={'monthly'}>Monthly</MenuItem>
                        <MenuItem value={'quarterly'}>Quarterly</MenuItem>
                        <MenuItem value={'annually'}>Annually</MenuItem>
                    </Select>

                </Grid>
                <Grid xs={12} align={'end'}>
                    <Fab type="submit">
                        <Add />
                    </Fab>
                </Grid>
            </Grid>
    </form>
    </CardContent>
        </Card>
    )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const EditIncomeForm = ({ income }) => {
    const { register, watch, handleSubmit } = useForm()
    const editIncome = ({ name, amount, paydayFrequency }) => {
        // const data = {
            //     name,
            //     amount: amount,
        //     paymentFrequency: {
            //         startDate: paymentStartDate,
        //         interval: paydayFrequency
        //     }
        // }
        // fetch('/api/income', {
        //     method: 'PATCH',
        //     body: JSON.stringify({ ...data })
        // }).then(res => res.json()).then(json => console.log(json))
    }
    let pIncome = { ...income, paymentFrequency: { ...income.paymentFrequency, startDate: new Date(income.paymentFrequency.startDate) } }
    let date = pIncome.paymentFrequency.startDate
    return (
        <Paper>

            <Stack
                component={'form'}
                onSubmit={handleSubmit(editIncome)}
                autoComplete="off"
                spacing={4}
                p={2}
                noValidate>
                <Grid>
                    <Grid item component={'header'}>
                        <Typography >
                            Edit Income
                        </Typography>
                    </Grid>


                    {/* Name */}
                    <TextField

                        defaultValue={pIncome.name}
                        label={'Name'}
                        {...register("name", {
                            required: true,
                        })} />


                    {/* Amount */}
                    <TextField

                        defaultValue={Number.parseFloat(pIncome?.amount / 100 || '0.00').toFixed(2)}
                        type="number"
                        label={'Amount'}
                        helperText={'If this is your wages, input the ammout you get on payday. no need for tax details.'}
                        {...register("amount", {
                            required: true,
                        })} />


                    {/* Last Payday */}
                    <InputLabel id="last-payday-input-label">Last Payment</InputLabel>
                    <TextField
                        type="date"
                        labelId="last-payday-input-label"
                        name="lastPayday"
                        value={`${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`}
                        {...register('lastPayday')} />

                    {/* Frequency */}
                    <InputLabel id="payday-interval-select-label">Payment Interval</InputLabel>
                    <Select
                        name="paydayFrequency"
                        labelId="payday-interval-select-label"
                        defaultValue={income?.paymentFrequency?.interval || 'weekly'}
                        {...register('paymentInterval')}>
                        <MenuItem value={undefined} />
                        <MenuItem value={'weekly'}>Weekly</MenuItem>
                        <MenuItem value={'fortnightly'}>Fortnightly</MenuItem>
                        <MenuItem value={'fourweekly'}>4-weekly</MenuItem>
                        <MenuItem value={'monthly'}>Monthly</MenuItem>
                        <MenuItem value={'quarterly'}>Quarterly</MenuItem>
                        <MenuItem value={'annually'}>Annually</MenuItem>
                    </Select>
                    <FormHelperText>
                        How often do you get paid?
                    </FormHelperText>
                    <Grid>
                        <IconButton type="submit">
                            <Add />
                        </IconButton>
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    )
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const DeleteIncomeForm = ({ income }) => {
    return (<Grid container direction={'column'}>
        <Typography>Delete?</Typography>
        <Card elevation={4}>
            <CardHeader
                title={`£ ${(income?.amount / 100).toFixed(2)}`}
                subheader={`${income?.name || 'Mysterious Income'}${income?.type?.length ? ' - ' + income.type.join(', ') : ''}`}
            />
            <CardContent>
                <Stack direction={'row'} spacing={4}>
                    <Chip title={'Payday'} label={`${new Date(income.paymentFrequency.startDate).toLocaleString('en-gb', { month: "short", day: "numeric" })}`} />
                    <Chip title={'Next Payday'} label={`${calculateNextPayday(new Date(), income.paymentFrequency).toLocaleString('en-gb', { year: "2-digit", month: "short", day: "numeric" })}`} />
                </Stack>
            </CardContent>
        </Card>
        <Typography >
            The following item will be deleted
        </Typography>
        {/* <pre>
            {JSON.stringify(income, null, 2)}
        </pre> */}
        <Button onClick={e => console.log({ message: 'DELETE', income })}>Ye</Button>
    </Grid >)
}