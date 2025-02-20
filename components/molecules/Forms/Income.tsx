'use client'

// imports
import { FieldValues, useForm } from 'react-hook-form';
import { Button, FieldHelperText, Group, HStack, Input, InputAddon, Stack, Text } from "@chakra-ui/react"
import { LuPencil, LuPlus, LuPoundSterling, LuTrash } from 'react-icons/lu';


// Local Imports
import { Field } from "@/components/ui/field"
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import { useActionDrawer } from '@/components/contexts/ActionDrawerContext';
import IncomeCard from '@/components/atoms/IncomeCard';
import { Prisma } from '@prisma/client';

export const CreateIncomeForm = () => {

    const { toggleDrawerAndUpdate } = useActionDrawer()

    const { register, control, handleSubmit, formState } = useForm<Prisma.IncomeCreateWithoutUserInput>({
        defaultValues: {
            frequency: "MONTHLY"
        }
    });
    const onSubmit = ({ source, description, amount, tags, receivedAt, frequency }: FieldValues) => {

        // POST a new income to the user's incomes
        fetch('/api/money/income', {
            method: "POST",
            body: JSON.stringify({
                source,
                description,
                amount: Number(amount),
                tags: tags.split(',')?.map((t: string) => t.trim()),
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
                    label={"Description"}
                    invalid={!!formState.errors.description}
                    errorText={formState.errors.description?.message}
                >

                    <Input
                        type="text"
                        placeholder="Main job"
                        {...register("description", { required: true })}
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

                    <Input
                        type="text"
                        placeholder="Wages, Benefits, Rent Income..."
                        {...register("tags", { required: true })}
                    />
                    <FieldHelperText>Tags are seperated by a comma. Tags can be anything you like and can help categorise your incomes.</FieldHelperText>
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
                    <LuPlus />
                    <Text>
                        Add Income
                    </Text>
                </Button>
            </Stack>
        </form>
    );

}

export const UpdateIncomeForm = () => {

    const { actionDrawerState, toggleDrawerAndUpdate } = useActionDrawer()

    const { register, control, handleSubmit, formState } = useForm<Prisma.IncomeCreateWithoutUserInput>({
        defaultValues: {
            ...actionDrawerState.resourceObject, receivedAt: new Date(actionDrawerState.resourceObject.receivedAt).toISOString().substring(0, 10)

        }
    });
    const onSubmit = ({ source, description, amount, tags, receivedAt, frequency }: FieldValues) => {

        // PATCH an income to update the details
        fetch(`/api/money/income/${actionDrawerState?.resourceObject?.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                source,
                description,
                amount: Number(amount),
                tags: `${tags}`.split(',')?.map((t: string) => t.trim()),
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
                        placeholder="Acme, Inc."
                        {...register("source", { required: true })}
                        disabled={!actionDrawerState?.resourceObject?.id}
                    />
                </Field>
                <Field
                    label={"Description"}
                    invalid={!!formState.errors.description}
                    errorText={formState.errors.description?.message}
                >

                    <Input
                        type="text"
                        placeholder="Main job"
                        {...register("description", { required: true })}
                        disabled={!actionDrawerState?.resourceObject?.id}
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
                            <NumberInputField {...register("amount", { required: true })} disabled={!actionDrawerState?.resourceObject?.id} />
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

                {/* TODO: Autocomplete Tag Field has dep conflicts with react 19, wait for update or find alt lib */}
                <Field
                    label={"Tags"}
                    invalid={!!formState.errors.tags}
                    errorText={formState.errors.tags?.message}
                >

                    <Input
                        type="text"
                        placeholder="Wages, Benefits, Rent Income..."
                        {...register("tags", { required: true })}
                        disabled={!actionDrawerState?.resourceObject?.id}
                    />
                    <FieldHelperText>Tags can be anything you like and can help categorise your incomes, tags are seperated by a comma (,)</FieldHelperText>
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
                    <LuPencil />
                    <Text>
                        Update Income
                    </Text>
                </Button>
            </Stack>
        </form>
    );

}

export const DeleteIncomeForm = () => {
    const { actionDrawerState, toggleDrawerAndUpdate } = useActionDrawer()


    const { handleSubmit } = useForm<Prisma.IncomeCreateWithoutUserInput>();
    const onSubmit = () => {

        // POST a new income to the user's incomes
        fetch(`/api/money/income/${actionDrawerState.resourceObject.id}`, {
            method: "DELETE",
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
                    <IncomeCard income={actionDrawerState.resourceObject} hideControls />
                }
                <Button type={'submit'}>
                    <LuTrash />
                    <Text>
                        Delete Income
                    </Text>
                </Button>
            </Stack>
        </form>
    );

}