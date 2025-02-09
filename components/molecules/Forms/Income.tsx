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
        }
    });
    const onSubmit = ({ source, amount, tags, receivedAt, frequency }: FieldValues) => {

        // triggers an update on submit
        if (submitTrigger && submitState) {
            submitTrigger(submitState + 1)
        }

        console.log({
            submittedData: JSON.parse(JSON.stringify({
                source,
                amount: Number(amount),
                tags: tags,
                receivedAt: new Date(receivedAt),
                frequency
            }))
        })

        // POST a new income to the user's incomes
        fetch('/api/money/income', {
            method: "POST",
            body: JSON.stringify({
                source,
                amount: Number(amount),
                tags: tags,
                receivedAt: new Date(receivedAt),
                frequency
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
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


                    <Field
                        label="Amount"
                        invalid={!!formState.errors.amount}
                        errorText={formState.errors.amount?.message}
                    >
                        <Group>
                            <InputAddon>
                                <LuPoundSterling />
                            </InputAddon>
                            <NumberInputRoot
                                name={'amount'}
                                inputMode={'decimal'}
                                min={0}
                                step={0.01}
                                width={'fit'}
                            >
                                <NumberInputField {...register("amount", { required: true })} />
                            </NumberInputRoot>
                        </Group>
                    </Field>

                    <Field
                        label={"Due"}
                        invalid={!!formState.errors.receivedAt}
                        errorText={formState.errors.receivedAt?.message}
                        helperText={"When did/do you recieve this payment?"}
                    >
                        <Input type="date" placeholder="Date" {...register("receivedAt", {
                            required: true
                        })} />
                    </Field>

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

