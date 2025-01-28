
// Global Imports
import { useRouter } from "next/navigation"
import { useContext, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"

// Local Imports
import { ToolbarFormDrawerControlsContext } from "@/components/structure/PageToolbar"
import { calculateNextPayday } from "@/lib/tools/compare-dates"

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const AddIncomeForm = () => {
    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const { toggleDrawer } = useContext(ToolbarFormDrawerControlsContext)
    const addIncome = ({ name, amount, paydayFrequency, lastPayday }) => {
        const data = {
            name,
            amount: amount,
            frequency: {
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
        <div sx={{ minWidth: '100%' }} p={2}>
            <form
                onSubmit={handleSubmit(addIncome)}
                autoComplete="off"
                noValidate
            >
                <div title="Add Income" />

                <div>
                    <div container spacing={2} direction={'column'}>


                        {/* Name */}
                        <div xs={12}>
                            <input
                                fullWidth
                                label={'Name'}
                                {...register("name", {
                                    required: true,
                                })} />

                        </div>

                        {/* Amount */}
                        <div xs={12}>
                            <input
                                type="number"
                                label={'Amount'}
                                fullWidth
                                helperText={'If this is your wages, input the amount you get on payday. no need for tax details.'}
                                {...register("amount", {
                                    required: true,
                                })} />
                        </div>

                        {/* Last Payday */}
                        <div xs={12}>
                            <p component={'label'} htmlFor="last-payday-input" variant="subtitle2">
                                When were you last paid this amount?
                            </p>
                            <input
                                type="date"
                                id="last-payday-input"
                                fullWidth
                                {...register('lastPayday')} />
                        </div>

                        <div xs={12}>
                            {/* Frequency */}
                            <p component={'label'} htmlFor="last-payday-input" variant="subtitle2">
                                How often are you paid this amount?
                            </p>
                            <select
                                id="payday-interval-select"
                                defaultValue={'monthly'}
                                {...register('paydayFrequency')}
                            >
                                <option value={'weekly'}>Weekly</option>
                                <option value={'fortnightly'}>Fortnightly</option>
                                <option value={'fourweekly'}>4-weekly</option>
                                <option value={'monthly'}>Monthly</option>
                                <option value={'quarterly'}>Quarterly</option>
                                <option value={'annually'}>Annually</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit">
                        Add Income
                    </button>
                </div>
            </form>
        </div>)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const EditIncomeForm = ({ income }) => {
    const { register, handleSubmit } = useForm()
    const { toggleDrawer } = useContext(ToolbarFormDrawerControlsContext)

    const editIncome = ({ name, amount, paydayFrequency, lastPayday }) => {
        //  prepare object from input
        const data = {
            name,
            amount: amount,
            frequency: {
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
        <div sx={{ minWidth: '100%' }} p={2}>

            <form
                onSubmit={handleSubmit(editIncome)}
                autoComplete="off"
                noValidate
            >
                <h3>Edit {income.name}</h3>
                <div>
                    <div container spacing={2} direction={'column'}>


                        {/* Name */}
                        <div xs={12}>
                            <input
                                fullWidth
                                defaultValue={income.name}
                                label={'Name'}
                                {...register("name", {
                                    required: true,
                                })} />

                        </div>

                        {/* Amount */}
                        <div xs={12}>
                            <input
                                type="number"
                                label={'Amount'}
                                defaultValue={(Number.parseFloat(income.amount) / 100).toFixed(2)}
                                fullWidth
                                helperText={'If this is your wages, input the amout you get on payday. no need for tax details.'}
                                {...register("amount", {
                                    required: true,
                                })} />
                        </div>

                        {/* Last Payday */}
                        <div xs={12}>
                            <p component={'label'} htmlFor="last-payday-input" variant="subtitle2">
                                When were you last paid this amount?
                            </p>
                            <input
                                type="date"
                                id="last-payday-input"
                                fullWidth
                                defaultValue={formatDate(income.frequency.startDate)}
                                {...register('lastPayday')}
                            />
                        </div>

                        <div xs={12}>
                            {/* Frequency */}
                            <p component={'label'} htmlFor="last-payday-input" variant="subtitle2">
                                How often are you paid this amount?
                            </p>
                            <select
                                id="payday-interval-select"
                                defaultValue={income.frequency.interval}
                                {...register('paydayFrequency')}
                            >
                                <option value={'weekly'}>Weekly</option>
                                <option value={'fortnightly'}>Fortnightly</option>
                                <option value={'fourweekly'}>4-weekly</option>
                                <option value={'monthly'}>Monthly</option>
                                <option value={'quarterly'}>Quarterly</option>
                                <option value={'annually'}>Annually</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
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
            <p variant="h3">
                Delete {income.name}?
            </p>
            <div sx={{ minWidth: '100%' }} elevation={4}>
                <div
                    title={`£ ${(income?.amount / 100).toFixed(2)}`}
                    subheader={`${income?.name || 'Mysterious Income'}${income?.type?.length ? ' - ' + income.type.join(', ') : ''}`}
                />
                <div>
                    <div direction={'row'} spacing={4}>
                        <div title={'Payday'} label={`${new Date(income.frequency.startDate).toLocaleString('en-gb', { month: "short", day: "numeric" })}`} />
                        <div title={'Next Payday'} label={`${calculateNextPayday(new Date(), income.frequency).toLocaleString('en-gb', { year: "2-digit", month: "short", day: "numeric" })}`} />
                    </div>
                </div>
                <p>
                    The following item will be deleted
                </p>
                <div xs={12} align={'end'}>
                    <form onSubmit={handleSubmit(deleteIncome)}>
                        <button type="submit">
                            Delete
                        </button>
                    </form>
                </div >
            </div>
        </>
    )
}