'use client'
/* eslint-disable @typescript-eslint/no-unsafe-function-type */


// imports
import React, { Dispatch, SetStateAction } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';


// local imports
import { Button, FieldHelperText, Group, HStack, Input, InputAddon, Separator, Stack, Text } from "@chakra-ui/react"
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteTag,
    AutoCompleteList,
    AutoCompleteCreatable,
} from "@choc-ui/chakra-autocomplete";


import { Field } from "@/components/ui/field"
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import { IncomeModel } from '@/infrastructure/prismaRepository';
import { LuPlus, LuPoundSterling } from 'react-icons/lu';

// triggers an effect outside the component
interface Props {
    submitTrigger?: Function;
}

export const CreateIncomeForm = ({ submitTrigger }: Props) => {

    const { register, control, handleSubmit, formState } = useForm<IncomeModel>({
        defaultValues: {
            frequency: "MONTHLY",
            amount: '499.99',
            // used for default taglist
            tags: [
                "Earned Income",
                "Benefits",
                "Unearned Income"],
        }
    });
    const onSubmit = ({ source, amount, tags, receivedAt, frequency }: FieldValues) => {


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
        }).then(() => {
            // triggers an update on submit
            if (submitTrigger) {
                submitTrigger()
            }
        });

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={5}>

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
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        name="tags"
                        render={({ field }) => (
                            <AutoComplete openOnFocus multiple onChange={field.onChange} suggestWhenEmpty creatable>
                                <AutoCompleteList>
                                    {field?.value && field?.value?.length && field?.value?.map((tag, cid) => (
                                        <AutoCompleteItem key={`option-${cid}`} value={tag}>
                                            {tag}
                                        </AutoCompleteItem>
                                    ))}
                                    <AutoCompleteCreatable>
                                        {({ value }) => <span>Add {value} to Tags</span>}
                                    </AutoCompleteCreatable>
                                </AutoCompleteList>
                                <AutoCompleteInput>
                                    {({ tags }) => tags.map((tag, tid) => (
                                        <AutoCompleteTag
                                            key={tid}
                                            label={tag.label}
                                            onRemove={tag.onRemove}
                                        />
                                    ))}
                                </AutoCompleteInput>
                            </AutoComplete>)}
                    />
                    {formState.errors.tags && <FieldHelperText>{formState.errors.tags?.message}</FieldHelperText>}
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
                <Button type={'submit'}>
                    <HStack>
                        <LuPlus />
                        <Text>
                            Add Income
                        </Text>
                    </HStack>
                </Button>
            </Stack>
        </form>
    );
}

