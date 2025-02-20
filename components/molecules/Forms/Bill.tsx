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
import { Prisma } from '@prisma/client';
import BillCard from '@/components/atoms/BillCard';
import { InputGroup } from '@/components/ui/input-group';

export const CreateBillForm = () => {

    const { toggleDrawerAndUpdate } = useActionDrawer()

    const { register, handleSubmit, formState } = useForm<Prisma.BillCreateWithoutUserInput>({
        defaultValues: {
            frequency: "MONTHLY"
        }
    });
    const onSubmit = ({ source, description, amount, tags, dueDate, frequency }: FieldValues) => {

        // POST a new bill to the user's bills
        fetch('/api/money/bill', {
            method: "POST",
            body: JSON.stringify({
                source,
                description,
                amount: Number(amount),
                tags: tags.split(',')?.map((t: string) => t.trim()),
                dueDate: new Date(dueDate),
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
                        placeholder="New Shoes, Social Club...."
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
                        placeholder="New Shoes, Social Club...."
                        {...register("description", { required: true })}
                    />
                </Field>


                <Field
                    label="Amount"
                    invalid={!!formState.errors.amount}
                    errorText={formState.errors.amount?.message}
                >
                    <InputGroup startElement={<LuPoundSterling />}>
                        <NumberInputRoot
                            name={'amount'}
                            inputMode={'decimal'}
                            min={0}
                            step={0.01}
                            width={'fit'}
                        >
                            <NumberInputField {...register("amount", { required: true })} />
                        </NumberInputRoot>
                    </InputGroup>
                </Field>

                <Field
                    label={"Due"}
                    invalid={!!formState.errors.dueDate}
                    errorText={formState.errors.dueDate?.message}
                    helperText={"When do you expect to pay?"}
                >
                    <Input type="date" placeholder="Date" {...register("dueDate", {
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
                        Add Bill
                    </Text>
                </Button>
            </Stack>
        </form>
    );

}

export const UpdateBillForm = () => {

    const { actionDrawerState, toggleDrawerAndUpdate } = useActionDrawer()

    const { register, handleSubmit, formState } = useForm<Prisma.BillCreateWithoutUserInput>({
        defaultValues: {
            ...actionDrawerState.resourceObject, dueDate: new Date(actionDrawerState.resourceObject.dueDate).toISOString().substring(0, 10)
        }
    });
    const onSubmit = ({ source, description, amount, tags, dueDate, frequency }: FieldValues) => {

        // PATCH an bill to update the details
        fetch(`/api/money/bill/${actionDrawerState?.resourceObject?.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                source,
                description,
                amount: Number(amount),
                tags: `${tags}`.split(',')?.map((t: string) => t.trim()),
                dueDate: new Date(dueDate),
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
                        placeholder="Secret Millions"
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
                    invalid={!!formState.errors.dueDate}
                    errorText={formState.errors.dueDate?.message}
                    helperText={"When did/do you recieve this payment?"}
                >
                    <Input type="date" placeholder="Date" {...register("dueDate", {
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
                        placeholder="Travel, Gifts, "
                        {...register("tags", { required: true })}
                        disabled={!actionDrawerState?.resourceObject?.id}
                    />
                    <FieldHelperText>Tags can be anything you like and can help categorise your bills, tags are seperated by a comma (,)</FieldHelperText>
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
                        Update Bill
                    </Text>
                </Button>
            </Stack>
        </form>
    );

}

export const DeleteBillForm = () => {
    const { actionDrawerState, toggleDrawerAndUpdate } = useActionDrawer()


    const { handleSubmit } = useForm<Prisma.BillCreateWithoutUserInput>();
    const onSubmit = () => {

        // POST a new bill to the user's bills
        fetch(`/api/money/bill/${actionDrawerState.resourceObject.id}`, {
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
                    <BillCard bill={actionDrawerState.resourceObject} hideControls />
                }
                <Button type={'submit'}>
                    <LuTrash />
                    <Text>
                        Delete Bill
                    </Text>
                </Button>
            </Stack>
        </form>
    );

}