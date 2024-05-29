"use client"

import { createContext, useContext, useState } from "react"
import { ToolbarContext } from "../Contexts"
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Drawer, Grid, IconButton, Modal, Paper, Toolbar } from "@mui/material"
import { Add, Edit, Delete, ExpandMore, Close } from "@mui/icons-material"


export const ToolbarFormDrawerControlsContext = createContext()

export const PageToolbar = (props) => {
  const { toolbarState } = useContext(ToolbarContext)
  const [open, setOpen] = useState(false)
  const [DrawerForm, setDrawerForm] = useState(<></>)

  const toggleDrawer = () => setOpen(!open)

  return (

    <>
      {
        props?.debugging &&
        (<Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}>
            Toolbar Debugging
          </AccordionSummary>
          <AccordionDetails>
            <pre title="Toolbar">
              {JSON.stringify(toolbarState, null, 2)}
            </pre>
          </AccordionDetails>
        </Accordion>)
      }


      <Toolbar>
        <IconButton onClick={() => {
          setDrawerForm(toolbarState.forms.add)
          setOpen(true)
        }}>
          <Add />
        </IconButton>
        <IconButton
          onClick={() => {
            setDrawerForm(toolbarState.forms.edit)
            setOpen(true)
          }}
          disabled={toolbarState?.selectedItem === null ? true : false}>
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => {
            setDrawerForm(toolbarState.forms.delete)
            setOpen(true)
          }}
          disabled={toolbarState?.selectedItem === null ? true : false}>
          <Delete />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={toggleDrawer} sx={'50vw'}>
        <Grid sx={{minWidth: 'clamp(250px, 50svw, 500px)', padding: 'max(16px, 5svh)', gap: 'max(16px, 5svh)'}} container direction={'column'}>

        <Grid item>
        <Box flex={1}>&nbsp;</Box>
        <Box>
          <IconButton onClick={() => {setOpen(false)}}>
            <Close />
          </IconButton>
        </Box>
        </Grid>
        <Grid item>
          {props?.debugging && <Accordion>
            <AccordionSummary>
              Toolbar Debugging
            </AccordionSummary>
            <AccordionDetails>
              <pre title="Toolbar">
                {JSON.stringify(toolbarState, null, 2)}
              </pre>
            </AccordionDetails>
          </Accordion>}
        </Grid>

          <Grid item>
            <ToolbarFormDrawerControlsContext.Provider 
            value={{
              drawerState: {
                open,
                setOpen
              },
              toggleDrawer,
            }}>
            {DrawerForm}
            </ToolbarFormDrawerControlsContext.Provider>
          </Grid>
        </Grid>
      </Drawer>
    </>

  )
}
