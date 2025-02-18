'use client'

// imports
import { useContext } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Button, FieldHelperText, Group, HStack, Input, InputAddon, Stack, Text } from "@chakra-ui/react"
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteTag,
    AutoCompleteList,
    AutoCompleteCreatable,
} from "@choc-ui/chakra-autocomplete";
import { LuPlus, LuPoundSterling } from 'react-icons/lu';


// Local Imports
import { Field } from "@/components/ui/field"
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import { IncomeModel } from '@/lib/infrastructure/prismaRepository';
import { UserDataContext } from '@/components/contexts/UserDataProvider';
import { useActionDrawer } from '@/components/contexts/ActionDrawerContext';
import IncomeCard from '@/components/atoms/IncomeCard';

export const CreateIncomeForm = () => {

    const { toggleDrawerAndUpdate } = useActionDrawer()

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
            credentials: 'same-origin'
        }).then(() => {
            toggleDrawerAndUpdate()
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

export const UpdateIncomeForm = () => {

    const { actionDrawerState, toggleDrawerAndUpdate } = useActionDrawer()

    const { register, control, handleSubmit, formState } = useForm<IncomeModel>({
        defaultValues: actionDrawerState?.resourceObject ? { ...actionDrawerState.resourceObject } : {}
    });
    const onSubmit = ({ source, amount, tags, receivedAt, frequency }: FieldValues) => {


// console.log({
//     submittedData: JSON.parse(JSON.stringify({
//         source,
//         amount: Number(amount),
//         tags: tags,
//         receivedAt: new Date(receivedAt),
//         frequency
//     }))
// })

        // PATCH an income to update the details
        fetch(`/api/money/income/${actionDrawerState?.resourceObject?.id}`, {
            method: "PATCH",
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
            credentials: 'same-origin'
        }).then(() => {
            if (toggleDrawerAndUpdate) {
                toggleDrawerAndUpdate()
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
                        disabled={!!actionDrawerState?.resourceObject?.id}
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
                            <NumberInputField {...register("amount", { required: true })} disabled={!!actionDrawerState?.resourceObject?.id} />
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
                        disabled={!!actionDrawerState?.resourceObject?.id}
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

export const DeleteIncomeForm = () => {
    const { actionDrawerState, toggleDrawerAndUpdate } = useActionDrawer()


    const { handleSubmit } = useForm<IncomeModel>();
    const onSubmit = ({ source, amount, tags, receivedAt, frequency }: FieldValues) => {

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
            credentials: 'same-origin'
        }).then(() => {
            toggleDrawerAndUpdate()
        });

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={5}>

                <Text>
                    Would you like to delete the following
                </Text>
                {
                    actionDrawerState?.resourceObject &&
                    <IncomeCard income={actionDrawerState.resourceObject} />
                }
                <Button type={'submit'}>
                    <HStack>
                        <LuPlus />
                        <Text>
                            Delete Income
                        </Text>
                    </HStack>
                </Button>
            </Stack>
        </form>
    );

}