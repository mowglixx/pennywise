'use client'


// imports
import React, { Dispatch, SetStateAction } from 'react';
import { FieldValues, useForm } from 'react-hook-form';


// local imports
import { Button, Group, Input, InputAddon, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import { IncomeModel } from '@/infrastructure/prismaRepository';
import { LuPoundSterling } from 'react-icons/lu';

// triggers an effect outside the component
interface Props {
    submitState?: number;
    submitTrigger?: Dispatch<SetStateAction<number>>;
}

export const CreateIncomeForm = ({ submitState, submitTrigger }: Props) => {

    const { register, handleSubmit, formState } = useForm<IncomeModel>({
        defaultValues: {
            tags: ["Earned Income"],
            frequency: "MONTHLY",
            amount: '499.99'
        },
        mode: 'onSubmit'
    });
    const onSubmit = ({ source, amount, tags, receivedAt, frequency }: FieldValues) => {

        // triggers an update on submit
        if (submitTrigger && submitState) {
            submitTrigger(submitState + 1)
        }

        // POST `/api/money/income`
        fetch('/api/money/income', {
            method: "POST",
            body: JSON.stringify({
                source, amount: Number.parseFloat(amount), tags, receivedAt: new Date(receivedAt), frequency
            })
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack rowGap={'5'} columns={2}>

                <Field
                    label={"Source"}
                    invalid={!!formState.errors.source}
                    errorText={formState.errors.source?.message}
                >

                    <Input
                        type="text"
                        placeholder="Secret Millions"
                        {...register("source", { required: true })}
                    />
                </Field>

                <Stack direction={'row'} gap={'10'} justifyContent={'space-between'}>

                    <Field
                        w={'50%'}
                        label="Amount"
                        invalid={!!formState.errors.amount}
                        errorText={formState.errors.amount?.message}
                    >
                        <Group>

                            <InputAddon><LuPoundSterling /></InputAddon>
                            <NumberInputRoot
                                name={'amount'}
                                w={'100%'}
                                min={0}
                                step={0.01}
                            >
                                <NumberInputField {...register("amount", { required: true })} />
                            </NumberInputRoot>
                        </Group>
                    </Field>

                    <Field
                        label={"Due"}
                        invalid={!!formState.errors.receivedAt}
                        errorText={formState.errors.receivedAt?.message}
                        w={'50%'}
                        helperText={"When did/do you recieve this payment?"}
                    >
                        <Input type="date" placeholder="Date" {...register("receivedAt", {
                            required: true
                        })} />
                    </Field>

                </Stack>
                <Field
                    label={"Tags"}
                    invalid={!!formState.errors.tags}
                    errorText={formState.errors.tags?.message}
                >
                    <NativeSelectRoot
                        minH={10}
                        {...register("tags")}>
                        <NativeSelectField
                            minH={10}
                            items={[
                                "Earned Income",
                                "Unemployment Benefit",
                                "Disability Benefit"
                            ]}
                        />
                    </NativeSelectRoot>
                </Field>
                <Field
                    label={"Frequency"}
                    invalid={!!formState.errors.frequency}
                    errorText={formState.errors.frequency?.message}
                    minW={'100%'}
                >
                    <NativeSelectRoot {...register("frequency")}>
                        <NativeSelectField
                            {...register("frequency")}
                            defaultValue={"MONTHLY"}
                            items={[
                                { value: "ONEOFF", label: "One Off Payment" },
                                { value: "DAILY", label: "Daily" },
                                { value: "WEEKLY", label: "Weekly" },
                                { value: "FORTNIGHTLY", label: "Fortnightly" },
                                { value: "FOURWEEKLY", label: "Four Weekly" },
                                { value: "MONTHLY", label: "Monthly" },
                                { value: "QUARTERLY", label: "Quarterly" },
                                { value: "ANNUALLY", label: "Annually" },
                            ]}
                        />
                    </NativeSelectRoot>


                </Field>
                <Button type="submit">Save</Button>
            </Stack>
        </form>
    );
}

// export const UpdateForm = ({ incomeToEdit }) => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = (data: Income) => {
//         // PUT `/api/money/income/[id]`
//         console.log(data);
//     }

//     console.log(errors);

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input type="text" placeholder="Income Source" {...register("Income Source", { required: true })} />
//             <input type="number" placeholder="Amount" {...register("Amount", { required: true, min: 0 })} />
//             <select {...register("Tags")} multiple>
//                 <option value="Earned income">Earned income</option>
//                 <option value="Passive income">Passive income</option>
//                 <option value="Rental income">Rental income</option>
//                 <option value="Capital gains">Capital gains</option>
//                 <option value="Dividend income">Dividend income</option>
//                 <option value="Interest">Interest</option>
//                 <option value="Portfolio income">Portfolio income</option>
//                 <option value="Royalties">Royalties</option>
//                 <option value="Profit income">Profit income</option>
//                 <option value="Active income">Active income</option>
//                 <option value="Investment income">Investment income</option>
//                 <option value="Commission">Commission</option>
//                 <option value="Pension income">Pension income</option>
//                 <option value="Salary">Salary</option>
//                 <option value="Taxable income">Taxable income</option>
//                 <option value="Allowances">Allowances</option>
//                 <option value="Disposable income">Disposable income</option>
//                 <option value="Miscellaneous income">Miscellaneous income</option>
//                 <option value="Related articles">Related articles</option>
//                 <option value="Social Security benefits">Social Security benefits</option>
//                 <option value="Tax-exempt income">Tax-exempt income</option>
//             </select>
//             <input type="datetime-local" placeholder="Due Date" {...register} />

//             <input type="submit" />
//         </form>
//     );
// }

// export const DeleteForm = ({ incomeToDelete }) => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = (data) => console.log(data);
//     console.log(errors);

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <textarea {...register("Delete Confirm", { required: true })} />

//             <input type="submit" />
//         </form>
//     );
// }
