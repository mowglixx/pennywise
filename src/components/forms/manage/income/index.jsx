import { ToolbarFormDrawerControlsContext } from "@/components/structure/PageToolbar"
import { calculateNextPayday } from "@/lib/tools/compare-dates"
import { Add, Delete, Edit } from "@mui/icons-material"
import { Button, Card, CardContent, CardHeader, Chip, Fab, FormHelperText, Unstable_Grid2 as Grid, IconButton, Input, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const AddIncomeForm = () => {
    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const { toggleDrawer } = useContext(ToolbarFormDrawerControlsContext)
    const addIncome = ({ name, amount, paydayFrequency, lastPayday }) => {
        const data = {
            name,
            amount: amount,
            paymentFrequency: {
                startDate: lastPayday,
                interval: paydayFrequency
            }
        }
        fetch('/api/incomes', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(toggleDrawer)
            .then(() => window.location.reload())
    }


    return (
        <Card sx={{ minWidth: '100%' }} p={2}>
            <CardHeader title="Add Income" />
            <CardContent>

                <form
                    onSubmit={handleSubmit(addIncome)}
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
    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const { toggleDrawer } = useContext(ToolbarFormDrawerControlsContext)
    const editIncome = ({ name, amount, paydayFrequency, lastPayday }) => {
        //  prepare object from input
        const data = {
            name,
            amount: amount,
            paymentFrequency: {
                startDate: lastPayday,
                interval: paydayFrequency
            }
        }

        fetch(`/api/incomes/${income._id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
            .then(toggleDrawer)
            .then(() => window.location.reload())

    }

    const formatDate = (d) => new Date(d).toLocaleDateString('en-gb', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('/').reverse().join('-')

    return (
        <Card sx={{ minWidth: '100%' }} p={2}>
            <CardHeader title={`Edit ${income.name}`} />
            <CardContent>

                <form
                    onSubmit={handleSubmit(editIncome)}
                    autoComplete="off"
                    noValidate
                >
                    <Grid container spacing={2} direction={'column'}>


                        {/* Name */}
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                defaultValue={income.name}
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
                                defaultValue={(Number.parseFloat(income.amount) / 100).toFixed(2)}
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
                                inputProps={
                                    {
                                        ...register('lastPayday'),
                                        defaultValue: formatDate(income.paymentFrequency.startDate)
                                    }} />
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
                                defaultValue={income.paymentFrequency.interval}
                                {...register('paydayFrequency', {
                                })}
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
                                <Edit />
                            </Fab>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const DeleteIncomeForm = ({ income }) => {
    const { handleSubmit } = useForm()
    const { toggleDrawer } = useContext(ToolbarFormDrawerControlsContext)

    const deleteIncome = () => {
        fetch(`/api/incomes/${income._id}`, { method: 'DELETE' })
            .then(toggleDrawer)
            .then(() => window.location.reload())
    }

    return (
        <>
            <Typography variant="h3">
                Delete {income.name}?
            </Typography>
            <Card sx={{ minWidth: '100%' }} elevation={4}>
                <Grid container direction={'column'}>
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
                    <Typography>
                        The following item will be deleted
                    </Typography>
                    <Grid xs={12} align={'end'}>
                        <form onSubmit={handleSubmit(deleteIncome)}>
                            <Fab type="submit">
                                <Delete />
                            </Fab>
                        </form>
                    </Grid>
                </Grid >
            </Card>
        </>
    )
}